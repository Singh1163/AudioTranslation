import os
from dotenv import load_dotenv
from openai import OpenAI
from flask import Flask, request, render_template, jsonify

load_dotenv()

client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "uploads/"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB limit
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'flac'}

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    try:
        language = request.form['language']
        audio_file = request.files['file']
        # Validate file
        if not audio_file or not allowed_file(audio_file.filename):
            return jsonify({'error': 'Invalid audio file'}), 400

        file_name = audio_file.filename
        audio_file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name))
        audio_file = open(f"uploads/{file_name}", "rb")
        trans_script = client.audio.translations.create(file=audio_file,
                                                        model='whisper-1')
        responses = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": f"You task is to convert the given english sentence in {language} Language"},
                {"role": "user", "content": trans_script.text}
            ],
            max_tokens=30,
            temperature=0
        )
        translated_text = responses.choices[0].message.content
        print(translated_text)
        return jsonify({'text': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(host='0.0.0.0')
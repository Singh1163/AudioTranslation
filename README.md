# Audio Translation Web App

A Flask-based web application that converts audio files to text and translates them using OpenAI's API. Supports both file upload and direct audio recording.

## Features

- 🎤 Record audio directly from the browser
- 📁 Upload audio files (WAV, MP3, OGG, FLAC)
- 🌍 Translate audio content to different languages
- 🚀 Powered by OpenAI's speech-to-text and translation capabilities
- 📋 Clean and responsive user interface
- 🔄 Real-time progress indicators
- 🛡️ Secure file handling and validation

## Prerequisites

- Python 3.8+
- OpenAI API key
- Modern web browser with microphone access

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/audio-translator.git
cd audio-translator

Create and activate a virtual environment:

bash
Copy
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies:

bash
Copy
pip install -r requirements.txt
Set up OpenAI API key:

bash
Copy
export OPENAI_API_KEY='your-api-key-here'  # Add this to your .bashrc or .env file
Configuration
Create a .env file in the project root with:

env
Copy
OPENAI_API_KEY=your-api-key-here
UPLOAD_FOLDER=uploads/
MAX_CONTENT_MB=16
Or modify the app.py directly with your credentials.

Usage
Start the Flask development server:

bash
Copy
python app.py
Open your browser and visit:

Copy
http://localhost:5000
Use the application:

Click "Start Recording" to record audio directly

Or upload an audio file (max 16MB)

Select target language (e.g., "French", "Spanish", "German")

Click "Translate" to get results

Supported Formats
Audio Input: WAV, MP3, OGG, FLAC

Output Languages: All languages supported by OpenAI's translation models

Technologies Used
Backend:

Flask (Python web framework)

OpenAI API (Speech-to-Text and Translation)

Werkzeug (File upload handling)

Frontend:

HTML5/CSS3

JavaScript (Web Audio API for recording)

Modern browser APIs

License
MIT License

Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

Acknowledgments
OpenAI for their powerful speech-to-text and translation APIs

Flask community for excellent web framework

Browser vendors for Web Audio API implementation

Notes
The application stores temporary files in uploads/ directory

All recordings are processed in memory and not stored permanently

Ensure you have proper OpenAI API quota for your usage

Copy

This README includes:
1. Clear installation and setup instructions
2. Configuration requirements for OpenAI API
3. Usage guide for both recording and file upload
4. Technology stack information
5. Licensing and contribution guidelines
6. Important notes about security and data handling


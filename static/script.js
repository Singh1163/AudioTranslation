// Audio recording functionality
let mediaRecorder;
let audioChunks = [];
const recordButton = document.getElementById('recordButton');
const recordingStatus = document.getElementById('recordingStatus');

recordButton.addEventListener('click', async () => {
    try {
        if (!mediaRecorder || mediaRecorder.state === 'inactive') {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(audioFile);
                document.getElementById('fileInput').files = dataTransfer.files;

                recordingStatus.textContent = 'Recording saved!';
                audioChunks = [];
            };

            mediaRecorder.start();
            recordButton.textContent = 'Stop Recording';
            recordButton.classList.add('recording');
            recordingStatus.textContent = 'Recording...';
        } else {
            mediaRecorder.stop();
            recordButton.textContent = 'Start Recording';
            recordButton.classList.remove('recording');
        }
    } catch (err) {
        console.error('Error accessing microphone:', err);
        alert('Error accessing microphone. Please check permissions.');
    }
});

// Form submission
document.getElementById('translationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const resultSection = document.querySelector('.result-section');
    const translationResult = document.getElementById('translationResult');
    const loader = document.getElementById('loader');

    try {
        translationResult.textContent = '';
        loader.style.display = 'block';
        resultSection.style.display = 'block';

        const response = await fetch('/translate', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            translationResult.textContent = data.text;
        } else {
            translationResult.textContent = data.error || 'Error in translation';
        }
    } catch (error) {
        console.error('Error:', error);
        translationResult.textContent = 'An error occurred. Please try again.';
    } finally {
        loader.style.display = 'none';
    }
});
const express = require('express');
const multer = require('multer');
const { execFile } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

// Route to handle audio file uploads
app.post('/transcribe', upload.single('file'), (req, res) => {
  const audioPath = req.file.path;

  // Call the Python Whisper script
  execFile('venv/Scripts/python', ['whisper_service.py', audioPath], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return res.status(500).send('Error processing audio file.');
    }

    const transcription = stdout.trim();
    res.json({ transcript: transcription });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

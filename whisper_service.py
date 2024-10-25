import sys
import whisper

model = whisper.load_model("base")

file_path = sys.argv[1]
result = model.transcribe(file_path)
print(result['text'])

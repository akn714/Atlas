import os
import requests
import openai
from dotenv import load_dotenv
from groq import Groq
import tempfile
import subprocess
from elevenlabs.client import ElevenLabs
from elevenlabs import play

load_dotenv()

API_KEY = os.getenv('API_KEY')
VOICE_ID = os.getenv('VOICE_1')

client = ElevenLabs(
    api_key=API_KEY,
)

def play_text_to_speech(text, speed=1.0):
    audio = client.text_to_speech.convert(
        text=text,
        voice_id=VOICE_ID,
        model_id="eleven_multilingual_v2",
        output_format="mp3_44100_128",
    )

    play(audio)

class GroqLLM:
    model = "llama-3.3-70b-versatile"

    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    def get_llm_response(self, messages):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,  # Ensure messages is a list of dictionaries
        )
        output = response.choices[0].message.content.strip()

        # Fixing unwanted quotes in the response
        if output and (output[0] == output[-1]) and output.startswith(("'", '"')):
            output = output[1:-1]

        return output

if __name__ == '__main__':
    os.system('clear')
    chat = GroqLLM()
    print('[chat started]')
    
    chat_history = [{"role": "system", "content": "You are a helpful voice assistant named Atlas. Your responses are short and concise as within 100 words and informative, you answer questions directly without talking about unnecessary information."}]  # Initialize conversation history
    
    print("Hello! my name is Atlas")
    play_text_to_speech("Hello! my name is Atlas")
    while True:
        user_input = input("user -> ")
        if user_input=='exit': break
        chat_history.append({"role": "user", "content": user_input})  # Append user input

        res = chat.get_llm_response(chat_history)  # Pass full chat history

        chat_history.append({"role": "assistant", "content": res})  # Append bot response

        print("bot ->", res)
        play_text_to_speech(res)


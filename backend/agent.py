# Please install OpenAI SDK first: `pip3 install openai`

from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

apiKey = os.getenv('DEEPSEEK_API_KEY')

client = OpenAI(api_key=apiKey, base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"},
    ],
    stream=False
)

print(response.choices[0].message.content)
# from openai import OpenAI
from dotenv import load_dotenv
from mistralai import Mistral
import os

load_dotenv()

# OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

api_key = os.environ["MISTRAL_API_KEY"]
model = "mistral-large-latest"

client = Mistral(api_key=api_key)

messages = [
    {
        "role": "system",
        "content": """
            Your name is Atlas, a Chrome extension AI agent designed to provide users with short, concise, and precise responses directly within their webpage. Your responses are concise, professional, and efficient, ensuring users receive quick and relevant information without unnecessary elaboration.

            Your purpose is to assist users by solving their queries instantly, eliminating the need to open a separate LLM tab. You maintain a neutral and professional tone, focusing on delivering factually accurate and technically sound responses.

            Atlas was created by Adarsh Kumar (https://akn714.github.io) to enhance user experience by seamlessly integrating AI assistance into webpages. You strictly adhere to ethical guidelines, ensuring user privacy, accuracy, and responsible AI behavior.
        """
    }
]

# q = input("Enter query: ")
# limit = input("Enter response limit (definition/concise/normal/extended): ")

# query = f"""
# \"query\": \"{q}\"
# \"response limit\": {500 if limit == 'normal' else 100 if limit == 'concise' else 'define as concise as possible' if limit == 'definition' else 1000}
# """

# print(query.format(q, limit))

chat_response = client.chat.complete(
    model = model,
    messages = [
        {
            "role": "user",
            "content": "Who are you and who made you?",
        },
    ]
)

print(chat_response.choices[0].message.content)
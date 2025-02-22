import os
from dotenv import load_dotenv
from groq import Groq
from mistralai import Mistral

load_dotenv()

class MistralAI:
    model = "mistral-large-latest"

    def __init__(self):
        self.client = Mistral(api_key=os.environ["MISTRAL_API_KEY"])

    def get_llm_response(self, messages):
        print('[+] Mistral AI responding')
        response = self.client.chat.complete(
            model = self.model,
            messages=messages,
        )
        output = response.choices[0].message.content.strip()

        if output and (output[0] == output[-1]) and output.startswith(("'", '"')):
            output = output[1:-1]

        return output

class GroqLLM:
    model = "llama-3.3-70b-versatile"

    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    def get_llm_response(self, messages):
        print('[+] Groq LLM responding')
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
        )
        output = response.choices[0].message.content.strip()

        if output and (output[0] == output[-1]) and output.startswith(("'", '"')):
            output = output[1:-1]

        return output
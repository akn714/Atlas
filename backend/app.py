from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import get_llm_response

app = Flask(__name__)
CORS(app)

chat_history = [
    {
        "role": "system",
        # "content": "You are a helpful voice assistant named Atlas. Your responses are short and concise within 100 words and informative. You answer questions directly without talking about unnecessary information.",
        "content": """
            Your name is Atlas, a Chrome extension AI agent designed to provide users with short, concise, and precise responses directly within their webpage. Your responses are concise, professional, and efficient, ensuring users receive quick and relevant information without unnecessary elaboration.

            Your purpose is to assist users by solving their queries instantly, eliminating the need to open a separate LLM tab. You maintain a neutral and professional tone, focusing on delivering factually accurate and technically sound responses.

            Atlas was created by Adarsh Kumar (https://akn714.github.io) to enhance user experience by seamlessly integrating AI assistance into webpages. You strictly adhere to ethical guidelines, ensuring user privacy, accuracy, and responsible AI behavior.
        """
    }
]

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "home"})

@app.route("/chat", methods=["POST"])
def send_data():
    global chat_history
    print('[+] GET /chat')

    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"error": "Invalid request"}), 400
    
    llm = data["llm"] # should be Groq or MistralAI
    query = data["query"]
    
    res = get_llm_response(llm, query, chat_history)
    chat_history = res['chat_history']

    return jsonify({"reply": res['response']})
    

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=3000, debug=True)

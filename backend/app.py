from flask import Flask, request, jsonify
from ai.chat import GroqLLM

app = Flask(__name__)
chat = GroqLLM()

chat_history = [{"role": "system", "content": "You are a helpful voice assistant named Atlas. Your responses are short and concise as within 100 words and informative, you answer questions directly without talking about unnecessary information."}]

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "home"})

@app.route("/chat", methods=["POST"])
def send_data():
    print('[+] GET /chat')

    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "Invalid request"}), 400
    
    # print("Received message:", data["message"])
    print('[chat started]')
    
    user_input = data["message"]
    chat_history.append({"role": "user", "content": user_input})

    res = chat.get_llm_response(chat_history)

    chat_history.append({"role": "assistant", "content": res})

    return jsonify({"reply": res})
    

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=3000, debug=True)

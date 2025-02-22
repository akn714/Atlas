from agent import GroqLLM, MistralAI

Groq = GroqLLM()
MistralAI = MistralAI()

def get_llm_response(llm, query, chat_history):
    model = Groq
    if llm=="Groq":
        model = Groq
    elif llm=="MistralAI":
        model = MistralAI
    
    chat_history.append({"role": "user", "content": query})
    res = model.get_llm_response(chat_history)
    chat_history.append({"role": "assistant", "content": res})

    return {
        'response': res,
        'chat_history': chat_history
    }

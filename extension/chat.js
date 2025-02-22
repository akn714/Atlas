console.log('chat.js injected')

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    let input = document.getElementById("chat-input");
    let model = document.getElementById("llm");
    let query = input.value.trim();
    let llm = model.value.trim();

    if (query === "") return;

    let chatBox = document.getElementById("chat-box");
    let userMessage = document.createElement("div");
    userMessage.textContent = query;
    userMessage.style.background = "#666";
    userMessage.style.padding = "5px";
    userMessage.style.margin = "5px 0";
    userMessage.style.borderRadius = "5px";
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";

    fetch("http://127.0.0.1:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: query,
            llm: llm
        })
    })
        .then(response => response.json())
        .then(data => {
            let botMessage = document.createElement("div");
            botMessage.textContent = data.reply || "No response";
            botMessage.style.background = "#888";
            botMessage.style.padding = "5px";
            botMessage.style.margin = "5px 0";
            botMessage.style.borderRadius = "5px";
            chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => console.error("Error:", error.error));
}
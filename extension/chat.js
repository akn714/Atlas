console.log('chat.js injected')

document.getElementById("chat-input").focus();

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
//    userMessage.style.background = "#666";
	userMessage.style.color = 'white';
	userMessage.style.lineHeight = '24px';
    userMessage.style.padding = "5px";
    userMessage.style.margin = "5px 0";
    userMessage.style.borderRadius = "5px";
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";

    let botMessage = document.createElement("div");
    botMessage.innerHTML = '<img src="loading.svg" id="loading" alt="loading">';
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

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
            // let botMessage = document.createElement("div");
            botMessage.innerHTML = data.reply || "No response";
//            botMessage.style.background = "#888";
			botMessage.style.color = "#919191";
			botMessage.style.lineHeight = '24px';
            botMessage.style.padding = "5px";
            botMessage.style.margin = "5px 0";
            botMessage.style.borderRadius = "5px";
            // chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            console.error("Error:", error.error);
            // let botMessage = document.createElement("div");j
            botMessage.textContent = "Server error!";
            // botMessage.style.background = "#888";
			botMessage.style.color = "#f22929";
            botMessage.style.padding = "5px";
            botMessage.style.margin = "5px 0";
            botMessage.style.borderRadius = "5px";
            // chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        });
}

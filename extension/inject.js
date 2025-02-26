// Check if chat is already injected
console.log('injected inject.js')
if (!document.getElementById("chat-container")) {
    fetch(chrome.runtime.getURL("chat.html"))
        .then(response => response.text())
        .then(html => {
            let chatDiv = document.createElement("div");
            chatDiv.innerHTML = html;
            chatDiv.setAttribute('id', 'chat-div');
            document.body.appendChild(chatDiv);
        });

    let style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = chrome.runtime.getURL("chat.css");
    document.body.appendChild(style);

    let script = document.createElement("script");
    script.src = chrome.runtime.getURL("chat.js");
    document.body.appendChild(script);
}

document.addEventListener("keydown", function(event) {
    // Detect "Ctrl + Shift + X" key combination
    if (event.ctrlKey && event.shiftKey && event.key === "X") {
        let chatContainer = document.getElementById("chat-div");
        if (chatContainer) {
            chatContainer.remove();  // Remove chat interface
        }
    }
});

console.log('content.js injected!')

window.addEventListener("message", (event) => {
    if (event.source !== window || !event.data.type || event.data.type !== "fetchData") return;

    chrome.runtime.sendMessage({
        type: "fetchData",
        query: event.data.query,
        llm: event.data.llm
    }, (response) => {
        // Send the response back to chat.js
        console.log(response);
        window.postMessage({ type: "responseData", response: response }, "*");
    });
});

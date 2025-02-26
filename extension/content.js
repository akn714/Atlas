console.log('content.js injected!')

const extensionId = chrome.runtime.id;

// window.addEventListener('get-id', (event) => {
//     if (event.source !== window || !event.data.type || event.data.type !== "get-id") return;
    
    
//         window.postMessage({ type: "responseData", response: response }, "*");
// });

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

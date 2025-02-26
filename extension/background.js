chrome.action.onClicked.addListener(async (tab) => {
    if (tab.id) {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["inject.js"]
        });
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "start-chat") {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (tabs.length === 0) return;
            const tab = tabs[0];

            if (!tab.id || tab.url.startsWith("chrome://") || tab.url.startsWith("https://chrome.google.com/webstore")) {
                console.warn("Cannot inject script into this page:", tab.url);
                return;
            }

            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["inject.js"]
            });
        });
    }
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.type === "fetchData") {
//         // fetch("http://127.0.0.1:3000/chat", {
//         //     method: "POST",
//         //     headers: { "Content-Type": "application/json" },
//         //     body: JSON.stringify({
//         //         query: query,
//         //         llm: llm
//         //     })
//         // })
//         // .then(response => response.json())
//         // .then(data => sendResponse(data))
//         // .catch(error => sendResponse({ error: error.message }));
//         sendResponse({reply: 'this is the reply'})

//         return true; // Keeps the message channel open for async response
//     }
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "fetchData") {
        fetch("http://127.0.0.1:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: request.query, // Use request.query instead of an undefined variable
                llm: request.llm // Use request.llm instead of an undefined variable
            })
        })
        .then(response => response.json())
        .then(data => {
            sendResponse(data); // Send response after receiving data
        })
        .catch(error => {
            sendResponse({ error: error.message }); // Handle errors
        });

        return true; // Keeps the response channel open for async response
    }
});



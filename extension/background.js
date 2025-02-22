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

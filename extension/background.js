chrome.action.onClicked.addListener(async (tab) => {
    if (tab.id) {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["inject.js"]
        });
    }
});

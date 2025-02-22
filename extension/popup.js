let btn = document.getElementsByClassName('dashboard');
btn[0].addEventListener('click', () => {
    openDashboard();
})


function openDashboard() {
    const url = chrome.runtime.getURL('app/dashboard.html');
    chrome.tabs.query({}, (tabs) => {
        let found = false;

        for (let tab of tabs) {
            if (tab.url === url) {
                found = true;
                chrome.tabs.update(tab.id, { active: true });
                break;
            }
        }
        if (!found) {
            chrome.tabs.create({ url: url });
        }
    });
}
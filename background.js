
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background.js:", message);
  if (message.action === "redirectToExtensionPage") {
    const url = chrome.runtime.getURL("index.html");
    chrome.tabs.update(sender.tab.id, { url });
  }
});

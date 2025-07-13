chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "video_clicked") {
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      width: 400,
      height: 300
    });
  }
});

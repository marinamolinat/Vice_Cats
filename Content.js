
let lastUrl = location.href;

new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;

    // Check if it's a video URL
    if (currentUrl.includes("watch?v=")) {
      console.log("🎥 Navigated to a YouTube video:", currentUrl);
      // Send message to background or whatever you need
    }
  }
}).observe(document, { subtree: true, childList: true });

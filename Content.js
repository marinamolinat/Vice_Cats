
let lastUrl = location.href;

new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;

    // Check if its a video URL
    if (currentUrl.includes("watch?v=")) {
      console.log(" Navigated to a YouTube video:", currentUrl);
      const confirmed = confirm("Are you sure you want to watch this video?");

      if (confirmed) {
      window.location.href = link.href;
      } else {
      window.location.href = "https://www.youtube.com/"; 
      }
    
    }
  }
}).observe(document, { subtree: true, childList: true });


let lastUrl = location.href;


new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    

    // Check if its a video URL
    if (currentUrl.includes("watch?v=")) {
      console.log(" Navigated to a YouTube video:", currentUrl);
      const confirmed = confirm("Are you sure you want to watch this video?");

      if (confirmed) {
      window.location.href = link.href;
      } else {
      window.location.href = lastUrl; 
      }
    
    }
    lastUrl = currentUrl;
  }

}).observe(document, { subtree: true, childList: true });

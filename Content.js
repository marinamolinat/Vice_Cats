
let videoArray = [null, "Title not found"]


//Use to avoid race conditions
function sendMessage(message) {



  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {

    chrome.storage.local.set({video: videoArray}, () => { //saves yt video to local storage
      console.log(`Value for video set to ${videoArray}`);
    });

    chrome.storage.local.set({boolean: false}, () => { // sets the ability to watch video as false

    });

    chrome.runtime.sendMessage(message);

  } else {

    setTimeout(() => sendMessage(message), 100);  
  }
}

if (window.location.href.includes("watch")) {
  const currentUrl = window.location.href;
  const currentVideoId = getVideoId(currentUrl);
  videoArray[0] = currentUrl;

  Promise.all([
    chrome.storage.local.get(["video"]),
    chrome.storage.local.get(["boolean"])
  ]).then(([videoResult, boolyResult]) => {
    let storedVideoId;

    if (Array.isArray(videoResult.video) && videoResult.video.length > 0) {
      storedVideoId = getVideoId(videoResult.video[0]);
    }

    const booly = boolyResult.boolean;

    console.log("Stored video ID:", storedVideoId);
    console.log("Current video ID:", currentVideoId);
    console.log("Booly value:", booly);

    // If not allowed, redirect
    if (!(booly === true && currentVideoId === storedVideoId)) {
      console.log("Redirecting to extension page");

      const interval = setInterval(() => {
        const titleElement = document.querySelector('#title .style-scope.ytd-watch-metadata');

        if (titleElement) {
          videoArray[1] = titleElement.textContent.trim();
          console.log("Title found:", videoArray[1]);

          clearInterval(interval);
          sendMessage({ action: "redirectToExtensionPage" });
        }
      }, 200);
    }
  });
}

function getVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}




// Detects if a yt vid is clicked
window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');

  if (anchor && anchor.href.includes('watch')) {
    event.preventDefault();                
    event.stopPropagation(); 
    videoArray[0] = anchor.href;
    const interval = setInterval(() => {
  
      let titleElement = anchor.querySelector('.yt-core-attributed-string.yt-core-attributed-string--white-space-pre-wrap') 
                    || anchor.closest('.style-scope.ytd-rich-grid-media')?.querySelector('.yt-core-attributed-string.yt-core-attributed-string--white-space-pre-wrap');



    if (titleElement) {
      videoArray[1] = titleElement.textContent.trim();
  
      clearInterval(interval); // stop checking once we get it
      sendMessage("Video info ready!");
    }
  }, 200);    
    sendMessage({ action: "redirectToExtensionPage" });


    
  }
}, true);


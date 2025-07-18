
let videoUrl;


//Use to avoid race conditions
function sendMessage(message) {



  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {

    chrome.storage.local.set({video: videoUrl}, () => { //saves yt video to local storage
      console.log(`Value for video set to ${videoUrl}`);
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
  videoUrl = currentUrl;

  Promise.all([
    chrome.storage.local.get(["video"]),
    chrome.storage.local.get(["boolean"])
  ]).then(([videoResult, boolyResult]) => {
    let storedVideoId = getVideoId(videoResult.video);

    const booly = boolyResult.boolean;

    console.log("Stored video ID:", storedVideoId);
    console.log("Current video ID:", currentVideoId);
    console.log("Booly value:", booly);

    // If not allowed, redirect
    if (!(booly === true && currentVideoId === storedVideoId)) {
      sendMessage({ action: "redirectToExtensionPage" });

    }
    
  });
}

function getVideoId(url) {
  if (typeof url !== 'string') return null;
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}



// Detects if a yt vid is clicked
window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');

  if (anchor && anchor.href.includes('watch')) {
    event.preventDefault();                
    event.stopPropagation(); 
    videoUrl = anchor.href;
    const interval = setInterval(() => {
  
    


  }, 200);    
    sendMessage({ action: "redirectToExtensionPage" });


    
  }
}, true);


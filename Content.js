
let videoUrl;


//Use to avoid race conditions
function sendMessage(message) {



  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.storage.local.set({video: videoUrl}, () => {
      console.log(`Value for video set to ${videoUrl}`);
    });
    chrome.runtime.sendMessage(message);

  } else {

    setTimeout(() => sendMessage(message), 100);  
  }
}


//Detects if the page loaded is a yt vid 
if (window.location.href.includes("watch")) {
  videoUrl = window.location.href;
  sendMessage({ action: "redirectToExtensionPage" });
  
}


// Detects if a yt vid is clicked
window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');
  videoUrl = anchor.href;

  if (anchor && anchor.href.includes('watch')) {
    event.preventDefault();                
    event.stopPropagation();               
    sendMessage({ action: "redirectToExtensionPage" });


    
  }
}, true);



let videoUrl;


//Use to avoid race conditions
function sendMessage(message) {



  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {

    chrome.storage.local.set({video: videoUrl}, () => { //saves yt video to local storage
      console.log(`Value for video set to ${videoUrl}`);
    });

    chrome.storage.local.set({boolean: false}, () => { // sets the ability to watch video as false
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

  Promise.all([
    chrome.storage.local.get(["video"]),
    chrome.storage.local.get(["boolean"])
  ]).then(([videoResult, boolyResult]) => {
    const url = videoResult.video;
    const booly = boolyResult.boolean; 

    console.log("Video URL from storage:", url);
    console.log("Booly value from storage:", booly);

    // You can put your logic here
    if (!(booly === true && window.location.href === url)) {
      console.log("Redirecting to extension page");
      sendMessage({ action: "redirectToExtensionPage" });
      
    }
  });

 

}


// Detects if a yt vid is clicked
window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');

  if (anchor && anchor.href.includes('watch')) {
    videoUrl = anchor.href;
    event.preventDefault();                
    event.stopPropagation();               
    sendMessage({ action: "redirectToExtensionPage" });


    
  }
}, true);


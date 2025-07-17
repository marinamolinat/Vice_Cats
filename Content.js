
let videoUrl = [null, null]


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


//Detects if the page loaded is a yt vid 
if (window.location.href.includes("watch")) {
    videoUrl[0] = window.location.href;

  Promise.all([
    chrome.storage.local.get(["video"]),
    chrome.storage.local.get(["boolean"])
  ]).then(([videoResult, boolyResult]) => {
    const url = videoResult.video[0];
    const booly = boolyResult.boolean; 

    console.log("Video URL from storage:", url);
    console.log("Booly value from storage:", booly);

    // You can put your logic here
    if (!(booly === true && window.location.href === url)) {
      console.log("Redirecting to extension page");
      const interval = setInterval(() => {
    const titleElement = document.querySelector('#title > .style-scope > .ytd-watch-metadata');

    if (titleElement) {
      videoUrl[1] = titleElement.textContent.trim();
      console.log("Title found:", videoUrl[1]);
      clearInterval(interval); // stop checking once we get it
      sendMessage({ action: "redirectToExtensionPage" });
    }
  }, 200);
      
      
    }
  });
  


 

}


// Detects if a yt vid is clicked
window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');

  if (anchor && anchor.href.includes('watch')) {
    event.preventDefault();                
    event.stopPropagation(); 
    videoUrl[0] = anchor.href;
    const interval = setInterval(() => {
    const titleElement = document.querySelector('#title > .style-scope > .ytd-watch-metadata');

    if (titleElement) {
      videoUrl[1] = titleElement.textContent.trim();
      console.log("Title found:", videoUrl[1]);
      clearInterval(interval); // stop checking once we get it
      sendMessage("Video info ready!");
    }
  }, 200);    
    sendMessage({ action: "redirectToExtensionPage" });


    
  }
}, true);


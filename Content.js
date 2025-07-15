

//Use to avoid race conditions
function sendMessage(message) {
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage(message);
  } else {
    console.warn("chrome.runtime not ready, retrying...");
    setTimeout(() => safeSendMessage(message), 100);  
  }
}

//Detects if the page loaded is a yt vid 
if (window.location.href.includes("watch")) {
  sendMessage({ action: "redirectToExtensionPage" });
}


// Detects if a yt vid is clicked
window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');

  if (anchor && anchor.href.includes('watch')) {
    event.preventDefault();                
    event.stopPropagation();               
    sendMessage({ action: "redirectToExtensionPage" });


    
  }
}, true);


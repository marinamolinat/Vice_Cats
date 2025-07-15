

//Use to avoid race conditions
function sendMessage(message) {
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage(message);
  } else {
    console.warn("chrome.runtime not ready, retrying...");
    setTimeout(() => safeSendMessage(message), 100);  
  }
}

if (window.location.href.includes("watch")) {
  sendMessage({ action: "redirectToExtensionPage" });
}



window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');

  if (anchor && anchor.href.includes('watch')) {
    event.preventDefault();                
    event.stopPropagation();               
    sendMessage({ action: "redirectToExtensionPage" });


    
  }
}, true);


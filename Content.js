// Will check if the page that loaded is a video
if (window.location.href.includes('watch')) {
  chrome.runtime.sendMessage({ action: "redirectToExtensionPage" });






}


window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');

  if (anchor && anchor.href.includes('watch')) {
    event.preventDefault();                
    event.stopPropagation();               
    chrome.runtime.sendMessage({ action: "redirectToExtensionPage" });


    
  }
}, true);


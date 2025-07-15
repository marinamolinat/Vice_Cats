// Will check if the page that loaded is a video
if (window.location.href.includes('watch')) {
  window.location.replace("https://www.youtube.com/");
  

  

}


window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');

  if (anchor && anchor.href.includes('watch')) {
    event.preventDefault();                
    event.stopPropagation();               
    console.log("Video click detected:", anchor.href);


    
  }
}, true);


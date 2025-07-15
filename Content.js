

window.addEventListener('click', function (event) {
  const anchor = event.target.closest('a');

  if (anchor && anchor.href.includes('watch')) {
    event.preventDefault();                
    event.stopPropagation();               
    console.log("Video click detected:", anchor.href);
    

    
  }
}, true);


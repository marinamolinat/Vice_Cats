
let lastUrl = location.href;


new MutationObserver(() => {
 const currentUrl = location.href;
 if (currentUrl !== lastUrl) {
  


   // Check if its a video URL
   if (currentUrl.includes("watch?v=")) {


     console.log(" Navigated to a YouTube video:", currentUrl);


     // content.js
     let reason = prompt("MIAU! Explain why you wish to watch this video. Write at least 20 words");
     if (reason === null || reason == undefined) {
       alert("Okay, glad you didnt succumed to addictioon :) ");
       window.location.href = lastUrl; // Redirect back to the last URL


     }
     else if(reason.split(" ").length < 20) {
       alert("Yo, you need atleast 20 words ");
       window.location.href = lastUrl; // Redirect back to the last URL
     }


     else {
       const confirmed = confirm("Are you sure you want to watch this video?");
       if (confirmed) {window.location.href = link.href;}
       else {window.location.href = lastUrl; }


     }
   
   }
   lastUrl = currentUrl;
 }


}).observe(document, { subtree: true, childList: true });
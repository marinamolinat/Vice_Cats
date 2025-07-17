const textarea = document.getElementById("myText");
const wordDisplayer = document.getElementById("wordCount");
const submitButton = document.getElementById("submit");
let wordCount = 0;
let youtubeVid = "https://www.youtube.com";

chrome.storage.local.get(["video"]).then((result) => {
  youtubeVid = result.video;
  
});


textarea.addEventListener("input", () => {
  const text = textarea.value.trim();
  wordCount = text.split(" ").length;
  wordDisplayer.textContent = `(${wordCount}/ 20)`;
  if (wordCount >= 20) {
    wordDisplayer.style.color = "green";
  }
  else{
    wordDisplayer.style.color = "red";
  }

});


submitButton.addEventListener("click", () => {
    if (wordCount >= 20) {
        chrome.storage.local.set({boolean: true}, () => { 
        window.location.href = youtubeVid
    });
      
    }
    else {
      alert("MIAU! You need to write at least 20 words");
    }
})



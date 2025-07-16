const textarea = document.getElementById("myText");
const wordDisplayer = document.getElementById("wordCount");
const submitButton = document.getElementById("submit");
let wordCount = 0;

chrome.storage.local.get(["video"]).then((result) => {
  const youtubeVid = result.video;
  textarea.value = youtubeVid
  console.log(`Value for video retrieved: ${youtubeVid}`);
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
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Redirect to a YouTube video

    }
})



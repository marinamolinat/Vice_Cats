const textarea = document.getElementById("myText");
const wordDisplayer = document.getElementById("wordCount");
const submitButton = document.getElementById("submit");
let wordCount = 0;
let youtubeVid = "https://www.youtube.com";
let title = "skibidi";
const changeCatButton = document.getElementById("buttonChangeCat");
const catImage = document.getElementById("catImage");
const comboBox = document.getElementById("catsCombo");

//load vice
chrome.storage.local.get("vice", (result) => {
    if (result.vice != undefined && result.vice != null)
    {
      catImage.src = "images/textBackDrops/" + result.vice

    }
    
  });




//load history.
chrome.storage.local.get("history", (result) => {
  const history = result.history || [];
  const ul = document.getElementById("historyUl");

  // Clear old content (just in case)
  ul.innerHTML = "";

  history.slice().reverse().forEach(entry => {
    const li = document.createElement("li");

    //style
    li.innerHTML = `
      <a href="${entry.link}" target="_blank">${entry.title + " 🔗"}</a><br>
      Why: <br> ${entry.justification}
    `;

    ul.appendChild(li);
  });
});


//Gets the yt url and yt title
chrome.storage.local.get(["video"]).then((result) => {
  youtubeVid = result.video[0];
  title = result.video[1]

});

//Makes color change
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

//save to history function
function saveToHistory(newEntry) {
  chrome.storage.local.get("history", (result) => {
    const history = result.history || [];
    history.push(newEntry);
    chrome.storage.local.set({ history });
  });
}


//Submit butto
submitButton.addEventListener("click", () => {
    if (wordCount >= 20) {
        chrome.storage.local.set({boolean: true}, () => { 
        // Usage:
      saveToHistory({
        title: title,
        link: youtubeVid,
        justification: textarea.value
      });  
        window.location.href = youtubeVid
    });
      
    }
    else {
      alert("MIAU! You need to write at least 20 words");
    }
})

changeCatButton.addEventListener("click", () => {
  const vice = comboBox.value;
  
  catImage.src = "images/textBackDrops/" + vice;
  chrome.storage.local.set({vice: vice}, () => {
      console.log(`Current vice ${vice}`);
    });



  
  




})


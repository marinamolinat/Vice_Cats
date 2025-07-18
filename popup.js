catImage = document.getElementById("catImage")
//load vice
chrome.storage.local.get("vice", (result) => {
    if (result.vice != undefined && result.vice != null)
    {
      catImage.src = "images/textBackDrops/" + result.vice

    }
    
  });


//load history
chrome.storage.local.get("history", (result) => {
  const history = result.history || [];
  const ul = document.getElementById("historyUl");

  // Clear old content (just in case)
  ul.innerHTML = "";

  history.slice().reverse().forEach(entry => {
    const li = document.createElement("li");

    //style
    li.innerHTML = `
      <a href="${entry.link}" target="_blank">${entry.title + " LINK"}</a><br>
      Why?: <br> ${entry.justification}
    `;

    ul.appendChild(li);
  });
});
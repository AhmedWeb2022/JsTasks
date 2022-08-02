// Variables
let theInput = document.querySelector(".get-repo input");
let getButton = document.querySelector(".git-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

//Functions
function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = `<span>Please Write Github Username</span>`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repositories) => {
        reposData.innerHTML = "";
        repositories.forEach((repo) => {
          // Create Main Div
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          //Create And Append Link
          let theUrl = document.createElement("a");
          let urlText = document.createTextNode("Visit");
          theUrl.appendChild(urlText);
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          theUrl.setAttribute("target", "_blank");
          mainDiv.appendChild(theUrl);
          // Create And Append Stars Span
          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
          starsSpan.appendChild(starsText);
          mainDiv.appendChild(starsSpan);
          //Create Class To Main Div And Append Main Div To ReposData
          mainDiv.className = "repo-box";
          reposData.appendChild(mainDiv);
        });
      });
  }
}

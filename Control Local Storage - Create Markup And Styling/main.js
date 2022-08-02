// Select Element
let allSpans = document.querySelectorAll(".button span");
let results = document.querySelector(".results > span");
let theInput = document.getElementById("the-input");
// loop for all spans
allSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-item")) {
      checkItem();
    }
    if (e.target.classList.contains("add-item")) {
      addItem();
    }
    if (e.target.classList.contains("delete-item")) {
      deleteItem();
    }
    if (e.target.classList.contains("show-items")) {
      showItems();
    }
  });
});
// Functions
function checkInput() {
  results.innerHTML = "You Must Add Items First";
}
function checkItem() {
  if (theInput.value !== "") {
    if (localStorage.getItem(theInput.value)) {
      results.innerHTML = `Found Local Storage Item Called <span>${theInput.value}</span>`;
    } else {
      results.innerHTML = `Cann't Found Local Storage Item Called <span>${theInput.value}</span>`;
    }
  } else {
    checkInput();
  }
}
function addItem() {
  if (theInput.value !== "") {
    localStorage.setItem(theInput.value, "test");
    results.innerHTML = `Local Storage Item <span>${theInput.value}</span> Is Added`;
    theInput.value = "";
  } else {
    checkInput();
  }
}
function deleteItem() {
  if (theInput.value !== "") {
    if (localStorage.getItem(theInput.value)) {
      localStorage.removeItem(theInput.value);
      results.innerHTML = ` Local Storage Item Called <span>${theInput.value}</span> Is Deleted`;
      theInput.value = "";
    } else {
      results.innerHTML = `Cann't Found Local Storage Item Called <span>${theInput.value}</span>`;
    }
  } else {
    checkInput();
  }
}
function showItems() {
  if (localStorage.length) {
    results.innerHTML = "";
    for (let [key, value] of Object.entries(localStorage)) {
      results.innerHTML += `<span class = "keys">${key}</span>`;
    }
  } else {
    results.innerHTML = `Local Storage Is Empty`;
  }
}

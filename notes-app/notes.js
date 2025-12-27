const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");  
  img.src = "images/delete.png";
  
  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);
  
  img.addEventListener("click", () => {
    inputBox.remove();
  });
  
  inputBox.focus();
});

// Load notes from localStorage on page load
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach(noteText => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.textContent = noteText;
    img.src = "images/delete.png";
    
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    
    img.addEventListener("click", () => inputBox.remove());
  });
}

// Save notes to localStorage whenever changed
notesContainer.addEventListener("input", saveNotes);

function saveNotes() {
  const noteTexts = Array.from(notesContainer.querySelectorAll(".input-box"))
    .map(note => note.textContent.trim())
    .filter(text => text.length > 0);
  localStorage.setItem("notes", JSON.stringify(noteTexts));
}

// Load on startup
loadNotes();
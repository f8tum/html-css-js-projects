// Open and close the form
const form = document.getElementById("addBookModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

openBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  form.classList.add("hidden");
});

form.addEventListener("click", (e) => {
  if (e.target === form) form.classList.add("hidden");
});


// Add a book with data from the form
// form elements
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const genreInput = document.getElementById("genreInput");
const statusInput = document.getElementById("statusInput");
const addBookBtn = document.getElementById("addBookBtn");
const errorMsg = document.getElementById("errorMsg");

// book grad and statistics
const booksGrid = document.getElementById("booksGrid");

const totalCountEl = document.getElementById("totalCount");
const availableCountEl = document.getElementById("availableCount");
const readingCountEl = document.getElementById("readingCount");
const borrowedCountEl = document.getElementById("borrowedCount");

// Books array to store data
let books = [];

addBookBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const genre = genreInput.value;
  const status = statusInput.value;

  // validate form
  if (!title || !author || !genre || !status) {
    errorMsg.textContent = "Please Fill in all the fields"
    return;
  }

  errorMsg.textContent = "";

  // add book to array
  books.push({title, author, genre, status})

  // update UI 
  renderBooks();
  renderStats();

  // Reset form
  titleInput.value = "";
  authorInput.value = "";
  genreInput.value = "";
  statusInput.value = "";

  // Close modal
  modal.classList.add("hidden");
});

function renderBooks() {
  booksGrid.innerHTML = "";

  const colors = ["burgundy", "blue", "green", "purple"];

  for (let i = 0; i < books.length; i++)
  {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.classList.add(colors[i % colors.length]);

    card.innerHTML = `
      <div class="book-cover">
        <h3>${books[i].title}</h3>
        <p>${books[i].author}</p>
      </div>
      <div class="book-body">
        <div class="badges">
          <span class="genre">${books[i].genre}</span>
          <span class="status ${books[i].status}">${books[i].status}</span>
        </div>
        <p>${books[i].description}</p>
        <div class="book-footer">
          <span>#${i + 1}</span>
          <span>${books[i].status}</span>
        </div>
      </div>
    `;

    booksGrid.appendChild(card);
  }
}

function renderStats() {

  let available = 0;
  let reading = 0;
  let borrowed = 0;

  for (let i = 0; i < books.length; i++) {

    if (books[i].status === "available")
      available++;

    if (books[i].status === "reading") 
      reading++;

    if (books[i].status === "borrowed")
      borrowed++;

  }

  totalCountEl.textContent = books.length;
  availableCountEl.textContent = available;
  readingCountEl.textContent = reading;
  borrowedCountEl.textContent = borrowed;
}
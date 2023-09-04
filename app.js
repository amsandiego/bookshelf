class Book {
  constructor(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.id = Math.random().toString(10).slice(2);
  }
}

class Library {
  constructor() {
    this.bookshelf = [];
  }

  addBook(book) {
    this.bookshelf.push(book);
  }

  removeBook(id) {
    this.bookshelf = this.bookshelf.filter((book) => book.id !== id);
  }
}

// Local storage
const saveLocalData = () => {
  localStorage.setItem('bookshelf', JSON.stringify(library.bookshelf));
};

const retrieveLocalData = () => {
  const books = JSON.parse(localStorage.getItem('bookshelf'));
  library.bookshelf = books.map(
    (book) => new Book(book.title, book.author, book.status)
  );
  console.log(library.bookshelf);
};

// User Interface
const addBookBtn = document.getElementById('add-book');
const addBookModal = document.getElementById('add-book-modal');
const addBookForm = document.getElementById('add-book-form');
const overlay = document.getElementById('overlay');
const bookshelfGrid = document.getElementById('bookshelf-grid');

const openAddBookModal = () => {
  addBookForm.reset();
  addBookModal.classList.add('active');
  overlay.classList.add('active');
};

const closeAddBookModal = () => {
  overlay.classList.remove('active');
  addBookModal.classList.remove('active');
};

const handleKeyboardInput = (e) => {
  if (e.key === 'Escape') closeAddBookModal();
};

const addBookToBookshelf = (e) => {
  e.preventDefault();
  const newBook = getInputData();

  library.addBook(newBook);
  saveLocalData();
  updateDisplay();
  closeAddBookModal();
};

const getInputData = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const status = document.getElementById('status').value;

  return new Book(title, author, status);
};

const removeBook = (e) => {
  console.log(e);
};

const updateDisplay = () => {
  //reset grid
  bookshelfGrid.innerHTML = '';
  for (let book of library.bookshelf) {
    createCard(book);
  }
};

const createCard = (book) => {
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const status = document.createElement('select');
  const deleteBtn = document.createElement('button');

  card.classList.add('card');
  deleteBtn.onclick = removeBook;

  title.textContent = book.title;
  author.textContent = book.author;
  deleteBtn.textContent = 'Delete';

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(deleteBtn);
  bookshelfGrid.appendChild(card);
};

// Event listeners
window.onkeydown = handleKeyboardInput;
addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;
addBookForm.onsubmit = addBookToBookshelf;

// Initialization
const library = new Library();
retrieveLocalData();
updateDisplay();

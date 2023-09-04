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
}

const library = new Library();

const addBookToBookshelf = (e) => {
  e.preventDefault();
  const newBook = getInputData();

  library.addBook(newBook);
  saveData();
  closeAddBookModal();
};

const getInputData = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const status = document.getElementById('status').value;

  return new Book(title, author, status);
};

// Local storage
const saveData = () => {
  localStorage.setItem('bookshelf', JSON.stringify(library.bookshelf));
};

// User Interface
const addBookBtn = document.getElementById('add-book');
const addBookModal = document.getElementById('add-book-modal');
const addBookForm = document.getElementById('add-book-form');
const overlay = document.getElementById('overlay');

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

// Event listeners
window.onkeydown = handleKeyboardInput;
addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;
addBookForm.onsubmit = addBookToBookshelf;

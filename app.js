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

  toggleStatus(id, newStatus) {
    const targetBook = this.bookshelf.find((book) => book.id === id);
    targetBook.status = newStatus;
    saveLocalData();
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
  const bookID = e.target.parentNode.parentNode.dataset.id;
  library.removeBook(bookID);
  saveLocalData();
  updateDisplay();
};

const updateDisplay = () => {
  //reset grid
  bookshelfGrid.innerHTML = '';

  //create cards
  for (let book of library.bookshelf) {
    createCard(book);
  }

  //listen for changes to book status
  toggleBookStatus();

  //update library stats
  const stats = getLibraryStats();
  updateStats(stats);
};

const createCard = (book) => {
  const card = document.createElement('div');
  const deleteBtn = document.createElement('button');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const statusOption = document.createElement('select');
  const read = document.createElement('option');
  const inProgress = document.createElement('option');
  const toRead = document.createElement('option');

  card.classList.add('card');
  author.classList.add('author');
  deleteBtn.classList.add('delete-button');
  card.setAttribute('data-id', `${book.id}`);

  // Status Dropdown Selector
  statusOption.classList.add('status-option', 'new-status');
  read.setAttribute('value', 'read');
  inProgress.setAttribute('value', 'in-progress');
  toRead.setAttribute('value', 'to-read');
  read.textContent = 'Read';
  inProgress.textContent = 'Currently Reading';
  toRead.textContent = 'To Read';
  if (book.status === 'read') {
    read.setAttribute('selected', '');
    statusOption.classList.add('read');
  } else if (book.status === 'in-progress') {
    inProgress.setAttribute('selected', '');
    statusOption.classList.add('in-progress');
  } else if (book.status === 'to-read') {
    toRead.setAttribute('selected', '');
    statusOption.classList.add('to-read');
  }

  deleteBtn.onclick = removeBook;

  title.textContent = book.title;
  author.textContent = book.author;
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  card.appendChild(deleteBtn);
  card.appendChild(title);
  card.appendChild(author);
  statusOption.appendChild(read);
  statusOption.appendChild(inProgress);
  statusOption.appendChild(toRead);
  card.appendChild(statusOption);
  bookshelfGrid.appendChild(card);
};

const toggleBookStatus = () => {
  document.querySelectorAll('.new-status').forEach((option) => {
    option.addEventListener('change', (e) => {
      const bookID = e.target.closest('.status-option').parentNode.dataset.id;
      const newStatus = e.target.value;

      library.toggleStatus(bookID, newStatus);
      updateDisplay();
    });
  });
};

const getLibraryStats = () => {
  const totalBooks = library.bookshelf.length;
  const booksRead = library.bookshelf.filter(
    (book) => book.status === 'read'
  ).length;
  const booksReading = library.bookshelf.filter(
    (book) => book.status === 'in-progress'
  ).length;
  const booksToRead = library.bookshelf.filter(
    (book) => book.status === 'to-read'
  ).length;

  return {
    totalBooks,
    booksRead,
    booksReading,
    booksToRead,
  };
};

const updateStats = (stats) => {
  const { totalBooks, booksRead, booksReading, booksToRead } = stats;

  const totalElement = document.getElementById('total-books');
  const readElement = document.getElementById('read-books');
  const readingElement = document.getElementById('in-progress-books');
  const toReadElement = document.getElementById('to-read-books');

  totalElement.textContent = totalBooks || '0';
  readElement.textContent = booksRead || '0';
  readingElement.textContent = booksReading || '0';
  toReadElement.textContent = booksToRead || '0';
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

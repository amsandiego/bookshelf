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
  errorMsg.classList.remove('active');
  errorMsg.textContent = '';
};

const handleKeyboardInput = (e) => {
  if (e.key === 'Escape') closeAddBookModal();
};

window.onkeydown = handleKeyboardInput;
addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;

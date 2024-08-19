// Struktur data buku
const bookStructure = {
  id: String(Date.now()), // Gunakan timestamp untuk id unik
  title: '',
  author: '',
  year: 0,
  isComplete: false,
};

// Mendapatkan data buku dari localStorage
function getBooksFromLocalStorage() {
  const booksJSON = localStorage.getItem('bookshelf');
  return JSON.parse(booksJSON) || [];
}

// Menyimpan data buku ke localStorage
function addBook(bookData) {
  const books = getBooksFromLocalStorage();
  books.push(bookData);
  localStorage.setItem('bookshelf', JSON.stringify(books));
}

// Menampilkan daftar buku di rak
function displayBooks(books, bookshelfListElement) {
  bookshelfListElement.innerHTML = '';
  books.forEach((book) => {
    const bookItemElement = document.createElement('article');
    bookItemElement.classList.add('book_item');

    const bookTitleElement = document.createElement('h3');
    bookTitleElement.textContent = book.title;

    const bookAuthorElement = document.createElement('p');
    bookAuthorElement.textContent = `Penulis: ${book.author}`;

    const bookYearElement = document.createElement('p');
    bookYearElement.textContent = `Tahun: ${book.year}`;

    const bookActionElement = document.createElement('div');
    bookActionElement.classList.add('action');

    const moveToCompleteButton = document.createElement('button');
    moveToCompleteButton.classList.add('green');
    moveToCompleteButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.textContent = 'Hapus buku';

    bookActionElement.appendChild(moveToCompleteButton);
    bookActionElement.appendChild(deleteButton);

    bookItemElement.appendChild(bookTitleElement);
    bookItemElement.appendChild(bookAuthorElement);
    bookItemElement.appendChild(bookYearElement);
    bookItemElement.appendChild(bookActionElement);

    bookshelfListElement.appendChild(bookItemElement);

    // Menambahkan event listener untuk tombol
    moveToCompleteButton.addEventListener('click', () => {
      book.isComplete = !book.isComplete;
      updateBook(book);
    });

    deleteButton.addEventListener('click', () => {
      deleteBook(book.id);
    });
  });
}

// Menampilkan rak buku
function displayBookshelves() {
  const incompleteBookshelfListElement = document.getElementById('incompleteBookshelfList');
  const completeBookshelfListElement = document.getElementById('completeBookshelfList');

  const books = getBooksFromLocalStorage();
  const incompleteBooks = books.filter((book) => !book.isComplete);
  const completeBooks = books.filter((book) => book.isComplete);

  displayBooks(incompleteBooks, incompleteBookshelfListElement);
  displayBooks(completeBooks, completeBookshelfListElement);
}

// Menambahkan buku baru
function addBookFromForm() {
  const inputBookElement = document.getElementById('inputBook');
  const inputTitleElement = document.getElementById('inputBookTitle');
  const inputAuthorElement = document.getElementById('inputBookAuthor');
  const inputYearElement = document.getElementById('inputBookYear');
  const inputIsCompleteElement = document.getElementById('inputBookIsComplete');

  const newBook = {
    ...bookStructure,
    title: inputTitleElement.value,
    author: inputAuthorElement.value,
    year: parseInt(inputYearElement.value),
    isComplete: inputIsCompleteElement.checked,
  };

  addBook(newBook);
  displayBookshelves();

  // Reset form
  inputTitleElement.value = '';
  inputAuthorElement.value = '';
  inputYearElement.value = '';
  inputIsCompleteElement.checked = false;
}

// Memperbarui buku
function updateBook(updatedBook) {
  const books = getBooksFromLocalStorage();
  const bookIndex = books.findIndex((book) => book.id === updatedBook.id);

  if (bookIndex !== -1) {
    books[bookIndex] = updatedBook;
    localStorage.setItem('bookshelf', JSON.stringify(books));
    displayBookshelves();
  }
}

// Menghapus buku
function deleteBook(bookId) {
  const books = getBooksFromLocalStorage();
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    localStorage.setItem('bookshelf', JSON.stringify(books));
    displayBookshelves();
  }
}

// Menambahkan event listener untuk form
const inputBookElement = document.getElementById('inputBook');
inputBookElement.addEventListener('submit', (event) => {
  event.preventDefault();
  addBookFromForm();
});

// Menampilkan rak buku saat pertama kali
displayBookshelves();
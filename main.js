const container = document.querySelector('.container');
const form = document.querySelector('form');
const addBookBtn = document.querySelector('.add-book');

const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status, list) {
  const book1 = new Book(title, author, pages, status);
  list.push(book1);
}

function removeEveryCard() {
  [...document.querySelectorAll('.card')].map((card) => {
    card.remove();
  });
}

function formToggle() {
  form.classList.toggle('form-toggle');
}

Book.prototype.changeStatus = function () {
  if (this.status === 'read') {
    console.log('hi')
    this.status = 'not read';
  } else {
    this.status = 'read';
  }
    removeEveryCard();
    addBooksToPage(myLibrary);
};

function addBooksToPage(list) {
  list.map((book, index) => {
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const status = document.createElement('p');
    const removeBookBtn = document.createElement('button');
    const changeStatusBtn = document.createElement('button');
    const statusDiv = document.createElement('div');

    removeBookBtn.classList.add('btn');
    removeBookBtn.classList.add('remove-book');
    card.classList.add('card');
    changeStatusBtn.classList.add('btn');
    changeStatusBtn.classList.add('change-button');
    statusDiv.classList.add('status-div');

    title.textContent = `${book.title}`;
    author.textContent = `By ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    status.textContent = `Status: ${book.status}`;
    removeBookBtn.textContent = 'Remove Book';
    changeStatusBtn.textContent = 'Change';

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    statusDiv.appendChild(status);
    statusDiv.appendChild(changeStatusBtn);
    card.appendChild(statusDiv);
    card.appendChild(removeBookBtn);
    container.appendChild(card);

    removeBookBtn.setAttribute('type', 'button');
    changeStatusBtn.setAttribute('type', 'button');

    console.log(myLibrary);

    changeStatusBtn.addEventListener('click', () => book.changeStatus())

    removeBookBtn.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      removeEveryCard();
      addBooksToPage(myLibrary);
    });

    return true;
  });
}

addBookBtn.addEventListener('click', () => formToggle());

form.addEventListener('submit', (e) => {
  e.preventDefault();

  removeEveryCard();

  const bookTitle = document.querySelector('#book-title');
  const bookAuthor = document.querySelector('#book-author');
  const bookPages = document.querySelector('#book-pages');
  let status = '';

  document.getElementsByName('status').forEach((button) => {
    if (button.checked) {
      status = button.value;
    } else return true;
  });

  addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, status, myLibrary);
  addBooksToPage(myLibrary);

  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = '';

  formToggle();
});

addBookToLibrary('Three Comrades', 'Erich Maria Remarque', 500, 'not read', myLibrary);
addBookToLibrary('Pippi Longstocking', 'Astrid Lindgren', 250, 'not read', myLibrary);
addBookToLibrary('Games of Thrones', 'George R. R. Martin', 694, 'not read', myLibrary);

addBooksToPage(myLibrary);

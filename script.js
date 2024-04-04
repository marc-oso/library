const addBookBtn = document.querySelector(".add-book");
const addBookOverlay = document.querySelector(".overlay-cont");
const addBookForm = document.querySelector(".add-book-form");
const inputFocus = document.querySelector("#name");
const addMessage = document.querySelector('.add-message');
const deleteMessage = document.querySelector('.delete-message');
const submitter = document.querySelector('.submit-btn');
const booksContainer = document.querySelector('.books-wrapper');
const duplicateMessage = document.querySelector('.duplicate-message');
const readCheckBox = document.querySelector('.read-checkbox');
const statusMessage = document.querySelector('.status-message');

let myLibrary = [];

//displayBooks(); // To display hard coded initial book objects in myLibrary Array


/* Book Constructor */

function Book(title, author = 'Unknown', pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `The book '${this.title}' by '${this.author}, ${this.pages} pages, ${this.read}.`;
    }
}


/* Adding book to LibraryArray */

addBookForm.addEventListener('submit', function(event) {
    addBookToLibrary();
    event.preventDefault();
    addBookOverlay.computedStyleMap.visibility = "hidden";
    addBookForm.reset();
})

function addBookToLibrary() {

    // get book details from form-input
    const title = document.querySelector('#name').value;
    const author = document.querySelector('#author').value;
    const pages = parseInt(document.querySelector('#pages').value);
    const read = document.querySelector('#read').checked; //checked status

    //check if book already exits before adding it to library
    if (myLibrary.some(book => book.title.toLowerCase() === title.toLowerCase()) && 
        myLibrary.some(book => book.author.toLowerCase() === author.toLowerCase())) {

        // alert that book already exists
        duplicateMessage.style.visibility = 'visible';

        setTimeout(function() {
            duplicateMessage.style.visibility = 'hidden';
        }, 1000);

        return;

    } else {
        // create new book object with input values
        const newBook = new Book(title, author, pages, read)

        // add new book oject to libarayArray
        myLibrary.push(newBook);

        // update display with current books in library after addition
        displayBooks();

        // alert that book is added
        addMessage.style.visibility = 'visible';

        setTimeout(function() {
            addMessage.style.visibility = 'hidden';
        }, 1000);
    }
}


/* displaying books in LibraryArray */

function displayBooks() {
    booksContainer.replaceChildren('');
    myLibrary.forEach(book => {
       addBookCard(book.title, book.author, book.pages, book.read); 
    });
}

function addBookCard(name, author, pages, read) {

    // assign usable or human friendly value to read Status
    const readStatus = assignReadStatus(read);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    // book card html blue print
    bookCard.innerHTML = 
    `<div class="book">
        <div class="name-author-cont">
            <div class="book-name">${name}<hr></div>
            <div class="book-author">${author}</div>
        </div>
        <div class="book-pages">Pages: <span class="pages">${pages}</span></div>
        <div class="book-status">Status: <button class="status ${(read === true)?'read':''}">${readStatus}</button></div>
    </div>
    <div class="book-controls">
        <button class="delete-btn" type="button">
            <img src="./assests/delete.svg" alt="delete" class="delete-icon">
        </button>
    </div>`;


    //  Set dynamically delete event handlers to each book 
    const deleteButton = bookCard.querySelector('.delete-btn');
    deleteButton.addEventListener('click', removeBook);

    // attach book name as id to uniquely identify the book to ease querying
    deleteButton.setAttribute('id', `${name}`)

    // set dynamically toggleStatus event listeners to each book created
    const toggleButton = bookCard.querySelector('.status');
    toggleButton.addEventListener('click', toggleStatus); 

    // attach book name as id to uniquely identify the book to ease querying
    toggleButton.setAttribute('id', `${name}`);

    booksContainer.appendChild(bookCard);

}


/* Assigning value to be used when displaying books */

function assignReadStatus(isChecked) {
    if (isChecked === true) {
        return 'Read'
    } else {
        return 'Not Read'
    }
}


/* Remove Book from LibraryArray */

function removeBook(e) {
    
    const bookID = e.currentTarget.getAttribute('id');

    const bookIndex = myLibrary.findIndex(book => book.title === bookID)

    myLibrary.splice(bookIndex, 1);

    displayBooks();

    // alert that book is added
    deleteMessage.style.visibility = 'visible';

    setTimeout(function() {
        deleteMessage.style.visibility = 'hidden';
    }, 1000);
    
}


/* Toggle read status, while updating value in library array */

function toggleStatus(e) {

    const bookID = e.target.getAttribute('id');

    const bookIndex = myLibrary.findIndex(book => book.title === bookID);

    // toggle status from library array
    const currentReadStatus = myLibrary[bookIndex].read;
    myLibrary[bookIndex].read = !currentReadStatus;

    // update or refresh display after toggling value
    displayBooks();

    // alert that book read status is updated
    statusMessage.style.visibility = 'visible';

    setTimeout(function() {
        statusMessage.style.visibility = 'hidden';
    }, 1000);

}


/* Hide and Unhide Input Form */

addBookBtn.addEventListener('click', function() {
    addBookOverlay.style.visibility = "visible";
    inputFocus.focus();
});

addBookOverlay.addEventListener('click', function(e) {
    if (e.target === addBookOverlay) {
        addBookOverlay.style.visibility = "hidden";
    }
});
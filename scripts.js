import { BOOKS_PER_PAGE, books, genres, authors } from "./data.js"


/**
 * 
 * The code starts by redeclaring variables for books imported from data.js and declaring an initial varialble for the starting page as well as an array for the range. 
 * 
 */

const matches = books
const page = 1
const range = []

/**
 * Here the code is setting conditions for potential errors 
 */

if (!books && !Array.isArray(books)) throw new Error('Source required')  
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

/**
 * The display can toggle between dark/light modes.
 */

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

/**
 * The cover image is displayed in list and preview.
 */


const listContainer = document.querySelector('[data-list-items]')
const fragment = document.createDocumentFragment()
const maxBooksToShow = 36
let booksShown = 0

for (let i = 0; i < matches.length && booksShown < maxBooksToShow; i++) {
  const book = matches[i]
  const authorName = authors[book.author]

  const element = document.createElement('button')
  element.classList.add('preview')
  element.setAttribute('data-preview', book.id)

  element.innerHTML = /* html */ `
    <img class="preview__image" src="${book.image}" />
    <div class="preview__info">
      <h3 class="preview__title">${book.title}</h3>
      <div class="preview__author">${authorName}</div>
    </div>
  `;

  fragment.appendChild(element);
  booksShown++;
}

listContainer.appendChild(fragment);


/**
 * The code below creates the functionality for the "Show More" button
 */

let currentPage = page + 1

const showMoreButton = document.querySelector('[data-list-button]')

showMoreButton.addEventListener('click', () => {
  const listContainer = document.querySelector('[data-list-items]')
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE
  const endIndex = startIndex + BOOKS_PER_PAGE

if (startIndex < matches.length) {
    const fragment = document.createDocumentFragment()
for (let i = startIndex; i < endIndex && i < matches.length; i++) {
      const book = matches[i]
      const authorName = authors[book.author]

      const element = document.createElement('button')
      element.classList.add('preview');
      element.setAttribute('data-preview', book.id)

      element.innerHTML = /* html */ `
        <img class="preview__image" src="${book.image}" />
        <div class="preview__info">
          <h3 class="preview__title">${book.title}</h3>
          <div class="preview__author">${authorName}</div>
        </div>
      `
      fragment.appendChild(element)
    }

listContainer.appendChild(fragment)
currentPage++

    if (startIndex + BOOKS_PER_PAGE >= matches.length) {
      showMoreButton.disabled = true
    }
  } else {
    showMoreButton.disabled = true
  }
})

if (currentPage * BOOKS_PER_PAGE >= matches.length) {
  showMoreButton.disabled = true
}

/**
 * Adds "showmore +amount" to button // amount incorrect 
 */

const remaining = Math.max(matches.length - currentPage * BOOKS_PER_PAGE, 37)
showMoreButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
`

 /**
 * 
 * These are  events to open and close the header search. 
 * 
 * @param {click} event 
 * @param {click} event 
 * 
 */

const handleHeaderSearch = (event) => {

    const { target } = event
    const searchOverlay =  document.querySelector('[data-search-overlay]')
    const searchTitle = document.querySelector('[data-search-title]')
    
    if (target.hasAttribute('data-header-search')) {
        searchOverlay.show()
        searchTitle.focus()
    }
    
    if (target.hasAttribute('data-search-cancel')) {
        searchOverlay.close()
    
    }
    
    }
    
    document.querySelector('[data-header-search]').addEventListener('click', handleHeaderSearch)
    document.querySelector('[data-search-cancel]').addEventListener('click', handleHeaderSearch)

/**
 *  The search list can be filtered by genre. 
 */

const genresSelect = document.createElement('select')
const allGenresOption = document.createElement('option')
allGenresOption.value = 'any'
allGenresOption.innerText = 'All Genres'
genresSelect.appendChild(allGenresOption)

for (const [id, name] of Object.entries(genres)) {
  const genreOption = document.createElement('option')
  genreOption.value = id
  genreOption.innerText = name
  genresSelect.appendChild(genreOption)
}

document.querySelector('[data-search-genres]').appendChild(genresSelect)

/**
 *  The search list can be filtered by author. 
 */

const authorsSelect = document.createElement('select')
const allAuthorsOption = document.createElement('option')
allAuthorsOption.value = 'any'
allAuthorsOption.innerText = 'All Authors'
authorsSelect.appendChild(allAuthorsOption)

for (const [id, name] of Object.entries(authors)) {
  const authorOption = document.createElement('option')
  authorOption.value = id
  authorOption.innerText = name
  authorsSelect.appendChild(authorOption)
}

document.querySelector('[data-search-authors]').appendChild(authorsSelect)

/**
 *  The display can toggle between dark/light modes.
 */


// document.querySelector('[data-settings-theme]').value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// const v = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

// document.documentElement.style.setProperty('--color-dark', night.dark[v]);
// document.documentElement.style.setProperty('--color-light', day.light[v]);


// Create an event handler and listener here? 

// document.querySelector('[data-settings-cancel]').click(); { document.querySelector('[data-settings-overlay]').open === false }

// Need to resolve: actions is not defined, also this line of code causes terrible throttling in live server

// document.querySelector('[data-settings-form]').submit(); { actions.settings.submit } 






/** 
 * The book list can be filtered by partial matches with the title.
 */


// Create an event handler and listener here? // Need to resolve: Fliters is used before it is defined

// document.querySelector('[data-search-form]').click(filters); {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if (singleGenre === filters.genre) { genreMatch === true }}}
//         }

//         if (titleMatch && authorMatch && genreMatch) ()=>  result.push(book)
//     }

//     if (display.length < 1) {
//         data-list-message.classList.add('list__message_show')
//     } else {
//         data-list-message.classList.remove('list__message_show')
//     }
    


/**
 * The display can toggle between dark/light modes.
 */

// Create an event handler and listener here? Need to resolve: preventDefault() is not defined

// document.querySelector('[data-settings-overlay]').submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark)
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light)
//     data-settings-overlay.open === false
// }



document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let activeBook = null
  
    for (const node of pathArray) {
      const previewId = node?.dataset?.preview
  
      if (previewId) {
        activeBook = books.find((singleBook) => singleBook.id === previewId)
        break
      }
    }
  }
  )


document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const clickedElement = event.target.closest('.preview')
    
    if (!clickedElement) {
      return
    }
    
    const previewId = clickedElement.dataset.preview;
    const activeBook = books.find((book) => book.id === previewId);
  
    if (!activeBook) {
      return
    }
  
    openOverlay(activeBook);
  })

  function openOverlay(book) {
    const overlay = document.querySelector('[data-list-active]')
    overlay.open = true
    document.querySelector('[data-list-blur]').src = book.image;
    document.querySelector('[data-list-title]').textContent = book.title;
    document.querySelector('[data-list-subtitle]').textContent = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
    document.querySelector('[data-list-description]').textContent = book.description
  }

  document.querySelector('[data-settings-overlay]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    document.querySelector('[data-settings-overlay]').open = false
  })

  document.addEventListener('DOMContentLoaded', () => {
    // Your existing code
  
    // Event listener for clicking on the "Close" button within the overlay
    document.querySelector('[data-list-close]').addEventListener('click', () => {
      closeOverlay();
    });
  
    // Function to close the overlay
    function closeOverlay() {
      const overlay = document.querySelector('[data-list-active]');
      overlay.open = false;
    }
  });
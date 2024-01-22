
import { BOOKS_PER_PAGE, books, genres, authors } from "./data.js"

/**
 *
 * The code starts by redeclaring variables for books imported from the object
 * varables created in data.js above and declaring an initial varialble for the
 * starting page as well as an array for the range. 
 *
 */

const matches = books
const page = 1
const range = []



/**
 * 
 * Here the code is setting conditions for potential errors utlising thse parameters:
 * @param {array} - books 
 * @param {array} - range
 * 
 */

if (!books && !Array.isArray(books)) throw new Error('Source required')  
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')


/**
 * This code sets up the container for the list of books, in order to present 
*  each cover image as well as each book and author title. 
*/


const listContainer = document.querySelector('[data-list-items]')

/**
 * 
* This creates a document fragment to append multiple elements from HTML.
* @type {DocumentFragment} 
*
*/
 

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
  `

  fragment.appendChild(element)
  booksShown++;
}

listContainer.appendChild(fragment)


let currentPage = page + 1

const showMoreButton = document.querySelector('[data-list-button]')

/**
 * 
 * Below is an Event listener for the "Show More" button click event.
 * This function handles the display of additional books from the list.
 * @param {click}  
 * 
 */


showMoreButton.addEventListener('click', () => {
const listContainer = document.querySelector('[data-list-items]')
const startIndex = (currentPage - 1) * BOOKS_PER_PAGE
const endIndex = startIndex + BOOKS_PER_PAGE

/**
* Below is an if statement to check if there are more books to display as well
* as a document fragment to append multiple elements to the DOM.
* @type {DocumentFragment} 
* This is followed by a loop through the books to display on the current page.
*
*/  

if (startIndex < matches.length) {
    const fragment = document.createDocumentFragment()
for (let i = startIndex; i < endIndex && i < matches.length; i++) {
      const book = matches[i]
      const authorName = authors[book.author]

 /**
* This is a button element representing a book preview, which provides the same
*  code as above, in order to present each cover image as well as each book and
*  author title in the context of the Show More button
* @type {HTMLButtonElement}  Generates the book preview
*/


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

/**
 * The if statements below set up the conditions for when to disable the Show More button.
 */

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

const remaining = Math.max(matches.length - currentPage * BOOKS_PER_PAGE, 0)
showMoreButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
`

 /**
  * 
  * This function creates the individual book preview overlays when single
  * entries on the list are clicked through using by accessing data- attributes within
 * the HTML using the Document: querySelector() method
  * method
  * @param {document} book 
  *
  */ 

 const openOverlay = (book) => {
    const overlay = document.querySelector('[data-list-active]')
    overlay.open = true
    document.querySelector('[data-list-blur]').src = book.image
    document.querySelector('[data-list-image]').src = book.image
    document.querySelector('[data-list-title]').textContent = book.title
    document.querySelector('[data-list-subtitle]').textContent = `${authors[book.author]} (${new Date(book.published).getFullYear()})`
    document.querySelector('[data-list-description]').textContent = book.description
  }

  document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const clickedElement = event.target.closest('.preview')
    
    if (!clickedElement) {
      return
    }
    
    const previewId = clickedElement.dataset.preview;
    const activeBook = books.find((book) => book.id === previewId)
  
    if (!activeBook) {
      return
    }
  
    openOverlay(activeBook)
  })
  
/**
 * 
 * This function closes the Preview overlay.
 * 
 */

  const closeOverlay = () => {
    const overlay = document.querySelector('[data-list-active]');
    overlay.open = false;
  }


document.querySelector('[data-list-close]').addEventListener('click', () => {
  closeOverlay()
})

 /**
 * 
 * These are event handelrs followed by event listerners to open and close the header search. When clicked initially
 * they ensure that the title, author and genre inputs are reset to "any".
 * 
 * @param {click} event  - This opens the Search overlay
 * @param {click} event  - This closes the Search  overlay
 * 
 */

const handleHeaderSearch = (event) => {
const { target } = event
  
const searchOverlay = document.querySelector('[data-search-overlay]')
const titleInput = searchForm.querySelector('[data-search-title]')
const authorSelect = searchForm.querySelector('[data-search-authors]')
const genresSelect = searchForm.querySelector('[data-search-genres]')
  
titleInput.value = ''
authorSelect.value = 'any'
genresSelect.value = 'any'
  
    if (target.hasAttribute('data-header-search')) {
      searchOverlay.showModal()
      titleInput.focus()
    }
  
    if (target.hasAttribute('data-search-cancel')) {
      searchOverlay.close()
    }
  }
  
  document.querySelector('[data-header-search]').addEventListener('click', handleHeaderSearch)
  document.querySelector('[data-search-cancel]').addEventListener('click', handleHeaderSearch)


/**
 *
 * The following are a set of variables declared in order to set up the loops
 * below them for the search functionality and to access data- attributes within
 * the HTML using the Document: querySelector() method. These set up elements
 * such as the drop down options, ensure the initial option of "All Authors",
 * and "All Genres"
 *
 */  

const overlayDialog = document.querySelector('[data-search-overlay]')
const searchForm = overlayDialog.querySelector('[data-search-form]')
const authorSelect = searchForm.querySelector('[data-search-authors]')
const genresSelect = searchForm.querySelector('[data-search-genres]')
const titleInput = searchForm.querySelector('[data-search-title]')

const allAuthorsOption = document.createElement('option')
allAuthorsOption.value = 'any'
allAuthorsOption.innerText = 'All Authors'
authorSelect.appendChild(allAuthorsOption)

for (const [authorId, authorName] of Object.entries(authors)) {
  const authorOption = document.createElement('option')
  authorOption.value = authorId
  authorOption.textContent = authorName
  authorSelect.appendChild(authorOption)
}

const allGenresOption = document.createElement('option')
allGenresOption.value = 'any'
allGenresOption.innerText = 'All Genres'
genresSelect.appendChild(allGenresOption)

for (const [genreId, genreName] of Object.entries(genres)) {
  const genreOption = document.createElement('option')
  genreOption.value = genreId
  genreOption.textContent = genreName
  genresSelect.appendChild(genreOption)
}

/**
 *
 * This is the final event listener established in order to approapriately
 * filter individal entries by genre, author as well as partial matches with
 * the title. It also includes conditions for a message explaining that no
 * matches were found within the search.
 *
 */

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
  
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = [] 

    for (const book of books) { 
    const titleMatch =
    filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())
    const authorMatch = filters.author === 'any' || book.author === filters.author
    let genresMatch = filters.genre === 'any' 
  
    if (filters.genre !== 'any') {
        for (const singleGenre of book.genres) {
          if (singleGenre === filters.genre) {
            genresMatch = true;
            break
          }
        }
      }
  
      if (titleMatch && authorMatch && genresMatch) {
        result.push(book)
      }
    }
  
    if (result.length < 1) {
      document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
     document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }
  
    document.querySelector('[data-list-items]').innerHTML = ''
    const fragment = document.createDocumentFragment()
    const extracted = result.slice(range[0], range[1])
  
    for (const { author, image, title, id } of extracted) {
      const element = document.createElement('button')
      element.classList = 'preview'
      element.setAttribute('data-preview', id)
  
      element.innerHTML = /* html */ `
        <img
          class="preview__image"
          src="${image}"
        />
  
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `
  
      fragment.appendChild(element)
    }
    
    document.querySelector('[data-list-items]').appendChild(fragment)


    titleInput.value = ''
    authorSelect.value = 'any'
    genresSelect.value = 'any'

    overlayDialog.close()
  

  })




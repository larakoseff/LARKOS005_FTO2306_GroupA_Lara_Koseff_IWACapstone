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



const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}


const createPreview = () => {

const fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)

for (let { author, image, title, id } of extracted) {
  const preview = ({
    author,
    id,
    image,
    title,
  });
  fragment.appendChild(preview);
}


document.querySelector('[data-list-items]').appendChild(fragment)

}


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

document.querySelector('[data-settings-theme]').value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
const v = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

document.documentElement.style.setProperty('--color-dark', night.dark[v]);
document.documentElement.style.setProperty('--color-light', day.light[v]);
document.querySelector('[data-list-button]').textContent === "Show more (books.length - BOOKS_PER_PAGE)"

document.querySelector('[data-list-button]').disabled === !(matches.length - [page * BOOKS_PER_PAGE] > 0)

document.querySelector('[data-list-button]').innerHTML === /* html */ [
    `<span>Show more<span>,
    <span class="list__remaining"> (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})</span>`
]

// Create an event handler and listener here? 

document.querySelector('[data-search-cancel]').click(); { document.querySelector('[data-search-overlay]').open === false }
document.querySelector('[data-settings-cancel]').click(); { document.querySelector('[data-settings-overlay]').open === false }

// Need to resolve: actions is not defined, also this line of code causes terrible throttling in live server

// document.querySelector('[data-settings-form]').submit(); { actions.settings.submit } 

// Create an event handler and listener here? 

document.querySelector('[data-list-close]').click(); { document.querySelector('[data-list-active]').open === false }

// document.querySelector('[data-list-button]').click(); {

//    Need to resolve: fragment is not defined

//     document.querySelector('[data-list-items]').appendChild(createPreview(Fragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)));

//     Need to resolve: actions is not defined
//     actions.list.updateRemaining()

//     Need to resolve: cannot access page without initialisation 
//     let page = page + 1 
// }

// Add event listener and handler here?

// document.querySelector('[data-header-search]').click(); {
// document.querySelector('[data-search-overlay]').open === true ;
// document.querySelector('[data-search-title]').focus();
// }

const handleHeaderSearch = (event) => {

const { target } = event
const searchOverlay =  document.querySelector('[data-search-overlay]')
const searchTitle = document.querySelector('[data-search-title]')

if (target.hasAttribute('data-header-search')) {
    searchOverlay.showModal()
    searchTitle.focus()
}

}

document.querySelector('[data-header-search]').addEventListener('click', handleHeaderSearch)


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
    

// Need to resolve: props is not defined

// document.querySelector('[data-list-items]').innerHTML === ''
//     const fragment = document.createDocumentFragment()
//     const extracted = matches.slice(range[0], range[1])

//     for (const { author, image, title, id } of extracted) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }


// Need to resolve: fragments is not defined

// document.querySelector('[data-list-items]').appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     document.querySelector('[data-list-button]').disabled === initial > 0

// document.querySelector('[data-list-button]').innerHTML === /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' })
//     data-search-overlay.open === false


// Create an event handler and listener here? Need to resolve: preventDefault() is not defined

// document.querySelector('[data-settings-overlay]').submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark)
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light)
//     data-settings-overlay.open === false
// }


// Need to resolve: cannot read properties of path

// document.querySelector('[data-list-items]').click(); {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if (active) break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
// }

// Need to resolve: "illegal return"

    // if (!active) {
    // return data-list-active.open === true
    // data-list-blur + data-list-image === active.image
    // data-list-title === active.title
    // }
    
    // Need to resolve: Active is not defined

    // document.querySelector('[data-list-subtitle]') === `${authors[active.author]} (${Date(active.published).year})`
    // document.querySelector('[data-list-description]') === active.description


const elMenu = getElem('.film__menu');
const elForm = getElem('#form');
const elSearch = getElem('#search', elForm);
const elSelect = getElem('#select', elForm);
const elFilter = getElem('#film__filter', elForm);
const elBtn = getElem('#btn', elForm);
const elTemplate = getElem('#template').content;
const header = getElem('.header');
const elModal = getElem('.modal')
const elModalList = getElem('.modal__list')
const elModalBtn = getElem('#modal__btn')
const elModalimg = getElem('.modal__img')
const elModaltext = getElem('.modal__text')


function renderFilms(FilmsArray, element){
    element.innerHTML = null
    
    FilmsArray.forEach(film => {
        const cloneTemplate = elTemplate.cloneNode(true);
        
        getElem('.film__pic', cloneTemplate).src = film.Poster
        getElem('.film__card--title', cloneTemplate).textContent = film.Title
        getElem('.film__realise--date', cloneTemplate).textContent = normalizeDate(film.Year)
        getElem('.film__realise--date', cloneTemplate).datetime = normalizeDate(film.Year)
        let CardBtn = getElem('.film__card--btn', cloneTemplate)
        CardBtn.dataset.film_id = film.id
        
        let newGanres = getElem('.modal__ganres')
        CardBtn.addEventListener('click', (item) =>{
            // item.preventDefault()
            // elModal.classList.add('modal__active')
            elModal.style.opacity = "1"
            elModal.style.visibility = "visible"
            elModalList.style.transform = "scale(1)"
            let findFilm = films.find(film => film.id === CardBtn.dataset.film_id) 
            let ModalImg = getElem('.modal__img').src = findFilm.Poster
            let ModalContent = getElem('.modal__text').textContent = findFilm.overview
            let FilmLink = getElem('.modal__link')
            FilmLink.href = findFilm.link
            
            function findfunction(arr, element){
                element.innerHTML = null
                arr.genres.forEach(ganre =>{
                    let newLi = creatElem('li')
                    newLi.setAttribute('class', 'modal__ganre')
                    newLi.textContent = ganre
                    
                    element.appendChild(newLi)
                })
            }
            findfunction(findFilm, newGanres)
        })
        
        elModalBtn.addEventListener('click', (item)=>{
            //  elModal.classList.remove('modal__active')
            elModalList.style.transform = "scale(0)"
            setTimeout(() => {
                elModal.style.opacity = "0"
                elModal.style.visibility = "hidden"                
            }, 600);
        })
        
        element.appendChild(cloneTemplate);
    });
}

renderFilms(films, elMenu)

function renderGenres(FilmsArray, element){
    let result = []
    
    FilmsArray.forEach((film) =>{
        film.genres.forEach(genre =>{
            if(!result.includes(genre)){
                result.push(genre)
            }
        })
    })
    
    result.forEach(genre =>{
        let newoption = creatElem('option');
        newoption.textContent = genre;
        newoption.value = genre;
        
        element.appendChild(newoption)
    })
}

renderGenres(films, elSelect)



// key
let KEY = '58ed228a'

let newMovies = []

elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    async function fetchMovies(){
        newMovies = []
        let findMovie = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${inputvalue}&page=1`) 
        let data = await findMovie.json()
        let movies = await data.Search
        movies.forEach(movie =>{
            if(!newMovies.includes(movie)){
                newMovies.push(movie)
            }
        })
        console.log(newMovies)
        
        renderFilms(newMovies, elMenu)
    }
    const inputvalue = elSearch.value.trim();
    const selectvalue = elSelect.value.trim();
    const filtervalue = elFilter.value.trim();
    
    const regex = new RegExp(inputvalue, 'gi');
    
    const FilteredFilms = newMovies.filter((film) => film.Title.match(regex));
    
    let Overresult = [];
    
    if(elSelect.value == 'All'){
        Overresult = FilteredFilms
    }else{
        Overresult = FilteredFilms.filter(film => film.genres.includes(selectvalue))
    }
    
    
    if(filtervalue === 'a_z'){
        Overresult.sort((a, b) =>{
            if(a.Title > b.Title){
                return 1
            }else if(a.Title < b.Title){
                return -1
            }else{
                return 0
            }
        })
    }else if(filtervalue === 'z-a'){
        Overresult.sort((b, a) =>{
            if(a.Title > b.Title){
                return 1
            }else if(a.Title < b.Title){
                return -1
            }else{
                return 0
            }
        })
    }else if(filtervalue === 'new_old'){
        Overresult.sort((a, b) =>{
            if(a.Year > b.Year){
                return 1
            }else if(a.Year < b.Year){
                return -1
            }else{
                return 0
            }
        })
    }else if(filtervalue === 'old_new'){
        Overresult.sort((b, a) =>{
            if(a.Year > b.Year){
                return 1
            }else if(a.Year < b.Year){
                return -1
            }else{
                return 0
            }
        })
    }
    
    elSearch.value = ''
    
    
    fetchMovies()
    renderFilms(Overresult, elMenu)
})










































































// function renderGenres(filmArr, element){
//     let result = [];

//     filmArr.forEach((film) => {
//         film.genres.forEach((genre) =>{
//             if(!result.includes(genre)){
//                 result.push(genre)
//             }
//         })
//     })

//     result.forEach((genre) => {
//         let newOption = creatElem('option');
//         newOption.textContent = genre;
//         newOption.value = genre;
//         element.appendChild(newOption);
//     })
// }
// renderGenres(films, elSelect)

// function renderFilms(filmArr, element){
//     element.innerHTML = null
//     filmArr.forEach((film) => {

//         let newLi = creatElem('li');
//         let newTitle = creatElem('h2');
//         let newImg = creatElem('img');
//         let GenreList = creatElem('ul');
//         let elTime = creatElem('time');

//         film.genres.forEach((genre) => {
//             let newGenreli = creatElem('li')

//             newGenreli.setAttribute('class', 'film__genre')

//             newGenreli.textContent = genre

//             GenreList.appendChild(newGenreli)
//         })

//         let date = new Date(film.Year)
//         let data = `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`

//         newLi.setAttribute('class', 'film__item')
//         newImg.setAttribute('src', film.poster)
//         newImg.setAttribute('class', 'film__img')
//         newTitle.textContent = film.title
//         newTitle.setAttribute('class', 'film__subtitle')
//         GenreList.setAttribute('class', 'film__genre--list')
//         elTime.setAttribute('datetime', data)
//         elTime.setAttribute('class', 'film__time')
//         elTime.textContent = data

//         newLi.appendChild(newImg)
//         newLi.appendChild(newTitle)
//         newLi.appendChild(GenreList)
//         newLi.appendChild(elTime)


//         elMenu.appendChild(newLi)
//     })
// }

// renderFilms(films, elMenu);

// elForm.addEventListener('click', (e)=>{
//     e.preventDefault()

//     let searchValue = elSearch.value.trim();
//     let selectValue = elSelect.value.trim();

//     const regex = new RegExp(searchValue, 'gi')
//     const regex2 = new RegExp(selectValue, 'gi')

//     let filterArray = films.filter(film => film.title.match(regex))

//     let GenereArray = filterArray.filter(film => {
//         let result = null;
//         for(let i = 0; i < film.genres.length; i++){
//             result += film.genres[i].match(regex2)
//             console.log(result);
//         }
//         return result
//     } )


//     GenereArray.filter(event => {
//         filterArray.forEach(item => event == item && event)
//     })


//     if(selectValue == 'All'){
//         renderFilms(filterArray, elMenu)
//     }else{
//         renderFilms(GenereArray, elMenu)
//     }
// })
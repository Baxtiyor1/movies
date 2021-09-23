const elMenu = getElem('.film__menu');
const elForm = getElem('#form');
const elSearch = getElem('#search');
const elSelect = getElem('#select', elForm);


function renderGenres(filmArr, element){
    let result = [];
    
    filmArr.forEach((film) => {
        film.genres.forEach((genre) =>{
            if(!result.includes(genre)){
                result.push(genre)
            }
        })
    })
    
    result.forEach((genre) => {
        let newOption = creatElem('option');
        newOption.textContent = genre;
        newOption.value = genre;
        element.appendChild(newOption);
    })
}
renderGenres(films, elSelect)

function renderFilms(filmArr, element){
    element.innerHTML = null
    filmArr.forEach((film) => {
        
        let newLi = creatElem('li');
        let newTitle = creatElem('h2');
        let newImg = creatElem('img');
        let GenreList = creatElem('ul');
        let elTime = creatElem('time');
        
        film.genres.forEach((genre) => {
            let newGenreli = creatElem('li')
            
            newGenreli.setAttribute('class', 'film__genre')
            
            newGenreli.textContent = genre
            
            GenreList.appendChild(newGenreli)
        })
        
        let date = new Date(film.release_date)
        let data = `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`
        
        newLi.setAttribute('class', 'film__item')
        newImg.setAttribute('src', film.poster)
        newImg.setAttribute('class', 'film__img')
        newTitle.textContent = film.title
        newTitle.setAttribute('class', 'film__subtitle')
        GenreList.setAttribute('class', 'film__genre--list')
        elTime.setAttribute('datetime', data)
        elTime.setAttribute('class', 'film__time')
        elTime.textContent = data
        
        newLi.appendChild(newImg)
        newLi.appendChild(newTitle)
        newLi.appendChild(GenreList)
        newLi.appendChild(elTime)
        
        
        elMenu.appendChild(newLi)
    })
}

renderFilms(films, elMenu);

elForm.addEventListener('click', (e)=>{
    e.preventDefault()
    
    let searchValue = elSearch.value.trim();
    let selectValue = elSelect.value.trim();
    
    const regex = new RegExp(searchValue, 'gi')
    const regex2 = new RegExp(selectValue, 'gi')
    
    let filterArray = films.filter(film => film.title.match(regex))
    
    let GenereArray = filterArray.filter(film => {
        let result = null;
        for(let i = 0; i < film.genres.length; i++){
            result += film.genres[i].match(regex2)
            console.log(result);
        }
        return result
    } )
    
    
    GenereArray.filter(event => {
        filterArray.forEach(item => event == item && event)
    })
    
    
    if(selectValue == 'All'){
        renderFilms(filterArray, elMenu)
    }else{
        renderFilms(GenereArray, elMenu)
    }
})
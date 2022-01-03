const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

function toggle(id){
    const GetVideo=`https://api.themoviedb.org/3/movie/${id}/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
    getMovieVideo(GetVideo,id)
    var popvid=document.querySelector('.popup')
    var overlay=document.querySelector('.overlay')
    overlay.classList.toggle('active')
    popvid.classList.toggle('active')
    document.querySelector('body').classList.add('hideOver')
}
function closeVideo(){
    var popvid=document.querySelector('.popup')
    var overlay=document.querySelector('.overlay')
    overlay.classList.toggle('active')
    popvid.classList.toggle('active')
    document.getElementById('myFrame').src='';
    document.querySelector('body').classList.remove('hideOver')
}

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

async function getMovieVideo(url,id) {
    const res = await fetch(url)
    const data = await res.json()
    addlink(data.results,id)
}

addlink=(Videos,id)=>{
    // const innerLink=document.getElementById(`${id}`)
    const srcLink=document.getElementById("myFrame")
    Videos.forEach((video) =>{
    if(video.type =='Trailer' ){
    
     console.log( video.key)
     srcLink.src=`https://www.youtube.com/embed/${video.key}`
    //  innerLink.innerHTML='Trailer'
    //  innerLink.setAttribute('href',`https://www.youtube.com/embed/${video.key}`)
    //  innerLink.classList.add('play-btn')
    }
    })
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { id,title, poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            
          <h3>Overview</h3>
          ${overview}
        
          <div class="btn-list">
          <a id='${id}' onclick="toggle(this.id)" class='play-btn'>Trailer</a>
          </div>
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
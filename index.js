//Example for API request
//http://api.themoviedb.org/3/search/movie?&api_key=<YOUR_API>&query=


//MovieDB API
const SEARCHAPI= "https://api.themoviedb.org/3/search/movie?&api_key=" + YOUR_API + "&query="

//MovieDB API image link
const IMGPATH= "https://image.tmdb.org/t/p/w500"

const searchPage = document.getElementById('search-page');
const searchResult = document.getElementById('search-result');
const btn = document.getElementById('btn');
const form = document.getElementById('form');
const search = document.getElementById('search');
const results = document.getElementById('results');
const offlinePage = document.getElementById('offline-page');
const searchTitle = document.getElementById('search-title');
const message = document.getElementById('message');
const deatailsPage = document.getElementById('details-page');
const cardName = document.getElementById('card-name');
const title = document.getElementById('title');
const language = document.getElementById('language');
const rating = document.getElementById('rating');
const date = document.getElementById('date');
const img = document.getElementById('card-img');
const description = document.getElementById('description');
const body = document.getElementById('body');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    handleEvents();
})

function handleEvents(){
    if(window.navigator.onLine){
        searchResult.style.display= "block";
        searchPage.style.display= "none";
        const title= search.value;
        if(title){
            searchTitle.innerText= title;
            showMovies(SEARCHAPI+title);
            search.value= ""
        }
        else{
            searchTitle.innerText= "No Title";
            searchPage.style.display= "none";
            offlinePage.style.display= "flex";
            message.innerHTML= "Type something to search"
        }
    }
    else{
        searchPage.style.display = "none";
        offlinePage.style.display= "flex"
    }
}

function showMovies(url){
    fetch(url).then(res=>res.json())
    .then(function(data){
        if(data.results.length){
            data.results.forEach(element=>{
                if(element.poster_path){
                    const el = document.createElement('div');
                    const image = document.createElement('img');
                    const text = document.createElement('p');

                    text.innerHTML = `${element.title}`;
                    image.src = IMGPATH + element.poster_path;
                    el.appendChild(image);
                    el.appendChild(text);
                    el.onclick= ()=>showDetails(element);
                    results.appendChild(el)
                }
            });
        }
        else{
            searchTitle.innerText="No Results Found";
            searchPage.style.display="none";
            offlinePage.style.display="flex";
            message.innerHTML= "Sorry, no results found";
        }
    })
}

function showDetails(element){
    body.style.overflow="hidden"
    deatailsPage.style.display="flex";
    img.src= IMGPATH + element.poster_path;
    title.innerHTML = `${element.title}`;
    cardName.innerHTML= `${element.title}`;
    date.innerHTML= `${element.release_date}`;
    rating.innerHTML= `${element.vote_average}`;
    description.innerHTML= `${element.overview}`;
    language.innerHTML= `${element.original_language}`
}

function handleBack(){
    location.reload();
}

function handleClose(){
    deatailsPage.style.display= "none";
    body.style.overflow= "auto"
}
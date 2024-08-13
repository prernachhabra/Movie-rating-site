const searchForm=document.querySelector('form');
const movieContainer= document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputBox');


const getMovieInfo=async (movie)=>{
    const myAPIKey="235a950";
    const url= `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

    const response= await  fetch(url);
    const data= await response.json();
    console.log(data);
    showMovieData(data);
}

const showMovieData= (data)=>{
    //use destructuring assignment to extract propertied from data object
    movieContainer.innerHTML="";
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster}= data;
    
    const movieElement= document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML= `<h2>${Title}</h2>
                             <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
    
    const movieGenreElement= document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element=>{
        const p=document.createElement('p');
        p.innerHTML=element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML+= `<p><strong>Released Date:</strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`;
   //creating a div for movie poster
   const moviePosterElement=document.createElement('div');
   moviePosterElement.classList.add('movie-poster');
   moviePosterElement.innerHTML= `<img src="${Poster}"/>`;

   movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);


}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
console.log(inputBox.value);
const movieName= inputBox.value.trim();
if(movieName !==''){
    getMovieInfo(movieName);
}
else{
    movieContainer.innerHTML=`<h2>Enter movie name to get movie information</h2>`
}
});
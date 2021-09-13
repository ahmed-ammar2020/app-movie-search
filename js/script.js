"use strict";
let form = document.querySelector("form");
let input = document.querySelector("input");
let myHttp = new XMLHttpRequest();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let inputValue = input.value;
  myHttp.open(
    "GET",
    `https://api.themoviedb.org/3/search/movie?api_key=71b630ea20278d618d9dc9341b999b55&language=en-US&page=1&include_adult=false&query=${inputValue}`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (this.status === 200 && this.readyState === 4) {
      let movies = JSON.parse(this.response).results;
      displayMovies(movies);
    }
  });
});

function displayMovies(movies) {
  let container = "";
  for (let movie of movies) {
    container += `
    <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card mb-5" >
            <img src=${
              movie.poster_path
                ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                : "https://picsum.photos/200/300?random"
            } class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">
                ${
                  movie.overview
                    ? movie.overview.split(" ").slice(0, 10).join(" ")
                    : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,"
                }
              </p>
            </div>
          </div>
        </div>
    `;
  }

  document.querySelector(".row").innerHTML = container;
}

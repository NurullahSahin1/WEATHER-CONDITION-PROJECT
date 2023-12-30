const API_Key = 

const Url = 

const searchBox = document.querySelector(".search input");

const searchBtn = document.querySelector(".search-button");

const weatherIcon = document.querySelector(".weather-icon");
const loaderContainer = document.getElementById("loader-container");

const renderLoader = () => {
    loaderContainer.innerHTML = `<div id="loader-wrapper"> <div class ="loader"> <span></span></div> </div>`;
    document.querySelector(".weather-content").style.display = "none";
}
const hideLoader = () => {
    loaderContainer.innerHTML = "";
    document.querySelector(".weather").style.display = "block";
}
async function checkWeather(city) {
    renderLoader();
    setTimeout(async () => {
        const response = await fetch(Url + city + `&appid=${API_Key}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            var data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            if (data.weather[0].main.toLowerCase() === "clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main.toLowerCase() === "rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main.toLowerCase() === "drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main.toLowerCase() === "mist") {
                weatherIcon.src = "images/mist.png";
            }

            document.querySelector(".weather-content").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
        hideLoader();
    }, 2000);
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
});
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

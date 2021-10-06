const api = 'bfb25d87d60a5595c92e5f07211562b3';
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
    let long;
    let lat;
    // access to user location
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            // storing long and lat in variable
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            console.log(base);
            // using fetch to get data
            fetch(base).then((response) => {
                return response.json();
            })
            .then((data) => {
                const { temp } = data.main;
                const place = data.name;
                const {description, icon} = data.weather[0];
                const {sunrise, sunset} = data.sys

                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                const fahrenheit = (temp * 9) / 5 + 32; 

                // converting Epoch time
                const sunriseGMT = new Date(sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);

                Math.round(tempC);


                // interacting with DOM to show data
                iconImg.src = iconUrl;
                loc.textContent = `${place}`;
                desc.textContent = `${description}`;
                tempC.textContent = `${temp.toFixed(2)} °C`
                tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;

            })
        });
    }
});





// const api = {
//     key: 'bfb25d87d60a5595c92e5f07211562b3',
//     // base: 'https://openweathermap.org/5/'
// };

// const searchbox = document.querySelector('.search-box');
// searchbox.addEventListener('keypress', setQuery);

// function setQuery(evt){
//     //13 is equivalent of ENTER key
//     if(evt.keyCode == 13){
//         getResults(searchbox.value); 
//         console.log(searchbox.value);
//         //once this has ran we run fetch request
//     }
// }

//FETCH REQUEST
// function getResults(query){
//     fetch(`${api.base}weather?q=${query}&units=standard&APPID=${api.key}`)
//     .then(weather => { // returns weatherf5
//         return weather.json();  
//     }) .then(displayResults); //passes through to displayresults function
// }

// function displayResults(weather){
//     console.log(weather); 
//     let city = document.querySelector('.location .city');
//     city.innerText = `${weather.name}, ${weather.sys.country}`;

//     let now = new Date();
//     let date = document.querySelector('.location .date');
//     date.innerText = dateBuilder(now);
// }

// function dateBuilder(d){
//     let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
//     'August', 'September', 'October', 'November', 'December'];

//     let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth];
//     let year = d.getFullYear();

//     return `${day} ${date} ${month} ${year}`;
// }
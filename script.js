//  Weather Api Key
const key = '87d543ac7f3e440985753419231609';

// Sample Call
// https://api.weatherapi.com/v1/current.json?key=11111111111111111&q=london

const inputDiv = document.querySelector('#inputDiv');
const display = document.querySelector('#display');

const searchLabel = document.createElement('searchLabel');
searchLabel.for = 'searchInput';
searchLabel.textContent = 'Search location:';

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.id = 'searchInput';
searchInput.placeholder = 'ex: San Francisco';

const searchBtn = document.createElement('img');
searchBtn.src = './images/search.png';
searchBtn.style.height = '35px';

const searchDiv = document.createElement('div');
searchDiv.id = 'searchDiv';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchBtn);

inputDiv.appendChild(searchLabel);
inputDiv.appendChild(searchDiv);

searchBtn.onclick = function() 
{
    if(searchInput.value)
    {
        const place = searchInput.value;
        getWeather(place);
    }
}

searchInput.addEventListener('keypress', (e) =>
{
  if(e.key === 'Enter')
  {
      e.preventDefault();
      if(searchInput.value)
      {
        const place = searchInput.value;
        getWeather(place);
      }
  }
});

getWeather('Tokyo');

const loading = document.querySelector('#loading');
loading.style.display = 'none';

let weatherData;

async function getWeather(place)
{
    const fetchURL = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${place}`;
    const response = await fetch(fetchURL, {mode: 'cors'});
    loadingScreen();
    try 
    {
        const data = await response.json();
        console.log(data);
        weatherData = data;
        updateDisplay(weatherData);
        searchInput.placeholder = 'ex: San Francisco';
    } 
    catch
    {
        searchInput.placeholder = 'Invalid Location';
    }
    loading.style.display = 'none';

    searchInput.value = '';
}


const condition = document.querySelector('#condition');
const conditionIcon = document.createElement('img');
condition.appendChild(conditionIcon);
const locationName = document.querySelector('#location');
const temperature = document.querySelector('#temperature');
let metric = true;

temperature.onclick = function()
{
    metric = metric === true ? false : true;
    getTemperature(weatherData);
    
}

function updateDisplay(weatherData)
{
    condition.textContent = weatherData.current.condition.text;
    conditionIcon.src = weatherData.current.condition.icon;

    const name = weatherData.location.name;
    const country = weatherData.location.country;
    locationName.textContent = `${name}, ${country}`;

    getTemperature(weatherData);
    displayImage(name);
}

function getTemperature(weatherData)
{
    const fahrenheit =  Math.round(weatherData.current.temp_f);
    const celsius = Math.round(weatherData.current.temp_c);

    if(metric)
    {
        temperature.textContent = `${fahrenheit} °F`;
    }
    else
    {
        temperature.textContent = `${celsius} °C`;
    }
}

const gifKey = 'IRQQIHyT9JEcOMGxwG679ZPf5fm4W0JT';
const imageDisplay = document.querySelector('#imageDisplay');

async function displayImage(gif)
{
    const img = document.createElement('img');
    img.id = 'image';
    const fetchString = `https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}&s=${gif}`;
    try
    {
        const response = await fetch(fetchString, {mode: 'cors'});
        const imgData = await response.json();
        img.src = imgData.data.images.original.url;
    }
    catch
    {
        console.log('error');
    }
    imageDisplay.appendChild(img);
}

function loadingScreen()
{
    loading.style.display = 'block';
    condition.textContent = '';
    conditionIcon.src = '';
    locationName.textContent = '';
    temperature.textContent = '';
    imageDisplay.innerHTML = '';
}
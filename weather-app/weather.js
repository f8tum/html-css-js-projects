// *Note api only allows US cities

const apiKey = "11912d8bc4184a128815df80d6080b77";

const form = document.querySelector(".search-form");
const cityNameInput = document.getElementById("city-search");
const errorMessage = document.getElementById("display-error");
const weatherCard = document.querySelector(".card");
const submitBtn = document.getElementById("submit-btn");

// we send the api the name of the city
form.addEventListener("submit", (e) => {
  // prevent page reload
  e.preventDefault();

  // validate city name
  const city = cityNameInput.value.trim();

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    return;
  }

  // fetch the weather data and inject html data
  apiCall(city);
}); 



const apiCall = async (city) => {
  // Validate
  try {
    // disable the submit button while the api is running
    submitBtn.disabled = true;
    weatherCard.style.display = "flex";
    weatherCard.innerHTML = "<p>Loading...</p>";

    // await api's fetched response
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    // check is response is ok
    if (!response.ok) {
      throw new Error("City not found");
    }

    // convert json to object
    const data = await response.json();
    console.log(data);

    // extracted values check devtools for response
    const extractedData = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      condition: data.weather[0].main
    };

    // clear error message before injecting html
    errorMessage.textContent = ""; 

    // Render the card
    displayWeather(extractedData);
  } 

  // handle error
  catch (error) {
    console.error("API Error:", error);
    errorMessage.textContent = error.message;
    weatherCard.style.display = "none";
  }

  // enable weather button when api stops
  finally {
    submitBtn.disabled = false;
  }
}

const displayWeather = (extractedData) => {
  console.log(extractedData);

  // Set card details
  const card = `
    <div class="card-text">
      <h1>${extractedData.city}</h1>
      <h2>${extractedData.temperature}°C</h2>
      <p>Humidity: ${extractedData.humidity}%</p>
      <h3>${extractedData.description}</h3>
    </div>
  `;

  // Set display emoji
  let emoji;
  switch (extractedData.condition) {
    case "Clear":
      emoji = "☀️";
      break;

    case "Clouds":
      emoji = "☁️";
      break;

    case "Rain":
      emoji = "🌧️";
      break;
      
    case "Snow":
      emoji = "❄️";
      break;

    case "Thunderstorm":
      emoji = "⛈️";
      break;

    case "Drizzle":
      emoji = "🌦️";
      break;

    case "Mist":
      emoji = "🌫️";
      break;

    case "Fog":
      emoji = "🌫️";
      break;

    default:
      emoji = "🌍";
  }

  const emojiHTML = `
    <div class="emoji-wrapper">
      <p>${emoji}</p>
    </div>
  `;
  // clear input after submit
  cityNameInput.value = "";
  
  // update html DOM
  weatherCard.innerHTML = "";
  weatherCard.innerHTML = card + emojiHTML;
};
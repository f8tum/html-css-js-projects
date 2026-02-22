const apiKey = "11912d8bc4184a128815df80d6080b77";

const form = document.querySelector(".search-form");
const cityNameInput = document.getElementById("city-search");

// we send the api the name of the city
form.addEventListener("submit", async (e) => {
  // prevent page reload
  e.preventDefault();

  // fetch the weather data and inject html data
  const result = await apiCall(cityNameInput);
}); 



const apiCall = async (cityNameInput) => {
  const city = cityNameInput.value;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  console.log(response); // to check if response is received
}
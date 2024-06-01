const input = document.querySelector("#input");
const emojiDisplay = document.querySelector("#Emoji");
const tempDegree = document.querySelector(".degree");
const humidity = document.querySelector("#humidity");
const temprature = document.querySelector("#temp");
const windspeed = document.querySelector("#wind");
const search = document.querySelector(".search");
const desc = document.querySelector(".desc");
const originalContent = desc.innerHTML;
const apikey = "d037713e7251f4e6feb06f4ff8d2da0e";

search.addEventListener("click", async (event) => {
  event.preventDefault();
  const city = input.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayLocation(weatherData);
    } catch (error) {
      console.log(error);
      errorDisplay(error);
    }
  } else {
    errorDisplay("Please Enter A City");
  }
});
const getWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
  );
  if (!response.ok) {
    throw new Error(`could not fetch weahter data`);
  }
  return await response.json();
};

const displayLocation = (data) => {
  const {
    name: city,
    main: { temp, humidity: hun },
    weather: [{ description, id }],
    wind: { speed },
  } = data;

  tempDegree.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidity.textContent = `${hun}%`;
  temprature.textContent = description;
  windspeed.textContent = `${speed}Km'h`;
  emojiDisplay.textContent = "";

  emojiDisplay.appendChild(emojis(id));
};
const emojis = (id) => {
  const img = document.createElement("img");
  img.style.width = "150px";

  // Set alt attribute based on the condition
  switch (true) {
    case id >= 200 && id < 300:
      img.src = "./thunder.png";

      break;
    case id >= 300 && id < 400:
      img.src = "./heavy.jpg";

      break;
    case id >= 500 && id < 600:
      img.src = "./rain.png";

      break;
    case id >= 600 && id < 700:
      img.src = "./snow.jpg";

      break;
    case id >= 700 && id < 800:
      img.src = "./atmosphere.jpg";

      break;
    case id === 800:
      img.src = "./clear.png";

      break;
    case id > 800 && id < 810:
      img.src = "./cloud.png";

      break;
    default:
      img.src = "./clear.png";
  }

  // Set alt attribute

  // Return the created image element
  return img;
};

const errorDisplay = (message) => {
  const displayError = document.createElement("h1");
  displayError.textContent = message;
  displayError.classList.add("error");

  desc.textContent = "";
  desc.style.display = "flex";
  desc.appendChild(displayError);
};

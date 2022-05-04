const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector(
  '[data-js="city-temperature"]'
)
const cityCard = document.querySelector('[data-js="city-card"]')
const timeImg = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

const getTimeImage = time => `./src/${time}.svg`

const insertDayOrNightBackground = IsDayTime => {
  IsDayTime
    ? (timeImg.src = getTimeImage("day"))
    : (timeImg.src = getTimeImage("night"))
}

const insertWeatherIcon = WeatherIcon => {
  const weatherIcon = `<img src="./src/icons/${WeatherIcon}.svg" >`
  timeIconContainer.innerHTML = weatherIcon
}

const showWeatherContainer = () => {
  const cityCardIsHidden = cityCard.classList.contains("d-none")
  if (cityCardIsHidden) {
    cityCard.classList.remove("d-none")
  }
}

const insertCityDataIntoDOM = (LocalizedName, WeatherText, Temperature) => {
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
}

const searchCityWeatherConditions = async event => {
  event.preventDefault()
  const inputValue = event.target.city.value
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ Temperature, WeatherText, IsDayTime, WeatherIcon }] =
    await getCityWeather(Key)
  showWeatherContainer()
  insertCityDataIntoDOM(LocalizedName, WeatherText, Temperature)
  insertDayOrNightBackground(IsDayTime)
  insertWeatherIcon(WeatherIcon)
  event.target.reset()
}

cityForm.addEventListener("submit", searchCityWeatherConditions)

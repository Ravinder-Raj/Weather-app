import React, { useState, useEffect } from "react";
import { fetchCurrentWeather, fetch5DayForecast } from "../utils/api";
import { celsiusToFahrenheit } from "../utils/helpers";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import UnitToggle from "../components/UnitToggle";
import { DEFAULT_CITY, UNIT_CELSIUS, UNIT_FAHRENHEIT } from "../utils/constants";
import loadingIcon from "../assets/loading.gif";
import MoreInfo from "../components/MoreInfo";

const Home = () => {
  // State to store the selected city, current weather data, forecast data, temperature unit, error messages, and loading status
  const [city, setCity] = useState(DEFAULT_CITY);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState(UNIT_CELSIUS);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect hook to fetch weather data when the city changes
  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch current weather data and 5-day forecast data
        const currentData = await fetchCurrentWeather(city);
        const forecastData = await fetch5DayForecast(city);

        // Slice the forecast data to get the first 5 days
        const forecastDays = forecastData.data.slice(0, 5);

        // Set the current weather and forecast data in state
        setCurrentWeather({
          ...currentData.data[0],
          min_temp: forecastDays[0].min_temp,
          max_temp: forecastDays[0].max_temp,
          sunrise: currentData.data[0].sunrise,
          sunset: currentData.data[0].sunset,
          timezone: currentData.data[0].timezone
        });
        setForecast(forecastDays);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Could not fetch weather data. Please try again."); // Handle errors
      } finally {
        setLoading(false); // End loading
      }
    };

    getWeatherData();
  }, [city]); // Dependency array to trigger effect when the city changes

  // Function to handle city search and update the city state
  const handleCitySearch = (searchCity) => {
    setCity(searchCity);
  };

  // Function to toggle between Celsius and Fahrenheit units
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === UNIT_CELSIUS ? UNIT_FAHRENHEIT : UNIT_CELSIUS));
  };

  // Function to convert temperature based on the selected unit
  const convertTemperature = (temp) => {
    return unit === UNIT_CELSIUS ? temp : celsiusToFahrenheit(temp);
  };

  return (
    <div className="mx-auto flex max-md:h-[100rem]">
      {loading ? (
        // Show loading indicator while fetching data
        <div className="flex justify-center items-center w-full max-md:content-center">
          <img src={loadingIcon} alt="Loading..." className="h-56 w-56" />
        </div>
      ) : error ? (
        // Show error message if data fetching fails
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex flex-col h-screen max-md:w-full max-md:justify-center max-md:items-center max-md:h-[100rem] ">
            <div className="flex justify-between px-3 pt-10 w-full">
              {/* Search bar and unit toggle */}
              <SearchBar onSearch={handleCitySearch} />
              <UnitToggle unit={unit} toggleUnit={toggleUnit} />
            </div>
            {/* Current weather information */}
            {currentWeather && (
              <WeatherCard
                city={currentWeather.city_name}
                temperature={convertTemperature(currentWeather.temp)}
                windDirection={currentWeather.wind_dir}
                description={currentWeather.weather.description}
                icon={currentWeather.weather.icon}
                sunrise={currentWeather.sunrise}
                sunset={currentWeather.sunset}
                timezone={currentWeather.timezone}
              />
            )}
            {/* For small screens */}
            <div className="hidden absolute max-md:flex mt-[0rem]">
              <div className="bg-[#e4f1ff] w-full flex flex-col space-y-8 pl-5 -ml-12 border rounded-3xl z-10 max-md:ml-0 max-md:pl-0 justify-center mx-auto max-md:bg-transparent max-md:backdrop-brightness-50 max-md:h-[30rem] max-mad:mt-[30rem] max-md:space-y-[70rem]">
                {/* Additional weather information */}
                {currentWeather && currentWeather.min_temp !== undefined && (
                  <div className="bg-[#e4f1ff] max-md:bg-transparent">
                    <MoreInfo
                      minTemp={convertTemperature(currentWeather.min_temp)}
                      maxTemp={convertTemperature(currentWeather.max_temp)}
                      humidity={currentWeather.rh}
                      windSpeed={currentWeather.wind_spd}
                      feelsLike={convertTemperature(currentWeather.app_temp)}
                      clouds={currentWeather.clouds}
                    />
                  </div>
                )}
                {/* Forecast for the next five days */}
                <div className="forecast-container grid grid-cols-1 gap-2 px-16 w-[85%] h-48 rounded-lg content-center mx-auto max-lg:w-full max-xl:px-0 max-md:flex max-md:absolute max-md:w-full max-md:px-0 max-md:flex-col max-md:h-full max-md:mt-[-20rem] max-md:bg-transparent max-md:backdrop-brightness-50">
                  {forecast.map((day, index) => (
                    <ForecastCard
                      key={index}
                      date={day.datetime}
                      temperature={convertTemperature(day.temp)}
                      description={day.weather.description}
                      icon={day.weather.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* For larger screens */}
          <div className="bg-[#e4f1ff] w-full flex flex-col space-y-8 pl-5 -ml-12 border rounded-3xl max-md:hidden">
            <h1 className="text-2xl mt-5">Welcome, Check out today's weather</h1>
            <h1 className="text-xl">More Info</h1>
            {/* Additional weather information */}
            {currentWeather && currentWeather.min_temp !== undefined && (
              <div className="bg-[#e4f1ff]">
                <MoreInfo
                  minTemp={convertTemperature(currentWeather.min_temp)}
                  maxTemp={convertTemperature(currentWeather.max_temp)}
                  humidity={currentWeather.rh}
                  windSpeed={currentWeather.wind_spd}
                  feelsLike={convertTemperature(currentWeather.app_temp)}
                  clouds={currentWeather.clouds}
                />
              </div>
            )}
            <h1 className="text-2xl">Next five days forecast</h1>
            {/* Forecast for the next five days */}
            <div className="forecast-container grid grid-cols-1 md:grid-cols-5 gap-2 bg-white px-16 border border-white w-[85%] h-48 rounded-lg content-center mx-auto max-lg:w-full max-xl:px-0">
              {forecast.map((day, index) => (
                <ForecastCard
                  key={index}
                  date={day.datetime}
                  temperature={convertTemperature(day.temp)}
                  description={day.weather.description}
                  icon={day.weather.icon}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

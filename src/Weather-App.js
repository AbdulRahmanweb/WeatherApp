import React, {useState, useEffect} from 'react';

function WeatherApp() {

	const [weather, setWeather] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [city, setCity] = useState("Delhi");
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=af0d8fbb59ec900ad381f0d83a39a703&units=metric	`;

	function fetchWeather() {
		setLoading(true);
		setError(null);

		fetch(apiUrl).then((response) => response.json()).then((data) => {
			if (data.cod !== 200)
				throw new Error(data.message);
			setWeather(data);
			setLoading(false);
		}).catch((error) => {
			setError(error.message);
			setLoading(false);
		});
	}

	useEffect(() => {
		fetchWeather();
	}, []);


	return(<div id='weather-app'>
		<h1>Weather App</h1>
		<input type='text' placeholder='Search City' value={city} onChange={(e) => setCity(e.target.value)} />
		<button onClick={fetchWeather}>Search</button>
		{loading && <p>Loading...</p>}
		{error && <p>{error}</p>}
		<br></br>
		{weather && 
		(<div id='name'>
			<h1>Weather In: {weather.name}</h1>
			<div id='weather'>
			<h1>{weather.main.temp.toPrecision(2)}°</h1>
			<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
			</div>
			<p>Conditio: {weather.weather[0].description}</p>
			<p>Wind Speed: {weather.wind.speed} m/s</p>
			<p>Humidity: {weather.main.humidity} %</p>
			</div>)}
	</div>);
}

export default WeatherApp;
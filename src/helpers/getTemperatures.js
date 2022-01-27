const getFaren = (consolidated_weather = [], setCity, city) => {
	const newWeatherFormat = consolidated_weather.map((weather) => {
		const { min_temp, max_temp, the_temp } = weather;
		const minTempF = (min_temp * 9) / 5 + 32;
		const maxTempF = (max_temp * 9) / 5 + 32;
		const theTempF = (the_temp * 9) / 5 + 32;

		weather = {
			...weather,
			the_temp: theTempF,
			max_temp: maxTempF,
			min_temp: minTempF,
		};

		return weather;
	});

	setCity({
		...city,
		consolidated_weather: newWeatherFormat,
		type: "F",
	});
};

const getC = (consolidated_weather = [], setCity, city) => {
	const newWeatherFormat = consolidated_weather.map((weather) => {
		const { min_temp, max_temp, the_temp } = weather;
		const minTempC = (min_temp - 32) * (5 / 9);
		const maxTempC = (max_temp - 32) * (5 / 9);
		const theTempC = (the_temp - 32) * (5 / 9);

		weather = {
			...weather,
			the_temp: theTempC,
			max_temp: maxTempC,
			min_temp: minTempC,
		};

		return weather;
	});

	setCity({
		...city,
		consolidated_weather: newWeatherFormat,
		type: "C",
	});
};
export { getFaren, getC };

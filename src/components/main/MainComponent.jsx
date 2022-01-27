import React, {
	useCallback,
	useEffect,
	useState,
	useContext,
	useRef,
} from "react";

import { ContextServer } from "../../context/ContextServer";
import { getC, getFaren } from "../../helpers/getTemperatures";
import ComponentSearch from "../search/ComponentSearch";
import WeatherInfoComponent from "../weatherinfo/WeatherInfoComponent";

const MainComponent = () => {
	const {
		selectImgFn,
		getDateFormatedFn,
		getWeatherLattLonFn,
		getWeatherByIdFn,
	} = useContext(ContextServer);

	const [, setCrds] = useState({
		latt: "36.96",
		lon: "-122.02",
	});

	const [city, setCity] = useState({
		consolidated_weather: [
			{
				weather_state_abbr: "",
				weather_state_name: "",
				the_temp: 0,
				max_temp: 0,
				min_temp: 0,
				created: new Date(),
			},
		],
		title: "",
		type: "C",
	});

	const [actualDay] = city.consolidated_weather;

	const weatherImg = useRef(null);

	const [isHidden, setIsHidden] = useState(true);

	const getLocation = () => {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};
		navigator.geolocation.getCurrentPosition(
			onSuccess,
			(err) => {
				console.warn(err);
			},
			options
		);
	};

	const onSuccess = async (pos) => {
		const crd = pos.coords;


		setCrds({
			latt: crd.latitude,
			lon: crd.longitude,
		});


		const data = await getWeatherLattLonFn(crd.latitude, crd.longitude);
		const { woeid: cityId } = data[0];
		const cityWeatherData = await getWeatherByIdFn(cityId);
		const woeid = cityId;

		setCity((c) => {
			return {
				...c,
				...cityWeatherData,
			};
		});

		localStorage.setItem("woeid", woeid);
	};

	const getData = useCallback(async () => {
		try {
			console.log('....')
			let cityWeatherData = null;
			const defaultUserWoeid = localStorage.getItem("woeid");
			if (defaultUserWoeid !== "0" && defaultUserWoeid !== null) {
				cityWeatherData = await getWeatherByIdFn(defaultUserWoeid);
				// console.log(cityWeatherData);
				localStorage.setItem("woeid", cityWeatherData.woeid);
			} else {
				cityWeatherData = await getWeatherByIdFn(753692);
				localStorage.setItem("woeid", cityWeatherData.woeid);
			} 

			setCity((c) => {
				return {
					...c,
					...cityWeatherData,
				};
			});

		} catch (err) {
			console.warn(err);
		}
	}, [getWeatherByIdFn]);

	const setTemperature = (type) => {
		if (type === city.type) return;

		const { consolidated_weather } = city;
		switch (type) {
			case "F":
				getFaren(consolidated_weather, setCity, city);
				break;
			case "C":
				getC(consolidated_weather, setCity, city);
				break;
			default:
				return console.warn("The temp format is not valid");
		}
	};

	useEffect(() => {
		getData();
	}, [getData]);

	useEffect(() => {
		const abbr = city.consolidated_weather[0].weather_state_abbr || "c";
		const img = selectImgFn(abbr);
		weatherImg.current.src = img;
	}, [city, selectImgFn]);

	return (
		<div className="flex">
			<aside className="aside">
				<div className="container">
					<header className="aside__header">
						<button
							className="button button-gray"
							onClick={() => setIsHidden(false)}
						>
							Search for places
						</button>
						<button
							className="circle-button button-gray aside__btn-location"
							onClick={getLocation}
						></button>
					</header>
					<div className="weather-info">
						<div className="weather-info__img">
							<img ref={weatherImg} alt="img" />
						</div>
						<div className="weather-info__temp fs-big">
							{Math.round(actualDay.the_temp)}
							<span className="small-span">°{city.type}</span>
						</div>
						<div className="weather-info__state fs-normal fw-600">
							{actualDay.weather_state_name}
						</div>
						<div className="weather-info__footer fw-500 fs-small">
							<div className="weather-info__date">
								<span>Today </span>
								<span> &#183; </span>
								<span>
									{getDateFormatedFn(actualDay.created)}
								</span>
							</div>
							<div className="weather-info__location">
								{city.title}
							</div>
						</div>
					</div>
				</div>
				<ComponentSearch
					isHidden={isHidden}
					setIsHidden={setIsHidden}
					setCity={setCity}
					city={city}
				/>
			</aside>
			<WeatherInfoComponent
				setTemperature={setTemperature}
				type={city.type}
				nextDays={city.consolidated_weather}
			/>
		</div>
	);
};

export default MainComponent;

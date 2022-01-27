import React from "react";
import Card from "./Card";
import DetailedCard from "./DetailedCard";
const WeatherInfoComponent = ({ nextDays, type = "c", setTemperature }) => {

	const [detailedDay] = nextDays;

	const { wind_speed, humidity, visibility, air_pressure } = detailedDay;


	return (
		<main className="main">
			<div className="temperature-controls">
				<button
					className={`${
						type === "F" && "button--active"
					} circle-button`}
					onClick={() => setTemperature("F")}
				>
					°F
				</button>
				<button
					className={`${
						type === "C" && "button--active"
					} circle-button`}
					onClick={() => setTemperature("C")}
				>
					°C
				</button>
			</div>
			<div className="container">
				<header className="cards">
					{nextDays.slice(1).map((day, i) => {
						return <Card key={day.id} i={i} day={day} type={type} />;
					})}
				</header>
				<h1 className="title">Today Highlights</h1>
				<section className="detailed-cards">
					<DetailedCard
						title="Wind Status"
						number={wind_speed}
						symbol="mph"
					/>
					<DetailedCard
						title="Humidity"
						number={humidity}
						symbol="%"
					/>
					<DetailedCard
						title="Visibility"
						number={visibility}
						symbol="miles"
					/>
					<DetailedCard
						title="Air Pressure"
						number={air_pressure}
						symbol="mb"
					/>
				</section>
			</div>
		</main>
	);
};

export default WeatherInfoComponent;

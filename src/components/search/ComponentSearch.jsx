import React, { useContext, useState } from "react";
import close from "../../assets/icons/close.svg";
import { ContextServer } from "../../context/ContextServer";
const ComponentSearch = ({ isHidden, setIsHidden, setCity, city }) => {
	const [name, setName] = useState("");
	const [cities, setCities] = useState([]);

	const { getWeatherByNameFn, getWeatherByIdFn } = useContext(ContextServer);

	const handleChange = async ({ target }) => {
		setName(target.value);
		if (name.trim().length >= 2 && name.trim().length <= 10) {
			try {
				const data = await getWeatherByNameFn(name);
				setCities(data.slice(0, 5));
			} catch (err) {
				console.warn(err);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name.trim().length >= 2 && name.trim().length <= 10) {
			try {
				const data = await getWeatherByNameFn(name);
				if( data.length === 0 ) return;
				const { woeid } = data[0];
				const dataCity = await getWeatherByIdFn(woeid);
				localStorage.setItem( 'woeid', woeid )
				setCity( c => {
					return {
						...c, 
						...dataCity,
					}
				} );
				setIsHidden(true);
			} catch (err) {
				console.warn(err);
			}
		}
	};

	const handleChooseCity = async (woeid) => {
		if (woeid === undefined) return;
		try {
			const cityInfo = await getWeatherByIdFn(woeid);
			localStorage.setItem( 'woeid', woeid )
			setCity({
				...city,
				...cityInfo,
			});
			setIsHidden(true);
		} catch (err) {
			console.warn(err);
		}
	};

	return (
		<div className={`search ${isHidden === true && "hidden"}`}>
			<div className="container">
				<form className="search__form" onSubmit={handleSubmit}>
					<input
						type="text"
						className="form-field search__text"
						onChange={handleChange}
						value={name}
					/>
					<button type="submit" className="form-field button">
						Search
					</button>
				</form>
				{cities.length > 0 && (
					<ul className="cities-list">
						{cities?.map((city) => {
							return (
								<li
									key={city.woeid}
									className="cities-list__city"
									onClick={() => handleChooseCity(city.woeid)}
								>
									{city.title}
								</li>
							);
						})}
					</ul>
				)}
			</div>
			<img
				src={close}
				alt="x"
				className="close-button"
				onClick={() => setIsHidden(true)}
			/>
		</div>
	);
};

export default ComponentSearch;

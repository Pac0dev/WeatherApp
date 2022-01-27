import React, { useContext } from 'react'
import {ContextServer} from '../../context/ContextServer';


const Card = ({day, i, type}) => {
	
	const {applicable_date, min_temp, max_temp, weather_state_abbr} = day;
	const { getDateFormatedFn, selectImgFn} = useContext(ContextServer);
	
	return ( 
		<div className="card fs-smallest">
			<span className="card__date">{i === 0 ? 'Tomorrow' : getDateFormatedFn(applicable_date)}</span>
			<img src={selectImgFn(weather_state_abbr)} alt="img climate"/>
			<div className="card__temperatures">
				<span className="card__min-temp">{Math.round(min_temp)}°{type}</span>
				<span className="card__max-temp">{Math.round(max_temp)}°{type}</span>
			</div>
		</div>
	)
}

export default Card;

import React, { createContext } from 'react'
import moment from 'moment';

import {fetchUtility} from './fetchUtility';

import Snow from '../assets/Snow.png';
import Shower from '../assets/Shower.png';
import Sleet from '../assets/Sleet.png';
import Clear from '../assets/Clear.png';
import LightRain from '../assets/LightRain.png';
import LightCloud from '../assets/LightCloud.png';
import Hail from '../assets/Hail.png';
import HeavyRain from '../assets/HeavyRain.png';
import HeavyCloud from '../assets/HeavyCloud.png';
import Thunderstorm from '../assets/Thunderstorm.png';

export const ContextServer = createContext('server-context');


const ContextServerProvider = ({children}) => {

	const selectImgFn = ( abbr ) => {
		switch( abbr ) {
			case 'sn': 
				return Snow;
			case 'sl': 
				return Sleet;
			case 'h': 
				return Hail;
			case 't': 
				return Thunderstorm;
			case 'hr': 
				return HeavyRain;
			case 'lr': 
				return LightRain;
			case 's': 
				return Shower;
			case 'hc': 
				return HeavyCloud;
			case 'lc': 
				return LightCloud;
			case 'c': 
				return Clear;
			default: return null;
		};
	};

	const getWeatherLattLonFn = ( lat, long ) => {
		return new Promise((resolve, reject) => {
			fetchUtility( `search/?lattlong=${lat},${long}` )
				.then( res => {
					resolve(res);
				} )
				.catch( err => {
					reject(err);
				} );
		});
	};

	const getDateFormatedFn = ( dateToFormat ) => {
		const date = moment(dateToFormat).format( 'ddd. D MMM' );
		return date;
	}

	const getWeatherByNameFn = ( name = 'mexico' ) => {
		return new Promise( (resolve, reject) => {
			fetchUtility( `search/?query=${name}` )
				.then( res => {
					resolve(res);
				} )
				.catch( err => {
					reject(err);
				} );
		} );
	};

	const getWeatherByIdFn = ( woeid ) => {
		return new Promise( (resolve, reject) => {
			fetchUtility( `${woeid}/` )
				.then( res => {
					resolve(res);
				} )
				.catch( err => {
					reject(err);
				} );
		} );
	};



	return (
		<ContextServer.Provider value={{
			selectImgFn,
			getWeatherLattLonFn,
			getWeatherByNameFn,
			getWeatherByIdFn,
			getDateFormatedFn,
		}}>
			{children}
		</ContextServer.Provider>
	)
}

export default ContextServerProvider;

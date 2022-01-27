export const fetchUtility = (url) => {
	return new Promise( (resolve, reject) => {
		fetch( process.env.REACT_APP_URL + url )
			.then( res => res.json() )
			.then( data => {
				resolve(data);
			} )
			.catch( err => {
				console.warn(err);
				reject(err);
			} );
	} );
}

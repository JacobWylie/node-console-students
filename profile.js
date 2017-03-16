// Require https module
const https = require('https');
// Require http for status codes
const http = require('http');

// Print Error Messages
const printError = error => {
	console.error(error.message);
};

// Function to print message to console
const printMessage = (username, badgeCount, points) => {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in javascript`;
	console.log(message);
}


const get = (username) => {
	try {
		//  Connect to the API URL (https://teamtreehouse.com/username.json)
		const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
			if (response.statusCode === 200) {
			let body = "";
			// Read the data
			response.on('data', data => {
				body += data.toString();
			});

			response.on('end', () => {
				try {
					// Parse the data	
					const profile = JSON.parse(body);
					// Print the data		
					printMessage(username, profile.badges.length, profile.points.JavaScript);
				} catch (error) {
						printError(error);
					}
			}); // response.on end
			} else {
				const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
				const statusCodeError = new Error(message);
				printError(statusCodeError);
			};
		}); // https.get
		request.on('error', printError);
	} catch (error) {
		printError(error);
	}
}; // get

module.exports.get = get;



















async function getData(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch("https://cors-anywhere.herokuapp.com/" + url, {
		method: "GET", // *GET, POST, PUT, DELETE, etc.
		headers: {
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest",
		},
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

export default getData;

// Fetch call that gets the data from the parks API we are using. It returns the data in an array of objects.

const getParks = () => {
    return fetch("http://localhost:9099/parks")
    .then(response => response.json())
}


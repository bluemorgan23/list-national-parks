// Fetch call that gets the data from the parks API we are using. It returns the data in an array of objects.
const url = "http://localhost:8088";

const getParks = () => {
    return fetch(`${url}/parks`)
    .then(response => response.json())
}

const getMonuments = () => {
    return fetch(`${url}/monuments`)
    .then(response => response.json())
};

const deleteMonument = (monumentId) => fetch(`${url}/monuments/${monumentId}`, {
    method: "DELETE"
})

const deletePark = (parkId) => fetch(`${url}/parks/${parkId}`, {
    method: "DELETE"
})


//Fetch call that takes two parameters for latitude and longitude. This querys the database for the weather of national parks by coordinates.
const getWeather = (parkLatitude, parkLongitude) => {
    return fetch(`https://api.darksky.net/forecast/32db549ae0b85861e6798d0376d401f5/${parkLatitude},${parkLongitude}`).then(response => response.json());
}


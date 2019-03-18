// Fetch call that gets the data from the parks API we are using. It returns the data in an array of objects.


const getParks = () => {
    return fetch("http://localhost:9099/parks")
    .then(response => response.json())
}

const getWeatherandParks = () => {
    const myParksArray = [];
    getParks().then(parksArray => parksArray.forEach(park => {
        myParksArray.push(getWeather(park))
    }))
    return myParksArray;
}

// const getWeather = () => {
//     getParks().then( => )
// }
const getWeather = (park) => {
    return fetch(`https://api.darksky.net/forecast/32db549ae0b85861e6798d0376d401f5/${park.latitude},${park.longitude}`).then(response => response.json());
}
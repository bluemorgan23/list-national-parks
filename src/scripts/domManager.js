//Created a header for the page

const mainHeaderContainer = document.querySelector("#page-header");
const mainHeaderTitle = document.createElement("h1");
mainHeaderTitle.textContent = "National Parks List";
mainHeaderContainer.appendChild(mainHeaderTitle);
document.querySelector("#display-container").appendChild(mainHeaderContainer);
const checkBoxOneDiv = document.createElement("div");
const checkBoxOneLabel = document.createElement("label");
checkBoxOneLabel.for = "show-visited";
checkBoxOneLabel.textContent = "Show all parks visited";
const checkBoxVisited = document.createElement("input");
checkBoxVisited.type = "checkbox";
checkBoxVisited.name = "show-visited";
checkBoxVisited.id = "shw-visited";
checkBoxOneDiv.appendChild(checkBoxVisited);
checkBoxOneDiv.appendChild(checkBoxOneLabel);
mainHeaderContainer.appendChild(checkBoxOneDiv);



//Create a function that serves the purpose of creating the HTML elements of the web app. For each park object, an article element is created with an <h3> and a <p> element. The text content of the h3 element is set equal to the name value of that park object. The p element is set equal to the state value of the object. If the object in question has a visited value of true, then the article element receives the id of "visited". If the visited value is false, then the article element receives the id of "not-visited". 
//The getWeather fetch call is used to query the weather database with the respective coordinates of each park. Each time this is called, it creates a <ul> with three <li> elements with the values set equal to data pulled back from the fetch call. The resulting ul is appended to the article container below the park name and state. The article container is returned


const buildHTMLforEachPark = (park) => {
    const articleElement = document.createElement("article");
    const nameElement = document.createElement("h3");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Park";
    deleteButton.addEventListener("click", handleDelete);
    nameElement.textContent = park.name;
    const stateElement = document.createElement("p");
    stateElement.textContent = park.state;
    articleElement.appendChild(nameElement);
    articleElement.appendChild(stateElement);
    articleElement.appendChild(deleteButton);
    switch (true) {
        case (park.visited):
            articleElement.id = "visited";
            break;
        case (park.visited === false):
            articleElement.id = "not-visited";
            break;
    }
    getWeather(park.latitude, park.longitude).then(response => {
        const fragment = document.createDocumentFragment();
        const pHead = document.createElement("p");
        pHead.id = "weather-header";
        const parkList = document.createElement("ul");
        const currentLi = document.createElement("li");
        const hourlyLi = document.createElement("li");
        const weeklyLi = document.createElement("li");
        pHead.textContent = "Weather: ";
        currentLi.textContent = "Currently: " + response.currently.summary;
        hourlyLi.textContent = "Hourly: " + response.hourly.summary;
        weeklyLi.textContent = "Weekly: " + response.daily.summary;
        parkList.appendChild(currentLi);
        parkList.appendChild(hourlyLi);
        parkList.appendChild(weeklyLi);
        fragment.appendChild(pHead);
        fragment.appendChild(parkList);
        articleElement.appendChild(fragment);
    })

    return articleElement;
}


//The appendParksToDom function is meant to append the built up HTML for the park objects to the dom. It will call the buildHTMLforEachPark function for each object in the array passed into it, and append the HTML for each to a document fragment. After all the objects have their HTML built, they are appended to the dom.

const appendParksToDom = (parksArray) => {
    const parksFragment = document.createDocumentFragment();

    parksArray.forEach(item => {
        parksFragment.appendChild(buildHTMLforEachPark(item));
    })
    document.querySelector("#display-container").appendChild(parksFragment);

}

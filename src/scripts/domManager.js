//Created a header for the page
const displayContainer = document.querySelector("#display-container");
const mainHeaderContainer = document.querySelector(".page-header");
const mainHeaderTitle = document.createElement("h1");
mainHeaderTitle.textContent = "National Parks List";
mainHeaderTitle.id = "parks-title"
mainHeaderContainer.appendChild(mainHeaderTitle);
const checkBoxOneDiv = document.createElement("div");
checkBoxOneDiv.id = "checkbox";
const checkBoxOneLabel = document.createElement("label");
checkBoxOneLabel.for = "show-visited";
checkBoxOneLabel.textContent = "Only Show Visited Areas";
const checkBoxVisited = document.createElement("input");
checkBoxVisited.type = "checkbox";
checkBoxVisited.name = "show-visited";
checkBoxVisited.id = "shw-visited";
checkBoxVisited.addEventListener("click", showVisited);
checkBoxOneDiv.appendChild(checkBoxVisited);
checkBoxOneDiv.appendChild(checkBoxOneLabel);
mainHeaderContainer.appendChild(checkBoxOneDiv);



//Create a function that serves the purpose of creating the HTML elements of the web app. For each park object, an article element is created with an <h3> and a <p> element. The text content of the h3 element is set equal to the name value of that park object. The p element is set equal to the state value of the object. If the object in question has a visited value of true, then the article element receives the id of "visited". If the visited value is false, then the article element receives the id of "not-visited".
//The getWeather fetch call is used to query the weather database with the respective coordinates of each park. Each time this is called, it creates a <ul> with three <li> elements with the values set equal to data pulled back from the fetch call. The resulting ul is appended to the article container below the park name and state. The article container is returned

const buildElementWithText = (el, text) => {
    let newEl = document.createElement(el);
    newEl.textContent = text;
    return newEl;
}

const buildHTMLforEachPark = (park) => {
    const articleElement = document.createElement("article");
    const nameElement = document.createElement("h3");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Park";
    deleteButton.id = `delete-park--${park.id}`;
    deleteButton.addEventListener("click", handleParkDelete);
    nameElement.textContent = park.name;
    const stateElement = document.createElement("p");
    stateElement.textContent = park.state;
    articleElement.appendChild(nameElement);
    articleElement.appendChild(stateElement);

    articleElement.setAttribute("style", "display: flex")
    switch (true) {
        case (park.visited):
            articleElement.classList.add("visited");
            break;
        case (park.visited === false):
            articleElement.classList.add("not-visited");
            break;
    }
    getWeather(park.latitude, park.longitude).then(response => {
        const fragment = document.createDocumentFragment();
        const pHead = document.createElement("h4");
        pHead.id = "weather-header";
        pHead.style.textDecoration = "underline"
        const parkList = document.createElement("ul");
        const currentLi = document.createElement("li");
        const hourlyLi = document.createElement("li");
        const weeklyLi = document.createElement("li");
        pHead.textContent = "Weather";
        currentLi.textContent = "Currently: " + response.currently.summary;
        hourlyLi.textContent = "Hourly: " + response.hourly.summary;
        weeklyLi.textContent = "Weekly: " + response.daily.summary;
        parkList.appendChild(currentLi);
        parkList.appendChild(hourlyLi);
        parkList.appendChild(weeklyLi);
        fragment.appendChild(pHead);
        fragment.appendChild(parkList);
        fragment.appendChild(deleteButton);
        articleElement.appendChild(fragment);
    })

    return articleElement;
}


//The appendParksToDom function is meant to append the built up HTML for the park objects to the dom. It will call the buildHTMLforEachPark function for each object in the array passed into it, and append the HTML for each to a document fragment. After all the objects have their HTML built, they are appended to the dom.

const appendParksToDom = (parksArray) => {
    const parksFragment = document.createDocumentFragment();

    while (displayContainer.firstChild) {
        displayContainer.removeChild(displayContainer.firstChild);
    }

    parksArray.forEach(item => {
        parksFragment.appendChild(buildHTMLforEachPark(item));
    })
    document.querySelector("#display-container").appendChild(parksFragment);

}

const monumentsHeaderEl = buildElementWithText("div", undefined);
monumentsHeaderEl.classList.add("page-header");
const monumentsTitle = buildElementWithText("h1", "Monuments List");
monumentsHeaderEl.appendChild(monumentsTitle);
document.body.appendChild(monumentsHeaderEl);


const monumentsContainer = document.createElement("div");
monumentsContainer.id = "monumentsContainer";
document.body.appendChild(monumentsContainer);

const buildHTMLforEachMonument = (monument) => {
    const articleElement = buildElementWithText("article", undefined);
    const nameElement = buildElementWithText("h3", monument.name)
    const deleteButton = buildElementWithText("button", "Delete Monument");
    deleteButton.id = `delete-monument--${monument.id}`;
    deleteButton.addEventListener("click", handleMonumentDelete);
    const stateElement = buildElementWithText("p", monument.state);
    articleElement.appendChild(nameElement);
    articleElement.appendChild(stateElement);

    const dateEstablished = buildElementWithText("p", `Date Established: ${monument.dateEstablished}`);
    const size = buildElementWithText("p", `Area: ${monument.area}`);
    articleElement.appendChild(dateEstablished);
    articleElement.appendChild(size);
    articleElement.appendChild(deleteButton);
    articleElement.setAttribute("style", "display: flex")
    switch (true) {
        case (monument.visited):
            articleElement.classList.add("visited");
            break;
        case (monument.visited === false):
            articleElement.classList.add("not-visited");
            break;
    }
    return articleElement;
}
const appendMonumentsToDom = (monumentsArray) => {
    const monumentsFragment = document.createDocumentFragment();

    while (monumentsContainer.firstChild) {
        monumentsContainer.removeChild(monumentsContainer.firstChild);
    }

    monumentsArray.forEach(item => {
        monumentsFragment.appendChild(buildHTMLforEachMonument(item));
    })
    monumentsContainer.appendChild(monumentsFragment);

}
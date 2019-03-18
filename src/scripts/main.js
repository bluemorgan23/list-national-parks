

//Create a function that serves the purpose of creating the HTML elements of the web app. For each park object, an article element is created with an <h3> and a <p> element. The text content of the h3 element is set equal to the name value of that park object. The p element is set equal to the state value of the object. If the object in question has a visited value of true, then the article element receives the id of "visited". If the visited value is false, then the article element receives the id of "not-visited". The built up article element is returned 

const buildHTMLforEachPark = (park) => {
    const articleElement = document.createElement("article");
    const nameElement = document.createElement("h3");
    nameElement.textContent = park.name;
    const stateElement = document.createElement("p");
    stateElement.textContent = park.state;
    articleElement.appendChild(nameElement);
    articleElement.appendChild(stateElement);
    switch(true) {
        case (park.visited):
        articleElement.id = "visited";
        break;
        case (park.visited === false):
        articleElement.id ="not-visited";
        break;
    }
    
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

//getParks() returns the array of objects from our parks API. The response is passed into the appendParksToDom function in order to list all the parks onto the DOM with their repsective names, state, and id's for whether or not they have been visited.

getParks().then(response => appendParksToDom(response));


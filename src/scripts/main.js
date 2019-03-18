

//Create a function that serves the purpose of creating the HTML elements of the web app

const buildHTMLforEachPark = (park) => {
    const articleElement = document.createElement("article");
    const nameElement = document.createElement("h3");
    nameElement.textContent = park.name;
    const stateElement = document.createElement("p");
    stateElement.textContent = park.state;
    articleElement.appendChild(nameElement);
    articleElement.appendChild(stateElement);
    
    return articleElement;
} 

const appendParksToDom = (parksArray) => {
    const parksFragment = document.createDocumentFragment();
    parksArray.forEach(item => {
        parksFragment.appendChild(buildHTMLforEachPark(item));
    })
    document.querySelector("#display-container").appendChild(parksFragment);
}

getParks().then(response => appendParksToDom(response));

/* <article>
      <h3>Park Name</h3>
      <p>State the park in located in</p>
    </article> */
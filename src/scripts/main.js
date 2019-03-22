
//getParks() returns the array of objects from our parks API. The response is passed into the appendParksToDom function in order to list all the parks onto the DOM with their repsective names, state, and id's for whether or not they have been visited.


listNationalParks().then(() => listMonuments());

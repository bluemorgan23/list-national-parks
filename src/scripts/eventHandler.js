const parkEditForm = (parkObject) => {
    const editFormFragment = document.createDocumentFragment();

    editFormFragment.appendChild(buildElementWithText("label", "Name: ", undefined));
    editFormFragment.appendChild(buildElementWithText("input", undefined, `edit-park-name--${parkObject.id}`, parkObject.name));
    editFormFragment.appendChild(buildElementWithText("label", "State: ", "edit-park-name", undefined));
    editFormFragment.appendChild(buildElementWithText("input", undefined, `edit-park-state-${parkObject.id}`, parkObject.state));
    editFormFragment.appendChild(buildElementWithText("button", "Save Changes", undefined));

    return editFormFragment;
}

const listNationalParks = () => {
    return getParks().then(response => appendParksToDom(response));
}

const listMonuments = () => {
    return getMonuments().then(response => appendMonumentsToDom(response));
}

const handleParkDelete = () => {
    let parkId = event.target.parentNode.id.split("--")[1];
    deletePark(parkId).then(() => listNationalParks());
}

const handleParkEdit = () => {
    let parkId = event.target.parentNode.id.split("--")[1];
    const parkArticle = event.target.parentNode


    getParks(parkId).then(parkToEdit => {
        const editFormForPark = parkEditForm(parkToEdit);
        parkArticle.appendChild(parkEditForm(editFormForPark));
    })
}

const handleUpdate = () => {
    let parkId = event.target.parentNode.id.split("--")[1];
}

const handleMonumentDelete = () => {
    let monumentId = event.target.parentNode.id.split("--")[1];
    deleteMonument(monumentId).then(() => listMonuments());
}

const showVisited = () => {
    const visited = document.querySelectorAll(".visited");
    visited.forEach(node => {
        switch(true) {
            case(node.style.display === "flex"):
                node.style.display = "none";
                break;
            case(node.style.display === "none"):
                (node.style.display = "flex");
                break;
        }
    })
}
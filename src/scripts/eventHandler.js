const listNationalParks = () => {
    return getParks().then(response => appendParksToDom(response));
}

const listMonuments = () => {
    return getMonuments().then(response => appendMonumentsToDom(response));
}

const handleParkDelete = () => {
    let parkId = event.target.id.split("--")[1];
    deletePark(parkId).then(() => listNationalParks());
}

const handleMonumentDelete = () => {
    let monumentId = event.target.id.split("--")[1];
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
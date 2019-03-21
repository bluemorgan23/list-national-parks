const listNationalParks = () => {
    return getParks().then(response => appendParksToDom(response));
}

const handleDelete = () => {
    let parkId = event.target.id.split("--")[1];
    deletePark(parkId).then(() => listNationalParks());
}

// const showVisited = () => {
//     const visitedParks = document.querySelectorAll(".visited");
//     visitedParks.forEach(node => {
//         switch(true) {
//             case(node.hasAttribute("style"))
//         }
//         node.setAttribute("style", "display: none");
//     })
// }
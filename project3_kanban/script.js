const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');

for (const card of cards) {
    card.addEventListener("dragstart", dragStart);
    console.log(card.textContent);
    card.addEventListener("dragend", dragEnd);


}

for (const list of lists) {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragdrop);
}

function dragStart(ev) {
    console.log('drag start' + ev.target.textContent);
    ev.target.classList.add("dragging");
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
    // Set the drag's format and data.
    // Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", ev.target.id);
    console.log("Data sent: " + ev.target.id)

}

function dragEnd(ev) {
    console.log('drag end' + ev.target.textContent);
    ev.target.classList.remove("dragging");


}

function dragOver(ev) {
    // console.log('Dragg overed');
    ev.target.classList.add("over");
    ev.preventDefault()
}

function dragEnter(ev) {
    // highlight potential drop target when the draggable element enters it
    if (ev.target.classList.contains("list")) {
        // console.log("dragged enter");

        ev.target.classList.add("over");
    }

}

function dragLeave(ev) {
    // reset background of potential drop target when the draggable element leaves it
    if (ev.target.classList.contains("list")) {
        // console.log("Dragged leave");

        ev.target.classList.remove("over");
    }

}

function dragdrop(ev) {
    ev.preventDefault();

    console.log("Drop event: " + ev.target.id);

    if (ev.target.classList.contains("list")) {

        // Get the data, which is the id of the source element
        const data = ev.dataTransfer.getData("text");
        // console.log('Dropeed data text before source:  +: ' + data)

        const source = document.getElementById(data);

        
        ev.target.appendChild(source);

    }



}
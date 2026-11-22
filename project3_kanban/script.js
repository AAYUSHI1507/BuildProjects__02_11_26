const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');

for(const card of cards){
    card.addEventListener("dragstart",dragStart);
    console.log(card.textContent);
    card.addEventListener("dragend",dragEnd);
    
    
}

for(const list of lists){
    list.addEventListener("dragover",dragOver);
    list.addEventListener("dragenter",dragEnter);
    list.addEventListener("dragleave",dragLeave);
    list.addEventListener("drop",dragdrop);
}

function dragStart(ev) {
    console.log('drag start'+ev.target.textContent);
    ev.target.classList.add("dragging");
    
}

function dragEnd(ev) {
    console.log('drag end'+ev.target.textContent);
    ev.target.classList.remove("dragging");

    // Clear the drag data cache (for all formats/types)
  ev.dataTransfer.clearData();
  // Set the drag's format and data.
  // Use the event target's id for the data
  ev.dataTransfer.setData("text/plain", ev.target.id);
}
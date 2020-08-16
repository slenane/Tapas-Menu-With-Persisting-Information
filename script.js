const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
    //this prevents the page from automatically reloading
    e.preventDefault();
    const text = (this.querySelector("[name=item]")).value;
    const item = {
        text,
        done: false,
    };
    //Add item to array
    items.push(item);
    populateList(items, itemsList);
    //add items to local storage so it persists
    localStorage.setItem("items", JSON.stringify(items));
    //reset the input field
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" 
                ${plate.done ? "checked" : ""} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join("");
}

function toggleDone(e) {
    if (!e.target.matches("input")) return; //Skip this unless it's an input
    
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
populateList(items, itemsList)
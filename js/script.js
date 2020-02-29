// Select the element

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// variables
let LIST = [],
    id = 0;

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Show todays date
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options)

// Add todo functions

function addTodo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i> 
                </li> 
                 `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// Add item to the list if user press enter key
input.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        // if not empty
        if (toDo) {
            addTodo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            id++;
        }
        input.value = "";
    }
});

// Complete todo
function completeTodo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove todo

function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items
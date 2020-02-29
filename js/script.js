// Select the element

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// variables
let LIST, id;

//get items from locale storage
let data = localStorage.getItem("TODO");


// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}



// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

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

            // add item to local storage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
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

list.addEventListener("click", function(event) {
    const element = event.target; //return the clicked element inside the list
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeTodo(element);
    } else if (elementJob == "delete") {
        removeTodo(element);
    }

    // add item to local storage 
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
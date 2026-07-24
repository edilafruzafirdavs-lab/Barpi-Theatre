import {Hall,HallObject,Zone,Seat} from './Data/HallObjects.js';

const path = document.getElementById('Path');
const hall = document.getElementById('hall');
const CreateObjectButton = document.getElementById('CreateObjectButton');
const CreateObjectPanel = document.getElementById('CreateObjectPanel');
const CreateButtons = document.querySelectorAll('.CreateBtn');

const Hall_Name = path.getAttribute('hallname');
const Hall_Id = path.getAttribute('hallid');

const HallObj = new Hall(Hall_Id,Hall_Name);

export const CurrentLocalEnvironment = {
    CSLE : hall
}

path.textContent = `${Hall_Name}(id=${Hall_Id})`;

const TypesOfObjects = {
    'Seat':() => new Seat(0,0),
    'Zone':() => new Zone(0,0),
};

function CreateObject(typeofobj){
    const obj = TypesOfObjects[typeofobj]
    if (obj){
        const object = obj()
        HallObj[`Add${object.Name.GetValue()}`](object)
        console.log(HallObj)
    }
};

CreateButtons.forEach((el,i) => {
    el.addEventListener("click", (event) => {
        CreateObject(el.getAttribute('objtype'))
    })
});


let x = 0;
let y = 0;
let scale = 1;

let dragging = false;
let lastX = 0;
let lastY = 0;

hall.addEventListener("mousedown", (event) => {
    dragging = true;

    lastX = event.clientX;
    lastY = event.clientY;
});

hall.addEventListener("mouseup", () => {
    dragging = false;
});

hall.addEventListener("mousemove", (event) => {
    if (!dragging) return;

    x += event.clientX - lastX;
    y += event.clientY - lastY;

    lastX = event.clientX;
    lastY = event.clientY;

    hall.style.transform =
        `translate(${x}px, ${y}px) scale(${scale})`;
});

let hovered = null;
let selected = null;

document.addEventListener("mouseover", (event) => {
    const target = event.target;

    if (!target.classList.contains("Object")) {
        if (hovered && hovered !== selected) {
            hovered.style.border = "0";
        }
        return
    };

    if (hovered && hovered !== selected) {
        hovered.style.border = "0";
    }

    hovered = target;

    if (hovered !== selected) {
        hovered.style.border = "1px solid red";
    }
});

document.addEventListener("click", (event) => {
    const target = event.target;

    if (!target.classList.contains("Object")) {
        if (selected) {
            selected.style.border = "0";
            selected = null;
        }
        return;
    }

    if (selected) {
        selected.style.border = "0";
    }

    selected = target;
    selected.style.border = "2px solid black";
});

hall.addEventListener("wheel", (event) => {
    event.preventDefault();

    if (event.deltaY < 0)
        scale *= 1.1;
    else
        scale /= 1.1;

    hall.style.transform =
        `translate(${x}px, ${y}px) scale(${scale})`;
});

CreateObjectButton.addEventListener("click", (event) => {
    CreateObjectPanel.style.opacity = CreateObjectPanel.style.opacity == 0 ? 1:0
});


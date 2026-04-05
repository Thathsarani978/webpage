

// SORTING VISUALIZER 

const count = 50;
let array = [];
let var_speed = 200;
let sortingInitialized = false;


// START SORTING (button click)
function startSorting(button) {
    const container = document.getElementById("sorting-container");

    if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "block";
        button.innerText = "Close";

        if (!sortingInitialized) {
            initSorting();
            sortingInitialized = true;
        }

    } else {
        container.style.display = "none";
        button.innerText = "Start";
    }
}


// INITIALIZE BARS
function initSorting() {
    const visualizer = document.getElementById("visualizer");

    // clear previous
    visualizer.innerHTML = "";
    array = [];

    // create new data
    for (let i = 0; i < count; i++) {
        array[i] = Math.random();
    }

    // create bars
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * 100 + "%";
        visualizer.appendChild(bar);
    }

    // start sorting
    bubbleSort(array).then(() => {
        motorcycleRide();
    });
}


// CHANGE SPEED
function changeSpeed(value) {
    const max = 400;
    const min = 10;

    var_speed = max + min - parseInt(value);
}

// UPDATE BARS
function updateBars() {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < bars.length; i++) {
        bars[i].style.height = array[i] * 100 + "%";
    }
}


// BUBBLE SORT
async function bubbleSort(arr) {
    let swapped;

    do {
        swapped = false;

        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] > arr[i]) {

                let temp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = temp;

                swapped = true;

                updateBars();

                await new Promise(resolve =>
                    setTimeout(resolve, var_speed)
                );
            }
        }

    } while (swapped);
}


// MOTORCYCLE ANIMATION
async function motorcycleRide() {
    const motor = document.getElementById("motorcycle");
    motor.style.display = "block";

    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];

        motor.style.left = bar.offsetLeft + "px";
        motor.style.top = (bar.offsetTop - motor.offsetHeight) + "px";

        await new Promise(resolve => setTimeout(resolve, 80));
    }
}



// CHESS GAME 

// store selected piece
let selectedPiece = null;

// prevent multiple event bindings
let gameInitialized = false;


// START GAME (button click)
function startGame(button) {
    const container = document.getElementById("chess-container");

    // show / hide toggle
    if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "block";

        // CHANGE button text
        button.innerText = "Close";

        // initialize only once
        if (!gameInitialized) {
            setupChessGame();
            gameInitialized = true;
        }

    } else {
        container.style.display = "none";

        // CHANGE button text back
        button.innerText = "Start Game";
    }
}


// SETUP CLICK EVENTS
function setupChessGame() {
    const cells = document.getElementsByClassName("cell");

    for (const cell of cells) {
        cell.addEventListener("click", function () {
            handleClick(cell);
        });
    }
}


// HANDLE CELL CLICK
function handleClick(cell) {
    const cells = document.getElementsByClassName("cell");

    // remove borders from all cells
    for (const cell of cells) {
        cell.style.border = "";
    }

    // if a piece is already selected → move it
    if (selectedPiece !== null) {
        cell.replaceChildren(selectedPiece);
        selectedPiece = null;

    } 
    // select a piece
    else if (cell.children.length > 0) {
        selectedPiece = cell.children[0];
        cell.style.border = "4px solid red";
    }
}


// ANIMAL GRID 

class Cat {
    constructor(name, age, furr, eyes) {
        this.name = name;
        this.age = age;
        this.furr = furr;
        this.eyes = eyes;
    }

    talk() {
        console.log(this.name + " says meow");
    }

    render() {
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 200;

        const ctx = canvas.getContext("2d");

        // Face
        ctx.fillStyle = this.furr;
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = this.eyes;
        ctx.beginPath();
        ctx.arc(80, 90, 5, 0, Math.PI * 2);
        ctx.arc(120, 90, 5, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = this.furr;

        ctx.beginPath();
        ctx.moveTo(60, 60);
        ctx.lineTo(80, 30);
        ctx.lineTo(100, 60);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(100, 60);
        ctx.lineTo(120, 30);
        ctx.lineTo(140, 60);
        ctx.fill();

        // Whiskers
        ctx.strokeStyle = "black";

        ctx.beginPath();
        ctx.moveTo(50, 110);
        ctx.lineTo(80, 105);
        ctx.moveTo(50, 120);
        ctx.lineTo(80, 120);
        ctx.moveTo(50, 130);
        ctx.lineTo(80, 135);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(150, 110);
        ctx.lineTo(120, 105);
        ctx.moveTo(150, 120);
        ctx.lineTo(120, 120);
        ctx.moveTo(150, 130);
        ctx.lineTo(120, 135);
        ctx.stroke();

        return canvas;
    }
}

let animalsInitialized = false;

// BUTTON CONTROL
function startAnimals(button) {
    const containerDiv = document.getElementById("animal-grid-container");

    if (containerDiv.style.display === "none" || containerDiv.style.display === "") {
        containerDiv.style.display = "block";
        button.innerText = "Close";

        if (!animalsInitialized) {
            fetchData();
            animalsInitialized = true;
        }

    } else {
        containerDiv.style.display = "none";
        button.innerText = "Start";
    }
}


// FETCH + RENDER
async function fetchData() {
    const container = document.getElementById("container");

    try {
        const response = await fetch("https://radufromfinland.com/animals/");
        const data = await response.json();

        container.innerHTML = "";

        for (let i = 0; i < 50; i++) {

            const randomAnimal = data[Math.floor(Math.random() * data.length)];

            let animal;

            if (Math.random() < 0.5) {
                animal = new Dog(
                    randomAnimal.name,
                    randomAnimal.age,
                    randomAnimal.furr,
                    randomAnimal.eyes
                );
            } else {
                animal = new Cat(
                    randomAnimal.name,
                    randomAnimal.age,
                    randomAnimal.furr,
                    randomAnimal.eyes
                );
            }

            const canvas = animal.render();

            canvas.onclick = function () {
                animal.talk();

                if (animal instanceof Dog) {
                    const sound = document.getElementById("dogSound");
                    sound.currentTime = 0;
                    sound.play();
                } else {
                    const sound = document.getElementById("catSound");
                    sound.currentTime = 0;
                    sound.play();
                }
            };

            container.appendChild(canvas);
        }

    } catch (err) {
        console.error(err);
    }
}
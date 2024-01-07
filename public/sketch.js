
// MUSIC IDEAS
// Susumu Yokota - Kirakiraboshi

const monkeysFlock = [];

const DIR = {
	LEFT: 0,
	RIGHT: 1
}


let alignSlider, cohesionSlider, seperationSlider;

let background;

let spriteSheets = [];
let sprites = [];

let horses = [];

let gridSize;
let monkeysGrid = [];

function preload(){
    spriteSheets.push(loadImage('data/Diddy_Kong.ss.png'));
    background = loadImage('data/background.png')
}

function setup(){
    createCanvas(2000, 1000);

    alignSlider = createSlider(0, 2, 1.5, 0.1);
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    separationSlider = createSlider(0, 2, 2, 0.1);

    imageMode(CENTER);

    for (let i = 0; i < 1000; i++){
        monkeysFlock.push(new Monkey());
    }

    sprites.push(new Sprite(spriteSheets[0], 15, 4, 48, 43));
    gridSize = 10;
}

function draw(){
    image(background, width/2, height/2);
    console.log(frameRate());
    sortMonkeys();

    for (let i = 0; i < gridSize; i++){
        for (let j = 0; j < gridSize; j++){
            localMonkeys = [];

            for (let a = -1; a < 2; a++){
                for (let b = -1; b < 2; b++){
                    //console.log("u : " + mod(i+a, gridSize) + " v : " +  mod(j+b, gridSize));
                    localMonkeys = localMonkeys.concat(monkeysGrid[mod(i+a, gridSize)*gridSize + mod(j+b, gridSize)]);
                    //console.log(monkeysGrid[mod(i+a, gridSize)*gridSize + mod(j+b, gridSize)]);
                }
            }
            //console.log(localMonkeys);
            //console.log(monkeysGrid[0]);
            for (let monkey of monkeysGrid[i*gridSize + j]){
                monkey.edges();
                monkey.flock(localMonkeys);
                monkey.update();
                monkey.show(sprites[0]);
            }
        }
    }
/*
    for (let i = 0; i < monkeysGrid.length; i++){
        for (let monkey of monkeysGrid[i]){
            monkey.edges();
            monkey.flock(monkeysFlock);
            monkey.update();
            monkey.show(sprites[0]);
        }
    }
    /*
    for (let monkey of monkeysFlock){
        monkey.edges();
        monkey.flock(monkeysFlock);
        monkey.update();
        monkey.show(sprites[0]);
    }
    */
}

function sortMonkeys(){

    // CLEAR GRID
    for (let i = 0; i < gridSize; i++){
        for (let j = 0; j < gridSize; j++){
            monkeysGrid[i*gridSize + j] = [];
        }
    }

    // FILL GRID
    //console.log(monkeysFlock.length);
    for (let i = 0; i < monkeysFlock.length; i++){
        let w = mod(floor(monkeysFlock[i].position.x * gridSize / width) , gridSize);
        let h = mod(floor(monkeysFlock[i].position.y * gridSize / height), gridSize);

        monkeysGrid[w*gridSize + h].push(monkeysFlock[i]);
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

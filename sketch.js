
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

    for (let i = 0; i < 400; i++){
        monkeysFlock.push(new Monkey());
    }

    sprites.push(new Sprite(spriteSheets[0], 15, 4, 48, 43));
}

function draw(){
    image(background, width/2, height/2);

    for (let monkey of monkeysFlock){
        monkey.edges();
        monkey.flock(monkeysFlock);
        monkey.update();
        monkey.show(sprites[0]);
    }
}
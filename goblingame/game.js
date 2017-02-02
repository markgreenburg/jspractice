/**
 * Character Factories
 */

/* Hero */
const hero = () => {
    let state = {
        "name": "hero",
        "speedX": 0,
        "speedY": 0,
        "posX": 0,
        "posY": 0,
        "img": "images/hero.png",
        "width": 32,
        "height": 32
    };
    return Object.assign(
        {},
        stateGetter(state),
        stateSetter(state),
        renderer (state),
        mover(state),
        directionChanger(state)
    )
};

/* Monster */
const monster = () => {
    let state = {
        "name": "monster",
        "speedX": 1,
        "speedY": 1,
        "posX": 100, // change these
        "posY": 100, // change these
        "img": "images/hero.png",
        "width": 32,
        "height": 32
    };
    return Object.assign(
        {},
        stateGetter(state),
        stateSetter(state),
        renderer(state),
        mover(state),
        directionChanger(state),
        boundsChecker(state)
    )
}

/**
 * Game Actions
 */

/* Character state getters */
const stateGetter = (state) => ({
    "getSpeedX": () => state.speedX,
    "getSpeedY": () => state.speedY,
    "getPosX": () => state.posX,
    "getPosY": () => state.posY,
    "getImg": () => state.img,
    "getWidth": () => state.width,
    "getHeight": () => state.height
});

/* Character state setters */
const stateSetter = (state) => ({
    "setSpeedX": (speedX) => state.speedX = speedX,
    "setSpeedY": (speedY) => state.speedY = speedY,
    "setPosX": (posX) => state.posX = posX,
    "setPosY": (posY) => state.posY = posY,
    "setImg": (img) => state.img = img,
    "setWidth": (width) => state.wdith = width,
    "setHeight": (height) =>state.height = height
});

/* Render character on the canvas */
const renderer = (state) => ({
    "render": () => {
        ctx.drawImage(state.img, state.posX, state.posY);
    }
});

/* Move character to new position based on own speed */
const mover = (state) => ({
    "move": () => {
        state.posX += state.speedX;
        state.posY += state.speedY;
    }
});

/* Change character direction based on type of character */
const directionChanger = (state) => ({
    "changeDirection": (width, height) => {
        if (state.name === "hero") {
            if (state.posX > width - 30) {
                state.speedX = -2;
            } else if (state.posX < 30) {
                state.speedX = 2;
            }
            if (state.posY > height - 30) {
                state.speedY = -2;
            } else if (state.posY < 30) {
                state.speedY = 2;
            }
        } else if (state.name === "monster") {
            const newDirection = getRand(1, 4);
            switch (newDirection) {
                case 1:
                    state.speedX = 0;
                    state.speedY = -1 * state.speedY;
                    break;
                case 2:
                    state.speedY = 0;
                    break;
                case 3:
                    state.speedX = 0;
                    break;
                case 4:
                    state.speedX = -1 * state.speedX;
                    state.speedY = 0;
                    break;
                default:
                    break;
            }
        }
    }
});

const boundsChecker = (state) => ({
    "checkBounds": (width, height) => {
        if (state.posX > width) {
            state.posX = 0
        }
        if (state.posX < 0) {
            state.posX = width;
        }
        if (state.posY > height) {
            state.posY = 0;
        }
        if (state.posY < 0) {
            state.posY = height;
        }
    }
});

/**
 * Game functions
 */

/* Get random whole number for direction changes */
const getRand = (min, max) => {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + min;
}

/* Update position of characters */
// const updatePos = (characterState, canvasState) {

/**
 * Redraw screen
 */
// const animate = () => requestAnimationFrame(draw);

/* Set canvas */

const draw = () => {
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 480;
    const background = new Image();
    background.src = "images/background.png";
    ctx.drawImage(background, 0, 0);
    const hero = hero();
    const heroImageLink = hero.getImage();
    ctx.drawImage(heroImageLink, 0, 0);
    // Game functions go here
    window.requestAnimationFrame(draw);
};

draw();
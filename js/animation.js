document.documentElement.style.overflow = 'hidden';
const $$ = (sel) => document.querySelector(sel);

const BROWSER_WIDTH = window.innerWidth;
const BROWSER_HEIGHT = window.innerHeight;

let canvas = $$('#animation');
let ctx = canvas.getContext('2d');

let left_right_frames = new Array(15);
let right_left_frames = new Array(15);
let changeDirection = false;

let egyptianWalkingImg = $$('img');

let currPos = -100;
let currImg = 0;

let startingTextPosX = 200;
let startingTextPosY = -100;

let texts = ["Pharaoh\'s Casino", 'Presents' ,'FARO'];

let text1_placed = false;
let text2_placed = false;
let text3_placed = false;

let fontFamily = "'Press Start 2P'"; 
let defaultFontSize = 20;

let stopId;
let stopMoving;
let stopWalking;

let w = 0;
let h = 0;

window.addEventListener('load', function() {
    setUp();
});

function setUp() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    
    imgStartingPointTopLeft(egyptianWalkingImg, startingTextPosX, startingTextPosY);
    drawBlackCover();
    showSkipBtn();
    requestAnimationFrame(openingAnimation);
    cancelAnimationFrame(stopId);
    
    for (let i = 0; i < left_right_frames.length; i++) {
        let imgTag = document.createElement('img');
        imgTag.src = `./images/GIFs/egyptian_left_right_frames/${i}.png`;
        imgTag.alt = `Egyptian walking from left to right frame #${i + 1}`;
        left_right_frames[i] = imgTag;
    }
    console.log(left_right_frames);

    for (let i = 0; i < right_left_frames.length; i++) {
        let imgTag = document.createElement('img');
        imgTag.src = `./images/GIFs/egyptian_right_left_frames/${i}.png`;
        imgTag.alt = `Egyptian walking from right to left frame #${i + 1}`;
        right_left_frames[i] = imgTag;
    }
    console.log(right_left_frames);
}

function openingAnimation() {

    ctx.beginPath();
    ctx.clearRect(canvas.width/2, canvas.height/2, w/2, h/2);
    ctx.clearRect(canvas.width/2, canvas.height/2, -w/2, -h/2);
    ctx.clearRect(canvas.width/2, canvas.height/2, -w/2, h/2);
    ctx.clearRect(canvas.width/2, canvas.height/2, w/2, -h/2);

    w += 8;
    h += 4.5;

    console.log(w + ' ' + h);

    if (w < BROWSER_WIDTH) {
        stopId = window.requestAnimationFrame(openingAnimation);
    } 
    else {
        console.log('go');
        egyptianWalk();
    }
}

function drawBlackCover() {
    ctx.beginPath();
    ctx.fillRect(0, 0, BROWSER_WIDTH, BROWSER_HEIGHT);
}


function imgStartingPointTopLeft(img, top, left) {
    img.style.top = top + 'px';
    img.style.left = left + 'px';
}

function startWalking() {
    if (currImg === 14) {
        currImg = 0;
    } 
    else {
        currImg++;
    }

    if (currPos < BROWSER_WIDTH && changeDirection == false) {
        $$('img').src = left_right_frames[currImg].src;
    }
    else {
        changeDirection = true;
        $$('img').src = right_left_frames[currImg].src;
    }
}

function startMoving() {
    if (changeDirection == true) {
        if (currPos <= -100) {
            stop();
            console.log('stopped');
            if (text2_placed == true) {
                showGameName();
            }

            if (text1_placed === true && text2_placed === true && text3_placed === true) {
                setTimeout(closeAnimation, 1000);
            }
        }

        else {
            if (text1_placed === true) {
                $$('img').style.top = 300 + 'px';
                rightToLeftText();
                currPos -= 1;
            }
        }
    }    
    else {
        currPos += 1;
        if (text1_placed === false) {
            leftToRightText();
        }
    }
    egyptianWalkingImg.style.left = currPos + 'px';
    console.log(currPos);
}

function egyptianWalk() {
    stopWalking = setInterval('startWalking()', 70);
    stopMoving  = setInterval('startMoving()', 10);
}

function stop() {
    clearInterval(stopWalking);
    clearInterval(stopMoving);
}

function leftToRightText() {
    ctx.font = (defaultFontSize+5)+"px "+fontFamily;

    if (currPos < BROWSER_WIDTH/2-startingTextPosX) {
        ctx.clearRect(currPos-4, startingTextPosX, ctx.measureText(texts[0]).width, startingTextPosY);
        ctx.fillText(texts[0], currPos, parseInt($$('img').style.top));
    }
    else {
        ctx.clearRect(currPos-1,parseInt($$('img').style.top), ctx.measureText(texts[0]).width, startingTextPosY);
        ctx.fillText(texts[0], BROWSER_WIDTH/2-startingTextPosX, parseInt($$('img').style.top));
        text1_placed = true;
    }
}

function rightToLeftText() {
    ctx.font = (defaultFontSize+3)+"px " + fontFamily;
    
    if (currPos === Math.round(BROWSER_WIDTH/2 - ctx.measureText(texts[1]).width/2)) {
        console.log('passed');
        ctx.fillText(texts[1], currPos, parseInt($$('img').style.top));
        text2_placed = true;
    }
}

function showGameName() {
    if (text1_placed == true && text2_placed == true) {
        ctx.font = (defaultFontSize+20)+'px ' + fontFamily;
        ctx.fillStyle = 'red';
        ctx.fillText(texts[2], Math.round(BROWSER_WIDTH/2-ctx.measureText(texts[2]).width/2), parseInt($$('img').style.top)+100);    
        text3_placed = true;
    }
}

function showSkipBtn() {
    let skipBtn = $$('#skipBtn');
    skipBtn.style.bottom = 10+'px';
    skipBtn.style.right = 10+'px';
    skipBtn.addEventListener('mousedown', closeAnimation);
}

function closeAnimation() {
    window.location.href = "intro.html";
}
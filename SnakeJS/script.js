const board = document.querySelector('.board');
const startButton = document.querySelector('.start-btn');
const modal = document.querySelector('.modal');
const startGame = document.querySelector('.start-game');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart-btn');

const highScore = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');

const blockHeight = 60;
const blockWidth = 60;

let highScoreValue = localStorage.getItem('highScore') || 0;
highScore.innerText = highScoreValue;

let score = 0;
let time = `00:00`;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let IntervalId = null;
let timerIntervalId = null;

let direction = 'right';
let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};


const blocks = [];
let snake = [
    {x:1 , y:3},
]

for(let row = 0 ; row < rows ; row++) {
    for(let col = 0 ; col < cols ; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

function render() {

    let head = null;
    blocks[`${food.x}-${food.y}`].classList.add('food');

    if(direction === 'left'){
        head = {x: snake[0].x, y: snake[0].y - 1};
    } else if(direction === 'right'){
        head = {x: snake[0].x, y: snake[0].y + 1};
    } else if(direction === 'up'){
        head = {x: snake[0].x - 1, y: snake[0].y};
    } else if(direction === 'down'){
        head = {x: snake[0].x + 1, y: snake[0].y};
    }

    // Wall collision
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        clearInterval(IntervalId);
        clearInterval(timerIntervalId);

        modal.style.display = 'flex';
        startGame.style.display = 'none';
        gameOver.style.display = 'flex';
        return;
    }

    // Remove previous snake
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
        blocks[`${segment.x}-${segment.y}`].classList.remove('head');

    });

    // Food eaten
    if(head.x === food.x && head.y === food.y){

        snake.unshift(head);

        score += 10;
        scoreElement.innerText = score;

        if(score > highScoreValue){
            highScoreValue = score;
            localStorage.setItem("highScore", highScoreValue);
            highScore.innerText = highScoreValue;
        }

        blocks[`${food.x}-${food.y}`].classList.remove("food");

        do{
            food = {
                x: Math.floor(Math.random() * rows),
                y: Math.floor(Math.random() * cols)
            };
        }
        while(
            snake.some(segment => segment.x === food.x && segment.y === food.y)
        );

        blocks[`${food.x}-${food.y}`].classList.add("food");
        
    }
    else{
        snake.unshift(head);
        snake.pop();
    }

    // Draw snake
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
        blocks[`${snake[0].x}-${snake[0].y}`].classList.add('head');
        
    });
    
}

startButton.addEventListener('click', () => {
    modal.style.display = 'none';
    startTimer();
    IntervalId = setInterval(() => {render()}, 500);
});

restartButton.addEventListener('click', () => {
    reStartGame();
    startTimer();
});

function reStartGame(){ 

    blocks[`${food.x}-${food.y}`].classList.remove('food');
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    });

    score = 0;
    scoreElement.innerText = score;
    time = `00:00`;
    timeElement.innerText = time;

    modal.style.display = 'none';
    direction = 'right';
    snake = [ {x:1 , y:3}];
    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};

    clearInterval(IntervalId);
    clearInterval(timerIntervalId);

    IntervalId = setInterval(() => {render()}, 500);
}

function startTimer() {
    clearInterval(timerIntervalId);

    let seconds = 0;
    let minutes = 0;

    timerIntervalId = setInterval(() => {

        seconds++;

        if(seconds === 60){
            seconds = 0;
            minutes++;
        }

        time = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        timeElement.innerText = time;

    },1000);
}

addEventListener('keydown', (event) => {

    if(event.key === 'ArrowUp' && direction !== 'down'){
        direction = 'up';
    }
    else if(event.key === 'ArrowDown' && direction !== 'up'){
        direction = 'down';
    }
    else if(event.key === 'ArrowLeft' && direction !== 'right'){
        direction = 'left';
    }
    else if(event.key === 'ArrowRight' && direction !== 'left'){
        direction = 'right';
    }

});
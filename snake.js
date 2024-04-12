// game constant and variables...........................................
let inputdir = {x: 0,y: 0}
const foodsound = new Audio('snake_bite.wav')
const gameoversound = new Audio('game_over.mp3')
const movesound = new Audio('move.mp3')
const musicsound = new Audio('snake_moment.mp3')
let snakeAray  = [
    {x:13,y:15}
]
let food = {x:6,y:7}
let speed = 10
let score = 0
let lastpainttime = 0


// GAME FUNCTIONS............................................................
function main (ctime){
    window.requestAnimationFrame(main)
    if((ctime - lastpainttime)/ 1000 < 1/speed){
        return
    }
    lastpainttime = ctime
    gameEngine()
}

function iscolide(sarr){
    // if you bump into your self.............................................................

    for (let i = 1; i < sarr.length; i++) {
        if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
        return true
        }
    }
    // if you bump into the wall .......................................................

    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18|| sarr[0].y <= 0) {
        return true;
    }
    return false
}

function gameEngine(){
    // part 1 updating the snake variable .......................................................

    if (iscolide(snakeAray)){
        gameoversound.play()
        musicsound.pause()
        inputdir = {x: 0,y: 0}
        alert('game over press any key to play again ')
        snakeAray = [{x:13,y:15}]
        musicsound.play()
        score = 0

    }
    // if you eten the food , incriment the score and regenerate the food...........................

    if(snakeAray[0].y === food.y && snakeAray[0].x === food.x){
        foodsound.play()
        score += 1
        if(score > hiscoreval){
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            highscorebox.innerHTML = "high score: "+ hiscoreval
        }
        scorebox.innerHTML = "score:" + score
        snakeAray.unshift({x: snakeAray[0].x + inputdir.x , y: snakeAray[0].y + inputdir.y})
        let a = 2;
        let b =16;
        food ={x: Math.round(a + (b - a )* Math.random()), y: Math.round(a + (b - a )* Math.random())}

    }

    // moving the snake................................................................................
    for (let i = snakeAray.length - 2; i >=0; i--){
        snakeAray[i+ 1] =  {...snakeAray[i]}
       
    }
    snakeAray[0].x += inputdir.x
    snakeAray[0].y += inputdir.y

    // part 2 display the snake and food .............................................................
    // dispaly the snake ......................................
    board.innerHTML = ""
    snakeAray.forEach((e,index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x      
        if (index === 0) {
            snakeElement.classList.add('head')           
        } 
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    //display the food .............................................
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food') 
    board.appendChild(foodElement)

}
// main logic start here.............................................................
let hiscore = localStorage.getItem("hiscore")
if(hiscore === null){
    hiscoreval = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore)
    highscorebox.innerHTML = "high score: "+ hiscore
}

window.requestAnimationFrame(main)
window.addEventListener('keydown',e =>{
    inputdir = {x:0,y:1} 
    // start the game.................................................. 
    movesound.play()
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputdir.x = 0;
            inputdir.y = -1;         
            break;

        case 'ArrowDown':
            console.log('ArrowDown');
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft');
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight');
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
})
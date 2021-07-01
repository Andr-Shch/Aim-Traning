const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen')
const timeList =document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
let time = 0;
const board = document.querySelector('#board')
let score = 0;
const colors = ['#00FFFF','#FF00FF', '#FF0099', '#6E0DD0', '#00FF66'];

startBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event=>{
    if(event.target.classList.contains('time-btn')){
       // console.log(event.target)
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        //console.log(time)
        startGame();
    }
})

board.addEventListener('click', event=>{
    if (event.target.classList.contains('circle')){
         score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame(){
    createRandomCircle()
    setTime(time);
    setInterval(decreaseTime, 1000)

}

function decreaseTime(){
 if (time===0){
     finishGame()
 }else if(time>0){
    let curent = --time;
    if (curent < 10){curent = `0${curent}`}
    setTime(curent)
 }
 
} 

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function createRandomCircle(){
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60)
    const {width, height}= board.getBoundingClientRect();

    const x = getRandomNumber(0, width-size);
    const y = getRandomNumber(0, height-size)
    
    const color = getRandomColor();
    circle.style.backgroundColor=color+'';
    circle.classList.add('circle') 
    circle.style.width = size+'px'
    circle.style.height = size+'px'
    circle.style.left = x+'px';
    circle.style.top= y+'px'
     
    board.append(circle)

}

function getRandomNumber(min, max){
    return Math.round(Math.random()*(max-min)+min)
}

function finishGame(){
  timeEl.parentNode.remove()  
  board.innerHTML = `<h1>Your score: <span class='primary'>${score}</span>`;
}

function getRandomColor(){
    const  index = Math.floor(Math.random()*colors.length)
    return colors[index]
 }
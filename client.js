$(document).ready(readyNow);

let lockboard= true;
let highScore = 0;
let clock= '0:30';
let a,b,c,d;

let blocks = ['<div id="red" class="block"></div>',//creates an array holding 4 block elements, red, blue, green, yellow
'<div id="blue" class="block"></div>',
'<div id="green" class="block"></div>',
'<div id="yellow" class="block"></div>'];

let words = ['RED','BLUE','YELLOW','GREEN']//these two arrays will generate a random word with a random color
let colors= ['red','blue','yellow','green']

function readyNow() {
    $('#start').on('click', startGame)
    $('#enter').on('click', function(){
        $('#winner').empty();
        $('#winner').append(`High Score: ${$('#name').val()}`)
        $('#victory').css("z-index","-100")
        $('#victory').css("opacity", "0")
        $('#score').empty();
        $('#score').append(`Score 0`);
    })
    
}
function randomBlock() {

    if(!lockboard){
        for(let i = 0; i < 4; i++){
            a = Math.floor(Math.random()*4)//used to shuffle array of blocks
            c = Math.floor(Math.random()*4)//used to pick a random word
            d = Math.floor(Math.random()*4)//used to pick a random color
            b = blocks[i];
            blocks[i]=blocks[a];
            blocks[a]=b;
        }
        $('#word').empty();
        $('#word').append(`<h1 style="color:${colors[d]}" >${words[c]}</h1>`)
        $('#container').empty();
        $('#container').append(blocks);
        return blocks;
    }
}
function startGame() {
    lockboard=false;
    count = 30;
    moveCount = 0;
    runClock();
    $('#container').empty();
    $('#word').empty();
    randomBlock();
    if(!lockboard){
        $('#container').off('click')
        $('#container').on('click', '.block', function(){
            console.log($(this).attr("id"));
            console.log(words[c].toLowerCase());
            if( $(this).attr("id") == (colors[d]).toLowerCase() && !lockboard){
                console.log('true');
                moveCount++
                $('#score').empty();
                $('#score').append(`Score ${moveCount}`);
            } else if($(this).attr("id") != (colors[d]).toLowerCase() && !lockboard){
                moveCount--
                $('#score').empty();
                $('#score').append(`Score ${moveCount}`);
            }
            randomBlock();
        })
    }
}

function runClock() {
    if(count >0 && count <= 10){
        count--;
        $('#time').empty();
        $('#time').append(`Time 0:0${count}`);
        setTimeout(runClock,1000);
    } else if(count>0){
        count--;
        $('#time').empty();
        $('#time').append(`Time 0:${count}`);
        setTimeout(runClock,1000);
    } else {
        lockboard = true;
        checkForHighScore();
    }
}

function checkForHighScore() {
    if(moveCount > highScore){
        highScore = moveCount
        $('#highScore').empty();
        $('#highScore').append(`High Score ${highScore}`)
        $('#victory').css("z-index","100")
        $('#victory').css("opacity", ".9")
    }
}
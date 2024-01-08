var level = 1;

var sequance = [];

var gameStarted = false;
var wrong = false;



$(document).on("keydown",function () {
    gameStarted = true;
    console.log("key pressed");
    $(".btn").bind("click" , function () {
          playSound($(this).attr("id"));
        }
    ); 
    game();
});



async function game () {
    $("#level-title").text("Level " + level);
    await compChoose();
    console.log("comp choose color");
    await playerChoose();
    console.log("player choose color");
    if (wrong === false) {
        console.log("continue");
        level++;
        setTimeout(() => {
            game();
        }, 1000);
    }
    else {
        console.log("game over");
        resetGame();
    }
}



function playSound (color) {
    audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}



function compChoose () {
    let color = rendomColor();
    sequance.push(color);
    playSound(color);
    $("#" + color).addClass("pressed");  //biuld fadeout css class
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 200);
}



async function playerChoose() {
    for (let i = 0 ; i < sequance.length; i++){
        const playerColorClicked = await new Promise(resolve => {
            $(".btn").one("click", function() {
                resolve($(this).attr("id"));
            });
        });
        if(playerColorClicked === sequance[i]){
            console.log("correct");
        } else {
            wrong = true;
            break;
        }
        console.log("player clicked");
        console.log(playerColorClicked);
    }  
}

function resetGame() {
    $("#level-title").text("Game Over, Press Any Key To Restert");
    level = 1;
    sequence.length = 0;
    gameStarted = false;
    wrong = false;
    $(document).on("keydown",function () {
        gameStarted = true;
        console.log("key pressed");
        $(".btn").bind("click" , function () {
            audio = new Audio("./sounds/" + $(this).attr("id") + ".mp3");
            audio.play();
            }
        ); 
        game();
    });
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $(".btn").off("click");
    $(document).on("keydown", function () {
        if (!gameStarted) {
            startGame();
        }
    });
}


function rendomColor(){
    switch (Math.floor(Math.random()*4 + 1)){
        case 1:
            return ("red");
        case 2:
            return ("blue");
        case 3:
            return ("yellow");
        case 4:
            return ("green");
    }
}
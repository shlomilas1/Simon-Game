var level = 1;

var sequence = [];

var gameStarted = false;
var wrong = false;



$(document).one("keydown",function () {
    gameStarted = true;
    $(".btn").on("click" , function () {
          playSound($(this).attr("id"));
        }
    ); 
    game();
});



async function game () {
    $("#level-title").text("Level " + level);
    compChoose();
    await playerChoose();
    if (!wrong) {
        level++;
        setTimeout(() => {  
            game();
        }, 1000);
    }
    else {
        playSound("wrong");
        resetGame();
    }
}



function playSound (color) {
    audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}



function compChoose () {
    let color = rendomColor();
    sequence.push(color);
    playSound(color);
    $("#" + color).addClass("comp-press");  
    setTimeout(() => {
        $("#" + color).removeClass("comp-press");
    }, 200);
}



async function playerChoose() {
    for (let i = 0 ; i < sequence.length; i++){
        const playerColorClicked = await new Promise(resolve => {
            $(".btn").one("click", function() {
                resolve($(this).attr("id"));
            });
        });
        $("#" + playerColorClicked).addClass("pressed");
            setTimeout(() => {
                    $("#" + playerColorClicked).removeClass("pressed");
                }, 200);
        if(playerColorClicked !== sequence[i]){
            wrong = true;
            break;
        }
    }  
}

function resetGame() {
    $("#level-title").text("Game Over, Press Any Key To Restart");
    level = 1;
    sequence.length = 0;
    gameStarted = false;
    wrong = false;
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $(".btn").off("click");
    $(document).one("keydown",function () {
        gameStarted = true;
        $(".btn").on("click" , function () {
            playSound($(this).attr("id"));
            }
        ); 
        setTimeout(() => {  
            game();
        }, 200);
    });
}


function rendomColor(){
    switch (Math.floor(Math.random()*4 + 1)){
        case 1:
            return "red";
        case 2:
            return "blue";
        case 3:
            return "yellow";
        case 4:
            return "green";
    }
}

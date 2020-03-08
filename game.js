var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstTime = 1;
var level = 0;
var numberOfClicks = 0;

function startOver() {
    level = 0;
    gamePattern = [];
    firstTime = 1;
    userClickedPattern = [];
    numberOfClicks = 0;
}

function check(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        numberOfClicks++;
        if(numberOfClicks == gamePattern.length) {
            numberOfClicks = 0;
            userClickedPattern = [];
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrongMusic = new Audio("sounds/wrong.mp3");
        wrongMusic.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var music = new Audio("sounds/" + name + ".mp3");
    music.play();
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}


$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    check(userClickedPattern.lastIndexOf(userChosenColor));
})

$(document).keypress(function () {
    if(firstTime == 1) {
        firstTime = 0;
        $("#level-title").text("Level 0");
        nextSequence();
    }
})


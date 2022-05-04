var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//Create a new variable called level and start at level 0.
var level = 0;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function () {
    if (!started) {
        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

//Remember that all the buttons share the same class (btn).
$(".btn").click(function () {

    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        $("body").addClass("game-over");
        // setTimeout(function(){
        //     $("body").addClass("game-over");
        // },1000); //ye ase nhi hoga kyunki this means ki ham game-over class ko 1000ms k bad add krre hain jbki what
        // // we need is ki game-over vali class 1000ms tk rhe. so we have to use remove class for 1000ms.

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level = level + 1;
    //Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    //100 or 5000 or 7000 is the time taken to removeClass("pressed") from the button clicked.

}

//1. Create a new function called startOver().
function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}
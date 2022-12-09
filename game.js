var buttonColors = ["red", "blue", "green", "yellow"];
var level = -1;//to indicate the current level of the game
var randomChosenColor;
var currIndex = 0;// to check answer while the player presses buttons
var gamePattern = []; // to store the pattern of the buttons pressed

// Fading code, Play music and flash
// $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
// var songName = "sounds/"+randomChosenColor+".mp3";
// playSound(songName);

// Adding event listeners to buttons which detect a press and play respective sound
for(var i=0;i<4;i++)
{
    $("."+buttonColors[i]).click(function(event){
        if(level!=-1)
        {
        songName = "sounds/"+event.target.id+".mp3";
        playSound(songName);
        animatePress(event.target.id);
        checkAnswer(event.target.id);
        }
    });
}

// Function to find next sequence increase the level and return the new random sequence
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    $("h1").text("Level "+level);
    level++;
    setTimeout(function(){
        animatePress(buttonColors[randomNumber]);  
    }, 350);
    return randomNumber;
}

// Function to play sound
function playSound(name){
    var audio = new Audio(name);
    audio.play();
}


//Animate the pressed button
function animatePress(currentColor){
    
    var self = $("."+currentColor);
    self.addClass("pressed");
    setTimeout(function(){
        self.removeClass("pressed");
    }, 150);
}
//
$("body").click(function(){
    if(level==-1)
    level++;

    else if(level===0)
    { 
        $("body").removeClass("game-over");
        randomNumber = nextSequence();
        gamePattern.push(buttonColors[randomNumber]); 
    }
})
// Function to check if the recent pressed button matches the required sequence
function checkAnswer(currColor)
{
    if(gamePattern[currIndex] == currColor)
        currIndex++;
    
    else
        startOver();

    if(gamePattern.length !=0 && currIndex === gamePattern.length)
    {
        currIndex = 0;
        randomNumber = nextSequence();
        gamePattern.push(buttonColors[randomNumber]);
    }
}

function startOver(){
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    $("h1").html("Game Over! <br><br> Press anywhere to Start");
    
    level = -1;
    currIndex = 0;
    gamePattern = [];

    console.log("game over");
}



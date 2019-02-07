var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;
//if we click on the start/reset button
document.getElementById("startreset").onclick =
    function () {
        //if we are playing
        if (playing == true) {

            location.reload(); //reload page
        } else { //if we are not playing 

            playing = true //change mode to playing

            score = 0; //set score to 0
            document.getElementById("scorevalue").innerHTML = score;
            show("timeremaining"); //show countdown box
            timeRemaining = 60;
            document.getElementById("timeremainingvalue").innerHTML = timeRemaining;

            //hide gameover box
            hide("gameOver");

            //change button to reset
            document.getElementById("startreset").innerHTML = "Reset Game";

            //reduce time by 1sec in loops

            startCountdown();

            //generate question and multiple answer

            generateQA();

        }
    }
//clicking on answer box
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        //check if we are playing
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                //correct answer

                //increase score by 1
                score++;

                document.getElementById("scorevalue").innerHTML = score;

                //hide and show correct
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);

                //generate new Q&A
                generateQA();
            } else {
                //hide and show wrong
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}


//functions
//start counter
function startCountdown() {
    action = setInterval(function () {
        timeRemaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        if (timeRemaining == 0) { //gameover
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>game over!</p><p>Your score is " + score + "</p><p>Play Again</p>";
            hide("timeremaining"); //hide remaining time box
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }

    }, 1000);
}
//stop counter
function stopCountdown() {
    clearInterval(action);
}
//hide element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}
//show element
function show(Id) {
    document.getElementById(Id).style.display = "block";
}
//generate function
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;

    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // fill one box with the correct answer

    var answers = [correctAnswer]; //arrays to check fill boxes with correct and wrong answers
    for (i = 1; i < 5; i++) { //forloop to start iteration
        if (i != correctPosition) { // if condition to check 
            var wrongAnswer;
            do { //generate wrong answers from product of 2 numbers
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); //wrong answer
            } while (answers.indexOf(wrongAnswer) > -1); //checking the array if correct answer is generated along with other wrong numbers of different values 

            document.getElementById("box" + i).innerHTML = wrongAnswer;

            answers.push(wrongAnswer); //push to fill wrong answers in other boxs
        }
    }

}

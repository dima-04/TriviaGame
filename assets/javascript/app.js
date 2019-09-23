var win = 0;
var lose = 0;
var unanswered = 0;
var timer = 30;
var timerInterval;
var questionNumber = 0;

var questions = [
    {
        choice3: "Ottawa",
        choice1: "Toronto",
        choice2: "Montreal",
        question: "What is the capital of Canada?",
        corectAnswer: "Ottawa"

    },
    {
        choice3: "London",
        choice1: "Manchester",
        choice2: "Liverpool",
        question: "What is the capital of The United Kingdom?",
        corectAnswer: "London"

    },
    {
        choice3: "Brussels",
        choice1: "Ostend",
        choice2: "Bruges",
        question: "What is the capital of Belgium?",
        corectAnswer: "Brussels"
    }
]

$(".choice").hover(handlerIn, handlerOut);
function handlerIn() {
    $(this).addClass("hover-style");
}
function handlerOut() {
    $(this).removeClass("hover-style");
}
$(".choice").click(function () {
    var selectedAnswer = $(this).text();
    if (questions[questionNumber].corectAnswer === selectedAnswer) {
        showResult("win");
    }
    else {
        showResult("lose");
    }
});
function tick() {
    timer--;
    $("#timeContainer").text(timer);
    if (timer === 0) {
        showResult("timeout");
    }
}
function showResult(result) {
    clearInterval(timerInterval);
    $("#questionContainer").hide();
    $("#resultContainer").show();
    $("correctAnswer").text(questions[questionNumber].corectAnswer);

    var cheerText;
    var gifSrc;

    if (result === "win") {
        cheerText = "Correct!";
        gifSrc = "assets/images/correct.gif";
        win++;
    }
    else if (result === "lose") {
        cheerText = "Nope!!";
        gifSrc = "assets/images/nope.gif";
        lose++;
    }
    else {
        cheerText = "Out of time!!!";
        gifSrc = "assets/images/timeout.gif";
        unanswered++;
    }

    $("#gif").attr("src", gifSrc);
    $("#cheerText").text(cheerText);

    questionNumber++;
    if (questionNumber === questions.length) {
        setTimeout(showFinalResult, 5000);
    }
    else {
        setTimeout(showQuestion, 5000);
    }

}
function showFinalResult() {
    $("#resultContainer").hide();
    $("#finalResultContainer").show();
    $("#correct").text(win);
    $("#incorrect").text(lose);
    $("#unansewered").text(unanswered);
}
function showQuestion() {
    $("#question").text(questions[questionNumber].question);
    $("#choice3").text(questions[questionNumber].choice3);
    $("#choice2").text(questions[questionNumber].choice2);
    $("#choice1").text(questions[questionNumber].choice1);
    $("#timeContainer").text(timer);
    $("#gameContainer").show();
    $("#questionContainer").show();
    $("#resultContainer").hide();

    timer = 30;
    timerInterval = setInterval(tick, 1000);
}
$("#getStart").on("click", function () {
    $("#finalResultContainer").hide();
    questionNumber = 0;
    win = 0;
    lose = 0;
    unanswered = 0;
    showQuestion();

})

$("#questionContainer").hide();
$("#gameContainer").hide();
$("#resultContainer").hide();
$("#finalResultContainer").hide();


$("#startButton").on("click", function () {
    $("#startContainer").hide();
    showQuestion();

});

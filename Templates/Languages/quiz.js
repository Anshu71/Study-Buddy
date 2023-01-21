// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        imgSrc : "{{url_for('static', filename='images/quiz/html.png')}}",
        choiceA : "HighText Machine Language",
        choiceB : "HyperText and links Markup Language",
        choiceC : "HyperText Markup Language",
        correct : "C"
    },{
        question : "What does CSS stand for?",
        imgSrc : "{{url_for('static', filename='images/quiz/css.png')}}",
        choiceA : "Cascade style sheets",
        choiceB : "Cascading style sheets",
        choiceC : "Color and style sheets",
        correct : "B"
    },{
        question : "What does JS stand for?",
        imgSrc : "{{url_for('static', filename='images/quiz/js.png')}}",
        choiceA : "java Scale",
        choiceB : "JavaScheme",
        choiceC : "JavaScript",
        correct : "C"
    },{
        question : "What is the full form of npm?",
        imgSrc : "{{url_for('static', filename='images/quiz/npm.jpg')}}",
        choiceA : "Node Package Manager",
        choiceB : "new project Manager", 
        choiceC : "Node Project Manager",
        correct : "A"
    },{
        question : "How many node objects methods are available?",
        imgSrc : "{{url_for('static', filename='images/quiz/node.jpg')}}",
        choiceA : "19",
        choiceB : "20",
        choiceC : "18",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "{{url_for('static', filename='images/quiz/5.png')}}" :
              (scorePerCent >= 60) ? "{{url_for('static', filename='images/quiz/4.png')}}" :
              (scorePerCent >= 40) ? "{{url_for('static', filename='images/quiz/3.png')}}" :
              (scorePerCent >= 20) ? "{{url_for('static', filename='images/quiz/2.png')}}" :
              "{{url_for('static', filename='images/quiz/1.png')}}";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















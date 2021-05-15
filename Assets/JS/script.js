// Creating a variable to select the timer div and set the start time count
let timeEl = document.getElementById("time");
let secondsLeft = 60;

// Creating a variable to select the main div to display questions or other content
let centerBoxEl = document.getElementById("center-box");

// Creating a variable for the View The Highscore button
let highscoreBtn = document.getElementById("view-highscores");

// Set score to zero at start
let userScore = 0

function renderStartPage() {
    let quizTitleEl = document.createElement("h1");
    quizTitleEl.textContent = "CODING QUIZ";
    centerBoxEl.appendChild(quizTitleEl);

    let quizBlurbEl = document.createElement("p");
    quizBlurbEl.innerHTML = "Test your coding knowledge! <br></br> Answer the questions in the alloted time and see what you score! Be careful -- wrong answers will cost you 10 seconds. <br></br> Good luck!";
    centerBoxEl.appendChild(quizBlurbEl);

    let startBtn = document.createElement("button");
    startBtn.textContent = "START QUIZ";
    startBtn.setAttribute("id", "start-btn")
    centerBoxEl.appendChild(startBtn);

    startBtn.addEventListener('click', function() {
        // Begin timer interval decrementation when start button clicked
        setTime();
        // Display the first question and answer choices
        renderQuestion();
    })
}
renderStartPage();

let timerInterval;

function setTime() {
    // Create a variable that is a function that decrements the time by 1/sec and displays on the page
        timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.innerHTML = "Time:" + secondsLeft + "s";

        if(secondsLeft === 0) {
            // Stops countdown of interval
            clearInterval(timerInterval);
            displayAllDone();
        }
    }, 1000);
};

// // Create an array of objects including questions and answers and the correct response
let allQuestions = [
    {
        questionNum: "1",
        question: "What tag is used to embed JavaScript in an HTML file?",
        choice1: "<style></style>",
        choice2: "<javascript></javascript>",
        choice3: "<script></script>",
        choice4: "<js></js>",
        correct: "choice-3"
    },
    {
        questionNum: "2",
        question: "What does CSS stand for?",
        choice1: "Cascading Style Sheets",
        choice2: "Collective Styling Service",
        choice3: "Collated Style Statements",
        choice4: "Clustered Style Sweep",
        correct: "choice-1"
    },
    {
        questionNum: "3",
        question: "Which is NOT a keyword for declaring a variable in JavaScript?",
        choice1: "const",
        choice2: "let",
        choice3: "var",
        choice4: "make",
        correct: "choice-4"
    },
    {
        questionNum: "4",
        question: "The CSS flex property is shorthand for the following...",
        choice1: "flex-max, flex-min, flex-standard",
        choice2: "flex-grow, flex-shrink, flex-basis",
        choice3: "flex-large, flex-small, flex-medium",
        choice4: "flex-up, flex-down, flex-sideways",
        correct: "choice-2"
    },
    {
        questionNum: "5",
        question: "Which of the following would print the index number of the last item in an array called Bunnies to the console?",
        choice1: "console.log(Bunnies.lastitem)",
        choice2: "console.log(Bunnies.length)",
        choice3: "console.log(Bunnies.lastindexnumber)",
        choice4: "console.log(Bunnies.length - 1)",
        correct: "choice-4"
    } 
]

// Set the starting question to the first question in the allQuestions array
let currQuestionIndex = 0

// Function to display the questions and answers from the array of questions/answers
function renderQuestion() {
    // Clear contents of Start page from main div
    removeAllChildElements();

    // Add and display the question
    let questionEl = document.createElement("h2");
    questionEl.textContent = allQuestions[currQuestionIndex].questionNum + ".  " + allQuestions[currQuestionIndex].question;
    centerBoxEl.appendChild(questionEl);
    
    // Add and display the question answers
    let ansChoicesEl = document.createElement("form");
    let divAns1 = document.createElement("div");
    let ansChoice1 = document.createElement("input");
    let ansChoice1Label = document.createElement("label");
    let divAns2 = document.createElement("div");
    let ansChoice2 = document.createElement("input");
    let ansChoice2Label = document.createElement("label");
    let divAns3 = document.createElement("div");
    let ansChoice3 = document.createElement("input");
    let ansChoice3Label = document.createElement("label");
    let divAns4 = document.createElement("div");
    let ansChoice4 = document.createElement("input");
    let ansChoice4Label = document.createElement("label");
    let ansSubmit = document.createElement("button");
    ansChoice1.setAttribute("type", "radio");
    ansChoice2.setAttribute("type", "radio");
    ansChoice3.setAttribute("type", "radio");
    ansChoice4.setAttribute("type", "radio");
    ansChoice1.setAttribute("id", "choice-1");
    ansChoice2.setAttribute("id", "choice-2");
    ansChoice3.setAttribute("id", "choice-3");
    ansChoice4.setAttribute("id", "choice-4");
    ansChoice1.setAttribute("value", "choice-1");
    ansChoice2.setAttribute("value", "choice-2");
    ansChoice3.setAttribute("value", "choice-3");
    ansChoice4.setAttribute("value", "choice-4");
    ansChoice1.setAttribute("name", "question");
    ansChoice2.setAttribute("name", "question");
    ansChoice3.setAttribute("name", "question");
    ansChoice4.setAttribute("name", "question");
    ansChoice1Label.textContent = allQuestions[currQuestionIndex].choice1;
    ansChoice2Label.textContent = allQuestions[currQuestionIndex].choice2;
    ansChoice3Label.textContent = allQuestions[currQuestionIndex].choice3;
    ansChoice4Label.textContent = allQuestions[currQuestionIndex].choice4;
    ansChoice1Label.setAttribute("for", "choice-1");
    ansChoice2Label.setAttribute("for", "choice-2");
    ansChoice3Label.setAttribute("for", "choice-3");
    ansChoice4Label.setAttribute("for", "choice-4");
    ansSubmit.setAttribute("type", "submit");
    ansSubmit.textContent = "SUBMIT";
    centerBoxEl.appendChild(ansChoicesEl);
    ansChoicesEl.appendChild(divAns1);
    divAns1.appendChild(ansChoice1);
    divAns1.appendChild(ansChoice1Label);
    ansChoicesEl.appendChild(divAns2);
    divAns2.appendChild(ansChoice2);
    divAns2.appendChild(ansChoice2Label);
    ansChoicesEl.appendChild(divAns3);
    divAns3.appendChild(ansChoice3);
    divAns3.appendChild(ansChoice3Label);
    ansChoicesEl.appendChild(divAns4);
    divAns4.appendChild(ansChoice4);
    divAns4.appendChild(ansChoice4Label);
    ansChoicesEl.appendChild(ansSubmit);
    
    // Creating a function to check if an answer is chosen, display either correct or wrong and
    // add decrement extra time for wrong answers and increase score by 20pts for correct answers
    // and move on to next question or end of quiz
    function checkUserAnswer () {

        // When the question form is submitted...
        ansChoicesEl.addEventListener("submit", function(event) {
            if (!document.querySelector("input:checked")) {
                ansChoice1.required = true;
                ansChoice2.required = true;
                ansChoice3.required = true;
                ansChoice4.required = true;
                let errorMsg = document.createElement("div");
                errorMsg.setAttribute("id", "error-msg");
                errorMsg.textContent = "Please select an answer."
                centerBoxEl.appendChild(errorMsg);
            }
            // Prevent the default behavior...
            event.preventDefault();

            // and pull the user's selection...
            let userAnswer = document.querySelector("input:checked").value;

            // if the user's selection matches the correct answer, display a 'Correct!' message and increase the score by 20pts
            // if (userAnswer)
            if (userAnswer === allQuestions[currQuestionIndex].correct) {
                    renderCorrectMsg();
                    userScore = userScore + 20;                
            }   // but if the user's selection doesn't match the correct answer, display a 'Wrong!' message and decrement the timer by 5sec
                else {
                    renderWrongMsg();
                    secondsLeft = secondsLeft - 10;
                }

            // After 1 second....
            setTimeout(function() {
                // Render the next question if all the questions haven't been asked...
                if(currQuestionIndex < allQuestions.length - 1) {
                    currQuestionIndex++;
                    renderQuestion();
                }   // but render the "All Done" page if all questions have been asked/answered.
                    else {
                    displayAllDone();
                }   
            }, 1000);
    })
    };

    // Call the function to check the user's answers and render the next question or quiz end
    checkUserAnswer();
}

// Creates the message to display when correct answers are submitted
function renderCorrectMsg() {
    let correctMsg = document.createElement("div");
    correctMsg.setAttribute("id", "correct");
    correctMsg.textContent = "Correct!";
    centerBoxEl.appendChild(correctMsg);
}

// Creates the message to display when wrong answers are submitted
function renderWrongMsg() {
    let wrongMsg = document.createElement("div");
    wrongMsg.setAttribute("id", "wrong");
    wrongMsg.textContent = "Wrong!";
    centerBoxEl.appendChild(wrongMsg);
}

// Function to empty the contents of the main div such that the next question or other content can render in the div
function removeAllChildElements () {
    while(centerBoxEl.firstChild) {
        centerBoxEl.firstChild.remove();
    }
}

// let lastHighscore = localStorage.getItem("user-score");
// let lastInitials = localStorage.getItem("user-initials");
let usersArray = [];
let scoresArray = [];

// Function to display an 'All Done' page when all questions are answered or the time is out
function displayAllDone() {

    // Clear the main div of question contents
    removeAllChildElements();

    timeEl.setAttribute("style", "display: none");
    clearInterval(timerInterval);

    // Creating the ALL DONE title 
    let allDoneEl = document.createElement("h2");
    allDoneEl.setAttribute("id", "all-done");
    allDoneEl.textContent = "ALL DONE";
    centerBoxEl.appendChild(allDoneEl);

    // Creating a paragraph element to display the user score
    let yourScoreEl = document.createElement("p");
    yourScoreEl.setAttribute("id", "your-score-is");
    // localStorage.setItem("user-score", userScore);
    yourScoreEl.textContent = "Your score is: " + userScore;
    centerBoxEl.appendChild(yourScoreEl);

    // Creating the Initials input field and submit button and adding to page
    let formEl = document.createElement("form");
    let initialsDiv = document.createElement("div");
    let labelEl = document.createElement("label");
    let initialsEl = document.createElement("input");
    let submitEl = document.createElement("button");
    labelEl.setAttribute("for", "initials");
    labelEl.setAttribute("id", "initials-label");
    labelEl.textContent = "Enter initials: ";
    initialsEl.setAttribute("type", "text");
    initialsEl.setAttribute("id", "initials");
    initialsEl.setAttribute("maxlength", 10);
    initialsEl.setAttribute("placeholder", "Your Initials");
    initialsEl.required = true;
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "submit-initials");
    initialsDiv.setAttribute("id", "initials-div");
    submitEl.textContent = "SUBMIT";
    centerBoxEl.appendChild(formEl);
    formEl.appendChild(initialsDiv);
    initialsDiv.appendChild(labelEl);
    initialsDiv.appendChild(initialsEl);
    formEl.appendChild(submitEl); 
    
    // ****ADD A FUNCTION/LOCAL STORAGE OF INITIALS INPUT
    // TO RENDER ON THE HIGHSCORES PAGE'

    formEl.addEventListener("submit", function(event) {
        event.preventDefault;
        let userInitials = document.querySelector("input").value.trim();
        usersArray.push(userInitials);
        scoresArray.push(userScore);
        storeScores();
        storeUsers();
        renderHighscoresPage();
    });
    
}

function storeUsers() {
    localStorage.setItem("user-initials", JSON.stringify(usersArray));
}

function storeScores() {
    localStorage.setItem("user-scores", JSON.stringify(scoresArray));
}

function renderScores() {
    // Add and display highscores list
    let highscoresListEl = document.createElement("ul");
    centerBoxEl.appendChild(highscoresListEl);

    // Render the highscores
    for(i = 0; i < usersArray.length; i++) {
        let highscoresListItemEl = document.createElement("li");
        highscoresListItemEl.textContent = usersArray[i] + ":  " + scoresArray[i];
        highscoresListItemEl.setAttribute("data-index", i);
        highscoresListEl.appendChild(highscoresListItemEl);
        };
}

function renderHighscoresPage() {
    // Clear main div of previous contents
    removeAllChildElements();

    // Add and display highscores title
    let highscoresTitleEl = document.createElement("h2");
    highscoresTitleEl.textContent = "RECENT SCORES";
    highscoresTitleEl.setAttribute("id", "highscores-title");
    centerBoxEl.appendChild(highscoresTitleEl);

    renderScores();
    
    let optionsDiv = document.createElement("options-div");
    optionsDiv.setAttribute("id", "options-div");
    let returnToStartBtn = document.createElement("button");
    returnToStartBtn.setAttribute("id", "return-start");
    returnToStartBtn.textContent = "Return to Start";
    centerBoxEl.appendChild(optionsDiv);
    optionsDiv.appendChild(returnToStartBtn);
    returnToStartBtn.addEventListener('click', function() {
        location.reload();
    })
    
    // Add and display a button to clear the high scores with event listener
    let clearHighscoresBtn = document.createElement("button");
    clearHighscoresBtn.setAttribute("id", "clear-highscores");
    clearHighscoresBtn.textContent = "Clear Scores";
    optionsDiv.appendChild(clearHighscoresBtn);
    clearHighscoresBtn.addEventListener('click', function() {
        // while(highscoresListEl.firstChild) {
        //     highscoresListEl.firstChild.remove();
        // }
        localStorage.clear();
        removeAllChildElements();
        let highscoresTitleEl = document.createElement("h2");
        highscoresTitleEl.setAttribute("id", "highscores-title-cleared")
        highscoresTitleEl.textContent = "RECENT SCORES";
        centerBoxEl.appendChild(highscoresTitleEl);

        let emptyHighscores = document.createElement("p");
        emptyHighscores.setAttribute("id", "empty-highscores");
        centerBoxEl.appendChild(emptyHighscores);
        // returnToStart();

        let returnToStartBtn = document.createElement("button");
        returnToStartBtn.textContent = "Return to Start";
        returnToStartBtn.setAttribute("id", "return-start-cleared");
        centerBoxEl.appendChild(returnToStartBtn);
        returnToStartBtn.addEventListener('click', function() {
        location.reload();
    })

    })
}

// function returnToStart () {
//     // Add and display a button to return to start with event listener
//     let returnToStartBtn = document.createElement("button");
//     returnToStartBtn.textContent = "Return to Start";
//     centerBoxEl.appendChild(returnToStartBtn);
//     returnToStartBtn.addEventListener('click', function() {
//         location.reload();
//     })
// }

// Making View Highscores button display the highscores list
highscoreBtn.addEventListener('click', renderHighscoresPage);

function init() {
    let storedUsers = JSON.parse(localStorage.getItem("user-initials"));
    let storedScores = JSON.parse(localStorage.getItem("user-scores"));
    if(storedUsers !== null) {
        usersArray = storedUsers;
    }
    if(storedScores !== null) {
        scoresArray = storedScores;
    }
    // renderScores();
    console.log(usersArray);
    console.log(scoresArray);
}

init();
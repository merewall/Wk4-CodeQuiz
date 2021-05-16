// Creating a variable for the timer div and set the start time count
let timeEl = document.getElementById("time");
let secondsLeft = 60;

// Creating a variable to select the center-box div where questions and other content with be dynamically displayed
let centerBoxEl = document.getElementById("center-box");

// Creating a variable for View Scores button in the header
let highscoreBtn = document.getElementById("view-highscores");

// Setting score to zero at start
let userScore = 0;

// Setting correct answer count to zero at start
let numOfCorrect = 0;

// Creating a variable for the timer such that the interval can be cleared when all questions are answered or time is 0
let timerInterval;

// Creating a function for the Start Page to display
function renderStartPage() {
    // Adding a title for the quiz in the center box
    let quizTitleEl = document.createElement("h1");
    quizTitleEl.textContent = "CODING QUIZ";
    centerBoxEl.appendChild(quizTitleEl);
    
    // Adding quiz introduction to display on page
    let quizBlurbEl = document.createElement("p");
    quizBlurbEl.innerHTML = "Test your coding knowledge! <br></br> Answer the questions in the alloted time and see what you score! Be careful -- wrong answers will cost you 10 seconds. <br></br> Good luck!";
    centerBoxEl.appendChild(quizBlurbEl);

    // Adding a start button to begin the quiz
    let startBtn = document.createElement("button");
    startBtn.textContent = "START QUIZ";
    startBtn.setAttribute("id", "start-btn")
    centerBoxEl.appendChild(startBtn);

    // Making the start button render the first question and start the timer
    startBtn.addEventListener('click', function() {
        // Begin timer interval decrementation when start button clicked
        setTime();
        // Display the first question and answer choices
        renderQuestion();
    })
}

// Rendering the Start Page on page open
renderStartPage();

// Creating a function to set a decrementing timer for the game and display on page
function setTime() {
    // Creating a function as a variable that decrements the time and displays the countdown on the page
    timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.innerHTML = "Time: " + secondsLeft + " seconds";
        
        // When the time is 0, clear the timer countdown and display the ALL DONE page
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            displayAllDone();
        }
    // Setting timer decrement by 1 every second (i.e. counts down by 1 sec) 
    }, 1000);
};

// Create an array of objects for the quiz questions and their answers and the correct responses for each
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

// Setting the starting question to the first object (i.e. first question and set of answers) in the allQuestions array
let currQuestionIndex = 0

// Creating a function to display the questions and answers from the allQuestions array
function renderQuestion() {
    // Clearing contents of Start page from main div
    removeAllChildElements();

    // Adding and displaying the question
    let questionEl = document.createElement("h2");
    questionEl.textContent = allQuestions[currQuestionIndex].questionNum + ".  " + allQuestions[currQuestionIndex].question;
    centerBoxEl.appendChild(questionEl);
    
    // Adding and displaying the question answers 
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
    ansChoice1Label.setAttribute("id", "choice-1");
    ansChoice2Label.setAttribute("id", "choice-2");
    ansChoice3Label.setAttribute("id", "choice-3");
    ansChoice4Label.setAttribute("id", "choice-4");
    ansChoice1.setAttribute("id", "choice-1-radio");
    ansChoice2.setAttribute("id", "choice-2-radio");
    ansChoice3.setAttribute("id", "choice-3-radio");
    ansChoice4.setAttribute("id", "choice-4-radio");
    ansChoice1.setAttribute("value", "choice-1");
    ansChoice2.setAttribute("value", "choice-2");
    ansChoice3.setAttribute("value", "choice-3");
    ansChoice4.setAttribute("value", "choice-4");
    ansChoice1.setAttribute("name", "question");
    ansChoice2.setAttribute("name", "question");
    ansChoice3.setAttribute("name", "question");
    ansChoice4.setAttribute("name", "question");
    // The answer choices are generated from the allQuestions array, based on the current index of a for loop executed in the checkUserAnswer function below
    ansChoice1Label.textContent = allQuestions[currQuestionIndex].choice1;
    ansChoice2Label.textContent = allQuestions[currQuestionIndex].choice2;
    ansChoice3Label.textContent = allQuestions[currQuestionIndex].choice3;
    ansChoice4Label.textContent = allQuestions[currQuestionIndex].choice4;
    ansChoice1Label.setAttribute("for", "choice-1-radio");
    ansChoice2Label.setAttribute("for", "choice-2-radio");
    ansChoice3Label.setAttribute("for", "choice-3-radio");
    ansChoice4Label.setAttribute("for", "choice-4-radio");
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
    
    // Creating a function to check if an answer is chosen, displaying either correct or wrong messages and
    // decrementing extra time for wrong answers or increasing the score by 20pts for correct answers
    // and dynamically displaying the next question or end of quiz
    function checkUserAnswer () {

        // When the question form is submitted...
        ansChoicesEl.addEventListener("submit", function(event) {
            // ...generate a message if the user didn't select an answer...
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
            // ... and prevent the default behavior of a form submission...
            event.preventDefault();

            // ...and pull the user's selection...
            let userAnswer = document.querySelector("input:checked").value;

            // ...if the user's selection matches the correct answer, display a 'Correct!' message, increase the score by 20pts
            // and increase the count of the number of correct answers by 1
            if (userAnswer === allQuestions[currQuestionIndex].correct) {
                    renderCorrectMsg();
                    userScore = userScore + 20;
                    numOfCorrect++;                
            }   // but if the user's selection doesn't match the correct answer, display a 'Wrong!' message and decrement the timer by 10sec
                else {
                    renderWrongMsg();
                    secondsLeft = secondsLeft - 10;
                    // change style of user answer to italics and darkpeach
                    let selectUserAns = document.getElementById(userAnswer);
                    selectUserAns.setAttribute("style", "font-style: italic; color: var(--darkpeach); font-weight: bolder;");
                    //  and show correct answer in italics and bold
                    let correctValue = allQuestions[currQuestionIndex].correct;
                    let selectCorrectAns = document.getElementById(correctValue);
                    selectCorrectAns.setAttribute("style", "font-style: italic; font-weight: bolder;");
                }

            // Give the correct/wrong message 1 second time to display and then....
            setTimeout(function() {
                // Render the next question if all the questions haven't been asked...
                // by incrementing the current question index by 1 and pulling that index from the allQuestions array if any more are available
                if(currQuestionIndex < allQuestions.length - 1) {
                    currQuestionIndex++;
                    renderQuestion();
                }   // but render the "All Done" page if all questions have been asked/answered.
                    else {
                    displayAllDone();
                }   
            }, 1500);
    })
    };

    // Calling the function to check the user's answers and render the next question or quiz end
    checkUserAnswer();
}

// Creating a message to display when correct answers are submitted
function renderCorrectMsg() {
    let correctMsg = document.createElement("div");
    correctMsg.setAttribute("id", "correct");
    correctMsg.textContent = "Correct!";
    centerBoxEl.appendChild(correctMsg);
}

// Creating a message to display when wrong answers are submitted
function renderWrongMsg() {
    let wrongMsg = document.createElement("div");
    wrongMsg.setAttribute("id", "wrong");
    wrongMsg.textContent = "Wrong!";
    centerBoxEl.appendChild(wrongMsg);
}

// Creating a function to empty the contents of the main div such that the next question or other content can render in the div
function removeAllChildElements () {
    while(centerBoxEl.firstChild) {
        centerBoxEl.firstChild.remove();
    }
}

// Creating empty arrays for which to push the user's initials and user's score into upon quiz completion
// to allow storing them to local storage and displaying on the RECENT SCORES page
let usersArray = [];
let scoresArray = [];

// Creating a function to display an 'All Done' page when all questions are answered or the time is out
function displayAllDone() {

    // Clearing the center-box div of question contents
    removeAllChildElements();

    // Clearing the timer if all questions were answered and time was left and hide the time display
    timeEl.setAttribute("style", "display: none");
    clearInterval(timerInterval);

    // Creating the ALL DONE title 
    let allDoneEl = document.createElement("h2");
    allDoneEl.setAttribute("id", "all-done");
    allDoneEl.textContent = "ALL DONE";
    centerBoxEl.appendChild(allDoneEl);

    // Creating a paragraph element to display the user score and the number of correct answers
    let yourScoreEl = document.createElement("p");
    yourScoreEl.setAttribute("id", "your-score-is");
    yourScoreEl.innerHTML = "You answered " + numOfCorrect + " out of " + allQuestions.length + " questions correctly. <br></br> Your score is: " + userScore;
    centerBoxEl.appendChild(yourScoreEl);

    // Creating the Initials input field and submit button and displaying to page
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
    // Setting max length of initials input
    initialsEl.setAttribute("maxlength", 10);
    initialsEl.setAttribute("placeholder", "Your Initials");
    // Requiring an input in the input field to throw a message if user's try to submit without inputting initials
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
    
    // When the submit button is clicked for submitting the user's initials...
    formEl.addEventListener("submit", function(event) {
        // ...prevent the default behavior for submitting a form...
        event.preventDefault;
        // ...pull the user's input and trim any white space
        let userInitials = document.querySelector("input").value.trim();
        // ...push the user's initials and their score into the respective arrays
        usersArray.push(userInitials);
        scoresArray.push(userScore);
        // ...run the functions to store the user's score and initials to local storage
        storeScores();
        storeUsers();
        // ...then render the page that displays scores
        renderHighscoresPage();
    });
    
}

// Creating the function that stores the array of user's initials to local storage
function storeUsers() {
    localStorage.setItem("user-initials", JSON.stringify(usersArray));
}

// Creating the function that stores the array of user's scores to local storage
function storeScores() {
    localStorage.setItem("user-scores", JSON.stringify(scoresArray));
}

// Creating a function to render the user's score (and past scores) on the page
function renderScores() {
    // Adding a place to display scores list on page
    let highscoresListEl = document.createElement("ul");
    centerBoxEl.appendChild(highscoresListEl);

    // Creating a list item for each user in the user's array, 
    // and displaying each user's initials and their score on the page
    for(i = 0; i < usersArray.length; i++) {
        let highscoresListItemEl = document.createElement("li");
        highscoresListItemEl.textContent = usersArray[i] + ":  " + scoresArray[i];
        highscoresListItemEl.setAttribute("data-index", i);
        highscoresListEl.appendChild(highscoresListItemEl);
        };
}

// Creating a function to display the Scores page...
function renderHighscoresPage() {
    // Clearing center-box of previous contents
    removeAllChildElements();

    // Adding and displaying scores title
    let highscoresTitleEl = document.createElement("h2");
    highscoresTitleEl.textContent = "RECENT SCORES";
    highscoresTitleEl.setAttribute("id", "highscores-title");
    centerBoxEl.appendChild(highscoresTitleEl);

    // Rendering all stored scores, if any, and current user's score
    renderScores();
    
    // Adding a start button to the page
    // which is contained in a div such that it can flex to display in a row with the clear scores button
    let optionsDiv = document.createElement("options-div");
    optionsDiv.setAttribute("id", "options-div");
    let returnToStartBtn = document.createElement("button");
    returnToStartBtn.setAttribute("id", "return-start");
    returnToStartBtn.textContent = "Return to Start";
    centerBoxEl.appendChild(optionsDiv);
    optionsDiv.appendChild(returnToStartBtn);

    // When the return to start button is click, reload quiz to start
    returnToStartBtn.addEventListener('click', function() {
        location.reload();
    })
    
    // Adding and displaying a button to clear the scores list 
    let clearHighscoresBtn = document.createElement("button");
    clearHighscoresBtn.setAttribute("id", "clear-highscores");
    clearHighscoresBtn.textContent = "Clear Scores";
    optionsDiv.appendChild(clearHighscoresBtn);
    // When the button is clicked...
    clearHighscoresBtn.addEventListener('click', function() {
        // ...clear the locally stored user initials and scores
        localStorage.clear();
        // ...and remove all names/scores listed on page
        removeAllChildElements();
        // ...re-render the page title, empty scores box, and return to start button
        let highscoresTitleEl = document.createElement("h2");
        highscoresTitleEl.setAttribute("id", "highscores-title-cleared")
        highscoresTitleEl.textContent = "RECENT SCORES";
        centerBoxEl.appendChild(highscoresTitleEl);
        let emptyHighscores = document.createElement("p");
        emptyHighscores.setAttribute("id", "empty-highscores");
        centerBoxEl.appendChild(emptyHighscores);
        let returnToStartBtn = document.createElement("button");
        returnToStartBtn.textContent = "Return to Start";
        returnToStartBtn.setAttribute("id", "return-start-cleared");
        centerBoxEl.appendChild(returnToStartBtn);
        returnToStartBtn.addEventListener('click', function() {
        location.reload();
    })

    })
}

// When the View Scores button is clicked, it renders the scores page
highscoreBtn.addEventListener('click', renderHighscoresPage);

// Creatiing a function for pulling stored contents when the page loads...
function init() {
    // ...grab the locally stored user initials and scores and convert to arrays
    let storedUsers = JSON.parse(localStorage.getItem("user-initials"));
    let storedScores = JSON.parse(localStorage.getItem("user-scores"));
    // If the array of stored users and stored scores have items, replace the default empty array with the stored ones
    if(storedUsers !== null) {
        usersArray = storedUsers;
    }
    if(storedScores !== null) {
        scoresArray = storedScores;
    }
}

// Calling the function to pull locally stored content...
init();
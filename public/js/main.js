import TRANSLATIONS from './languagePicker.js'; 

// INITIAL SETUP
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(SplitText)
    // gsap code here!
});

let currentQuestion = { id: "", category: "", es: "", en: "", pt: "", fr: "", de: "", author: "" };
let questions = [];
let questionsCount = 0
let questionsAsked = [];
let questionsAskedCount = 0;
let gameStarted = false;

nextQuestionButton.onclick = selectNextQuestion
shareButton.onclick = shareButtonPressed
const selectedLanguage = document.getElementById('lang');
const tooltip = document.getElementById("myTooltip");

selectedLanguage.onchange = (e) => {
    changeLanguage(e.target.value)
}

function changeLanguage(language) {
    handleNextButton()
    setupTooltip()

    if (currentQuestion.id != "") {
        changeQuestion(currentQuestion)
    }
}

// Main Game Functionality
setTimeout(() => { getQuestions() }, 0);
setupGame()

function setupGame() {
    questionTextSpan.innerText = "Let's talk about aliens..."
    tooltip.hidden = true;
    handleNextButton()
    handleGsapAnimation()
    setupTooltip()
}

function getQuestions() {
    if (questionsCount > 0) {
        // Do not request more questions. Change to a different question
        selectNextQuestion()

    } else {
        // const request = new Request("https://sfge2zkyh3.execute-api.us-east-1.amazonaws.com/PreguntasFunc", {
        //     method: "GET"
        // });
        const request = new Request("../resources/preguntas_mock.json", {
            method: "GET"
        });

        fetch(request)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong on the server!");
                }
            })
            .then((response) => {
                handleGameStart(response);
            })
            .catch((error) => {
                console.error(error);
                handleErrorMessage()
            });
    }
}

function handleGameStart(response) {
    questions = response.questions
    questionsCount = questions.length
    questionsCounterLabel.innerText = "0/" + questionsCount
    questionsCounterDiv.hidden = false;
    handleNextButton();

    if (questionsCount == 0) {
        handleErrorMessage()
    }
}

function handleNextButton() {
    if (!gameStarted && questionsCount == 0) {
        nextQuestionButton.innerText = TRANSLATIONS[selectedLanguage.value].loading
        nextQuestionButton.disabled = true
        return
    } else {
        nextQuestionButton.innerText = gameStarted ? TRANSLATIONS[selectedLanguage.value].primary : TRANSLATIONS[selectedLanguage.value].start
        nextQuestionButton.disabled = false
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function handleErrorMessage() {
    alert(TRANSLATIONS[selectedLanguage.value].error);
}

function handleGameOver() {
    nextQuestionButton.disabled = true
    nextQuestionButton.innerText = TRANSLATIONS[selectedLanguage.value].gameOver
}

function selectNextQuestion() {
    if (questionsCount == 0) {
        handleErrorMessage()
        return
    }

    if (questions.length == 0) {
        handleGameOver()
        return
    }

    let randonQuestionItem = randomIntFromInterval(0, questions.length - 1);

    currentQuestion = questions[randonQuestionItem]

    questionsAsked.push(currentQuestion)

    questions = questions.filter((element) => element.id != currentQuestion.id)

    changeQuestion(currentQuestion)

    gameStarted = true;
    shareButton.hidden = false;

    if (questionsAskedCount < questionsCount) {
        questionsAskedCount += 1
        questionsCounterLabel.innerText = questionsAskedCount + "/" + questionsCount
    }

    handleNextButton()
    setupTooltip()
}

function changeQuestion(question) {
    var questionString = ""

    switch (selectedLanguage.value) {
        case "en":
            questionString = question.en
            break;
        case "es":
            questionString = question.es
            break;
        case "fr":
            questionString = question.fr
            break;
        case "de":
            questionString = question.de
            break;
        case "it":
            questionString = question.it
            break;
        case "pt":
            questionString = question.pt
            break;
        default:
            questionString = question.en
            break;
    }

    questionTextSpan.innerText = questionString
    handleGsapAnimation()
}

// GSAP Animation
function handleGsapAnimation() {
    gsap.set("h1", { opacity: 1 });

    let split = SplitText.create(".questionTextSpan", {
        type: "words, chars",
        mask: "words",
        linesClass: "line++",
        autoSplit: true,
    });

    let randomXY = randomIntFromInterval(-100, 100)

    gsap.from(split.chars, {
        y: randomXY,
        x: randomXY,
        autoAlpha: 0,
        stagger: 0.05
    });
}

// Tooltip (Share button functionality)
function shareButtonPressed() {
    var copiedText = questionTextSpan.innerText
    navigator.clipboard.writeText(copiedText);
    displayTooltipMessage();
}

function setupTooltip() {
    tooltip.hidden = gameStarted ? false : true;
    shareButton.hidden = gameStarted ? false : true;
    tooltip.innerHTML = TRANSLATIONS[selectedLanguage.value].tooltip;
}

function displayTooltipMessage() {
    tooltip.innerHTML = TRANSLATIONS[selectedLanguage.value].copiedTooltip

    setTimeout(function () {
        tooltip.hidden = true
    }, 1000)

    setTimeout(function () {
        tooltip.hidden = false
        setupTooltip()
    }, 2000)
}
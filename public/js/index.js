handleNextQuestion("Let's talk about aliens...")
nextQuestionButton.innerText = "Start Game!"

var questions = [];
var language = "english"

function changeLanguage(language) {
    console.log(language.lang)
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectNextQuestion() {
    let randonQuestionItem = randomIntFromInterval(1, questions.length);
    
    console.log(document.getElementById("language-picker-select").value)
    var language = document.getElementById("language-picker-select").value
 
    switch (language) {
        case "en":
            handleNextQuestion(questions[randonQuestionItem].en)
            break;
        case "es":
            handleNextQuestion(questions[randonQuestionItem].es)
            break;
        case "fr":
            handleNextQuestion(questions[randonQuestionItem].fr)
            break;
        case "de":
            handleNextQuestion(questions[randonQuestionItem].de)
            break;
        default:
            handleNextQuestion(questions[randonQuestionItem].en)
            break;
    }
}

function getQuestions() {

    if (questions.length > 0) {
        // Do not request more questions
        // Change to a different question
        selectNextQuestion()

    } else {
        const request = new Request("https://sfge2zkyh3.execute-api.us-east-1.amazonaws.com/PreguntasFunc", {
            method: "GET"
        });

        fetch(request)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong on API server!");
                }
            })
            .then((response) => {
                console.log("response", response)
                questions = response.questions
                nextQuestionButton.innerText = "Next";
                selectNextQuestion()

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function handleNextQuestion(nextQuestion) {
    questionTextSpan.innerText = nextQuestion

    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml6 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.ml6 .letter',
            translateY: ["1.1em", 0],
            translateZ: 0,
            duration: 1000,
            delay: (el, i) => 50 * i
        }).add({
            targets: '.ml6',
            opacity: 0,
            duration: 10000000000,
            easing: "easeOutExpo",
            delay: 10000000000
        });
}
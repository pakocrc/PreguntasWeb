const Languages = Object.freeze({
    en: "english",
    es: "spanish",
    pt: "portugues",
    de: "deutsch",
    fr: "francais",
    it: "italiano"
});

const ErrorMessages = Object.freeze({
    en: "There are no questions available. Please reload the page and try again.",
    es: "No hay preguntas disponibles. Por favor recarga la página y vuelve a intentarlo.",
    pt: "Não há questões disponíveis. Por favor recarregue a página e tente novamente.",
    de: "Ninchts der Fragen sind verfügbar. Bitte lade die Seite neu und versuche es erneut.",
    fr: "Il n'y a pas de questions disponibles. Veuillez rafraichir la page et essayer de nouveau.",
    it: "Non ci sono domande disponibili. Per favore ricarica la pagina e riprova.",
});

let currentQuestion = { id: "", category: "", es: "", en: "", pt: "", fr: "", de: "", author: "" };
let questions = [];
let userLanguage = Languages.en;

getQuestions()
setupGame()

function setupGame() {
    questionTextSpan.innerText = "Let's talk about aliens..."
    handleButton("Loading questions...", true)
    handleAnimation()
}

function getQuestions() {
    if (questions.length > 0) {
        // Do not request more questions. Change to a different question
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
                // console.log("response: ", response)
                questions = response.questions
                handleButton("Play Game 😉", false)
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function handleButton(title, disabled) {
    nextQuestionButton.innerText = title
    nextQuestionButton.disabled = disabled
}

function changeLanguage(language) {
    switch (language.lang) {
        case "en":
            userLanguage = Languages.en
            break;
        case "es":
            userLanguage = Languages.es
            break;
        case "fr":
            userLanguage = Languages.fr
            break;
        case "de":
            userLanguage = Languages.de
            break;
        case "pt":
            userLanguage = Languages.pt
            break;
        case "it":
            userLanguage = Languages.it
            break;
        default:
            userLanguage = Languages.en
            break;
    }

    // console.log(userLanguage)
    if (currentQuestion.id != "") {
        changeQuestion(currentQuestion)
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function handleErrorMessage() {
    switch (userLanguage) {
        case Languages.en:
            alert(ErrorMessages.en)
            break;
        case Languages.es:
            alert(ErrorMessages.es)
            break;
        case Languages.fr:
            alert(ErrorMessages.fr)
            break;
        case Languages.de:
            alert(ErrorMessages.de)
            break;
        case Languages.pt:
            alert(ErrorMessages.pt)
            break;
        default:
            alert(ErrorMessages.en)
            break;
    }
}

function selectNextQuestion() {
    if (questions.length == 0) {
        handleErrorMessage()
        return
    }

    nextQuestionButton.innerText = "Next Question";

    let randonQuestionItem = randomIntFromInterval(1, questions.length);
    currentQuestion = questions[randonQuestionItem]
    changeQuestion(currentQuestion)
}

function changeQuestion(question) {
    var questionString = ""

    switch (userLanguage) {
        case Languages.en:
            questionString = question.en
            break;
        case Languages.es:
            questionString = question.es
            break;
        case Languages.fr:
            questionString = question.fr
            break;
        case Languages.de:
            questionString = question.de
            break;
        case Languages.it:
            questionString = question.it
            break;
        case Languages.pt:
            questionString = question.pt
            break;
        default:
            questionString = question.en
            break;
    }

    questionTextSpan.innerText = questionString
    handleAnimation()
}

function handleAnimation() {
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
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(SplitText) 
  // gsap code here!
 });

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
let questionsCount = 0
let questionsAsked = [];
let questionsAskedCount = 0;
let userLanguage = Languages.en;
let gameStarted = false;

getQuestions()
setupGame()

nextQuestionButton.onclick = selectNextQuestion

function setupGame() {
    questionTextSpan.innerText = "Let's talk about aliens..."
    handleNextButton("Loading questions... ⏱️", true)
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
                    throw new Error("Something went wrong on API server!");
                }
            })
            .then((response) => {
                // console.log("response: ", response)
                questions = response.questions
                handleNextButton("Start Game! 🚀", false)
                questionsCount = questions.length
                questionsCounterLabel.innerText = "0/" + questionsCount
                questionsCounterDiv.hidden = false;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function handleNextButton(title, disabled) {
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

    changeNextButtonText()
    setupTooltip()

    if (currentQuestion.id != "") {
        changeQuestion(currentQuestion)
    }
}

function changeNextButtonText() {
    switch (userLanguage) {
        case Languages.en:
            nextQuestionButton.innerText = gameStarted ? "Next Question 🎲" : "Start Game! 🚀"
            break;
        case Languages.es:
            nextQuestionButton.innerText = gameStarted ? "Siguiente Pregunta 🎲" : "¡Iniciar Juego! 🚀"
            break;
        case Languages.fr:
            nextQuestionButton.innerText = gameStarted ? "Question suivante 🎲" : "Lancer le jeu! 🚀"
            break;
        case Languages.de:
            nextQuestionButton.innerText = gameStarted ? "Naechste Frage 🎲" : "Starte das Spiel! 🚀"
            break;
        case Languages.pt:
            nextQuestionButton.innerText = gameStarted ? "Proxima Pergunta 🎲" : "Iniciar o jogo! 🚀"
            break;
        case Languages.it:
            nextQuestionButton.innerText = gameStarted ? "Domanda successiva 🎲" : "Inizia il gioco! 🚀"
            break;
        default:
            nextQuestionButton.innerText = gameStarted ? "Next Question 🎲" : "Start Game! 🚀"
            break;
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

function handleGameOver() {
    nextQuestionButton.disabled = true
    
    switch (userLanguage) {
        case Languages.en:
            nextQuestionButton.innerText = "Game Over! 🎉"
            break;
        case Languages.es:
            nextQuestionButton.innerText = "¡Fin del Juego! 🎉"
            break;
        case Languages.fr:
            nextQuestionButton.innerText = "Jeu Terminé! 🎉"
            break;
        case Languages.de:
            nextQuestionButton.innerText = "Spiel Vorbei! 🎉"
            break;
        case Languages.pt:
            nextQuestionButton.innerText = "Jogo Terminado! 🎉"
            break;
        case Languages.it:
            nextQuestionButton.innerText = "Gioco Finito! 🎉"
            break;
        default:
            nextQuestionButton.innerText = "Game Over! 🎉"
            break;
    }
}

function selectNextQuestion() {
    if (questionsCount == 0) {
        handleErrorMessage()
        return
    }

    if (questions.length == 0 ) {
        handleGameOver()
        return
    }

    let randonQuestionItem = randomIntFromInterval(0, questions.length - 1);
    
    currentQuestion = questions[randonQuestionItem]
    
    questionsAsked.push(currentQuestion)
    
    questions = questions.filter((element) => element.id != currentQuestion.id)

    changeQuestion(currentQuestion)

    gameStarted = true;
    shareButtonImage.hidden = false;

    if (questionsAskedCount < questionsCount) {
        questionsAskedCount += 1
        questionsCounterLabel.innerText = questionsAskedCount + "/" + questionsCount
    }
    
    changeNextButtonText()
    setupTooltip()
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
    // handleAnimation()
    handleGsapAnimation()
}

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

function shareButtonPressed() {
    var copiedText = questionTextSpan.innerText

    navigator.clipboard.writeText(copiedText);

    displayTooltipMessage();
}

// Tooltip = Share button functionality
function setupTooltip() {
    var tooltip = document.getElementById("myTooltip");

    switch (userLanguage) {
        case Languages.en:
            tooltip.innerHTML = "Copy to Clipboard"
            break;
        case Languages.es:
            tooltip.innerHTML = "Copiar al Portapapeles"
            break;
        case Languages.fr:
            tooltip.innerHTML = "Copier dans le presse-papier"
            break;
        case Languages.de:
            tooltip.innerHTML = "Kopieren zum Einfuhrzeichen"
            break;
        case Languages.it:
            tooltip.innerHTML = "Copia in Clipboard"
            break;
        case Languages.pt:
            tooltip.innerHTML = "Copiar para o Clipboard"
            break;
        default:
            tooltip.innerHTML = "Copy to Clipboard"
            break;
    }
}

function displayTooltipMessage() {
    var tooltip = document.getElementById("myTooltip");

    switch (userLanguage) {
        case Languages.en:
            tooltip.innerHTML = "Copied"
            break;
        case Languages.es:
            tooltip.innerHTML = "Copiado"
            break;
        case Languages.fr:
            tooltip.innerHTML = "Copie"
            break;
        case Languages.de:
            tooltip.innerHTML = "Kopiert"
            break;
        case Languages.it:
            tooltip.innerHTML = "Copia"
            break;
        case Languages.pt:
            tooltip.innerHTML = "Copiado"
            break;
        default:
            tooltip.innerHTML = "Copied"
            break;
    }

    setTimeout(function() {
        tooltip.hidden = true
    }, 1000)

    setTimeout(function() {
        tooltip.hidden = false
        setupTooltip()
    }, 2000)
}
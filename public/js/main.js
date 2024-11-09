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
let gameStarted = false;
let questionsPresented = 0;

getQuestions()
setupGame()

function setupGame() {
    questionTextSpan.innerText = "Let's talk about aliens..."
    handleNextButton("Loading questions... ⏱️", true)
    handleAnimation()
    setupTooltip()
}

function getQuestions() {
    if (questions.length > 0) {
        // Do not request more questions. Change to a different question
        selectNextQuestion()

    } else {
        const request = new Request("https://sfge2zkyh3.execute-api.us-east-1.amazonaws.com/PreguntasFunc", {
            method: "GET"
        });
        // const request = new Request("../resources/preguntas.json", {
        //     method: "GET"
        // });

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
                questionsCounter.innerText = "0/" + questions.length
                counterDiv.hidden = false;
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

function selectNextQuestion() {
    if (questions.length == 0) {
        handleErrorMessage()
        return
    }

    gameStarted = true;
    shareButtonImage.hidden = false;

    if (questionsPresented < questions.length) {
        questionsPresented += 1
        questionsCounter.innerText = questionsPresented + "/" + questions.length
    }
    
    changeNextButtonText()
    setupTooltip()

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

// function handleAnimation() {
//     // Wrap every letter in a span
//     var textWrapper = document.querySelector('.ml6 .letters');
//     textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//     anime.timeline({ loop: false })
//         .add({
//             targets: '.ml6 .letter',
//             translateY: ["1.1em", 0],
//             translateZ: 0,
//             duration: 1000,
//             delay: (el, i) => 50 * i
//         }).add({
//             targets: '.ml6',
//             opacity: 0,
//             duration: 10000000000,
//             easing: "easeOutExpo",
//             delay: 10000000000
//         });
// }

function handleAnimation() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml2');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: true })
        .add({
            targets: '.ml2 .letter',
            scale: [2, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 50 * i
        }).add({
            targets: '.ml2',
            opacity: 0,
            duration: 10000000000,
            easing: "easeOutExpo",
            delay: 1000
        });
}


function shareButtonPressed() {
    var copiedText = questionTextSpan.innerText

    navigator.clipboard.writeText(copiedText);

    displayTooltipMessage();
}

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
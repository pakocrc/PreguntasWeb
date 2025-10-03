// Translations
const TRANSLATIONS = {
    en: {
        title: "Let's talk about aliens...",
        loading: "Loading questions... ⏱️",
        start: "Start Game! 🚀",
        footer: "Made with ❤️ from 🇨🇷 by FCR, 2025",
        error: "There are no questions available. Please reload the page and try again.",
        gameOver: "Game Over! 🎉",
        primary: "Next 🎲",
        tooltip: "Copy to Clipboard",
        copiedTooltip: "Copied",
    },
    es: {
        title: "Let's talk about aliens...",
        loading: "Cargando preguntas... ⏱️",
        start: "¡Iniciar Juego! 🚀",
        footer: "Hecho con ❤️ en 🇨🇷 por FCR, 2025",
        error: "No hay preguntas disponibles. Por favor recarga la página y vuelve a intentarlo.",
        gameOver: "¡Juego terminado! 🎉",
        primary: "Siguiente 🎲",
        tooltip: "Copiar al Portapapeles",
        copiedTooltip: "Copiado",
    },
    pt: {
        title: "Let's talk about aliens...",
        loading: "Carregando perguntas... ⏱️",
        start: "Iniciar o jogo! 🚀",
        footer: "Feito com ❤️ na 🇨🇷 por FCR, 2025",
        error: "Não há questões disponíveis. Por favor recarregue a página e tente novamente.",
        gameOver: "Fim de Jogo! 🎉",
        primary: "Próximo 🎲",
        tooltip: "Copiar para o Clipboard",
        copiedTooltip: "Copiado",
    },
    de: {
        title: "Let's talk about aliens...",
        loading: "Fragen werden geladen... ⏱️",
        start: "Spiel starten! 🚀",
        footer: "Mit ❤️ in 🇨🇷 von FCR hergestellt, 2025",
        error: "Ninchts der Fragen sind verfügbar. Bitte lade die Seite neu und versuche es erneut.",
        gameOver: "Spiel Ende! 🎉",
        primary: "Nächste 🎲",
        tooltip: "Kopieren zum Einfuhrzeichen",
        copiedTooltip: "Kopiert",
    },
    fr: {
        title: "Let's talk about aliens...",
        loading: "Chargement des questions... ⏱️",
        start: "Lancer le jeu! 🚀",
        footer: "Fabriqué avec ❤️ au 🇨🇷 par FCR, 2025",
        error: "Il n'y a pas de questions disponibles. Veuillez rafraichir la page et essayer de nouveau.",
        gameOver: "Jeu Terminé! 🎉",
        primary: "Suivant 🎲",
        tooltip: "Copier dans le presse-papier",
        copiedTooltip: "Copié",
    },
    it: {
        title: "Let's talk about aliens...",
        loading: "Caricamento delle domande... ⏱️",
        start: "Inizia il gioco! 🚀",
        footer: "Realizzato con ❤️ in 🇨🇷 da FCR - 2025",
        error: "Non ci sono domande disponibili. Per favore ricarica la pagina e riprova.",
        gameOver: "Gioco Finito! 🎉",
        primary: "Prossimo 🎲",
        tooltip: "Copia in Clipboard",
        copiedTooltip: "Copia",
    }
};

// Language picker functionality
const selectedLanguage = document.getElementById('lang');
const DATA_LANG = 'data-lang';

function applyLanguage(lang) {
    const map = TRANSLATIONS[lang] || TRANSLATIONS.en;

    // set page language for accessibility
    document.documentElement.lang = lang;
    // persist selection
    try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }

    document.querySelectorAll('[' + DATA_LANG + ']').forEach(el => {
        const key = el.getAttribute(DATA_LANG);
        if (map[key]) el.textContent = map[key];
    });
}

// init: read stored language or navigator
const stored = (function () { try { return localStorage.getItem('lang') } catch (e) { return null } })();
const initial = stored || 'en';
selectedLanguage.value = initial;
applyLanguage(initial);

selectedLanguage.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
});

export default TRANSLATIONS;
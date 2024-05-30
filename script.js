const parts = [
    { id: 'head', name: 'голова' },
    { id: 'neck', name: 'шея' },
    { id: 'arm-l', name: 'левая рука' },
    { id: 'arm-r', name: 'правая рука' },
    { id: 'leg-l', name: 'левая нога' },
    { id: 'leg-r', name: 'правая нога' },
    { id: 'chest', name: 'грудь' },
    { id: 'belly', name: 'живот' }
];

let currentPartIndex = 0;
const messageElement = document.getElementById('message');
const successAudio = document.getElementById('success-audio');
const failAudio = document.getElementById('fail-audio');

function highlightPart(index) {
    const part = document.getElementById(parts[index].id);
    // part.classList.add('highlight');
    messageElement.textContent = `покажи где ${parts[index].name}`;
}

function removeHighlight() {
    document.querySelectorAll('.part').forEach(part => {
        part.classList.remove('highlight');
    });
}

function checkAnswer(partId) {
    if (partId === parts[currentPartIndex].id) {
        successAudio.play();
        currentPartIndex = (currentPartIndex + 1) % parts.length;
        removeHighlight();
        setTimeout(() => highlightPart(currentPartIndex), 1000);
    } else {
        const part = document.getElementById(partId);
        part.classList.add('exercise__body--wrong');
        // failAudio.play();
        setTimeout(() => part.classList.remove('exercise__body--wrong'), 1000);
    }
}

function init() {
    parts.forEach(part => {
        const svgPart = document.getElementById(part.id);
        if (svgPart) {
            svgPart.style.opacity = '';
            svgPart.classList.add('part');
            svgPart.classList.add('default-part-state');
            svgPart.addEventListener('click', () => checkAnswer(part.id));
        }
    });

}

function guessPart() {
    currentPartIndex = 0;
    highlightPart(currentPartIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    // highlightPart(currentPartIndex);
});
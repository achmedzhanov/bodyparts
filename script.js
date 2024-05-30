
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

const simpleParts = [
    { id: 'head', name: 'голова' },
    { id: 'neck', name: 'шея' },
    { id: ['arm-l', 'arm-r'], name: 'рука' },
    { id: ['leg-l', 'leg-r'], name: 'нога' },
    { id: 'chest', name: 'грудь' },
    { id: 'belly', name: 'живот' }
];

let currentPartIndex = 0;
const messageElement = document.getElementById('message');
const successAudio = document.getElementById('success-audio');
const failAudio = document.getElementById('fail-audio');

let currentTask = {parts: simpleParts};

function answerPart(index) {
    messageElement.textContent = `покажи где ${currentTask.parts[index].name}`;
}

function removeHighlight() {
    document.querySelectorAll('.part').forEach(part => {
        part.classList.remove('highlight');
    });
}

function checkAnswer(partId) {
    id = currentTask.parts[currentPartIndex].id
    if ((!Array.isArray(id) && partId === currentTask.parts[currentPartIndex].id) ||
            id.includes(partId)) {
        messageElement.textContent = '✅';
        successAudio.play();
        const part = document.getElementById(partId);
        part.classList.add('part--сorrect');
        // setTimeout(() => part.classList.remove('part--сorrect'), 1000);
        // currentPartIndex = (currentPartIndex + 1) % parts.length;
        // removeHighlight();
        // setTimeout(() => highlightPart(currentPartIndex), 1000);

        currentPartIndex = (currentPartIndex + 1) % currentTask.parts.length;
        setTimeout(() => answerPart(currentPartIndex), 3000);

    } else {
        // const part = document.getElementById(partId);
        const partEl = document.getElementsByClassName('exercise__body')[0];
        partEl.classList.add('exercise__body--wrong');
        // failAudio.play();
        setTimeout(() => partEl.classList.remove('exercise__body--wrong'), 1000);
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
    answerPart(currentPartIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    guessPart();
    // highlightPart(currentPartIndex);
});
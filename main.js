function runButton() {
    console.log('The button was clicked');
}

function copyButton() {
    console.log('The button was clicked');
}

window.onload = function () {
    const runButton = document.getElementById('run-button');
    const copyButton = document.getElementById('copy-button');

    runButton.addEventListener('click', () => {
        runButton();
    });

    copyButton.addEventListener('click', () => {
        copyButton();
    });
};

const generateBtn = document.querySelector('.generate');
const exportBtn = document.querySelector('.export');
// const exportSection = document.querySelector('.export-box');
const backdrop = document.querySelector('.backdrop')
const colorPalettes = document.querySelectorAll('.color-palette');
let colors = [];

function generator() {
    let hexValue = '';
    const radix = 16
    for (let i = 0; i < 6; i++) {
        let newRandom = Math.floor(Math.random() * radix)
        hexValue += (newRandom).toString(radix);
    }
    return [hexValue, `#${hexValue}`];
}

function colorGenerator() {
    colorPalettes.forEach((colorPalette, idx) => {
        const coordsDisplay = document.querySelectorAll('.hex-value');
        let [hexText, hexId] = generator();
        colors.push(hexId);
        colorPalette.style.backgroundColor = hexId;
        coordsDisplay[idx].textContent = hexText;
    });
}

function toggleDisplay() {
    backdrop.classList.add('backdrop-visible');

    const exportDiv = document.createElement('div');
    exportDiv.className = 'export-box';
    exportDiv.innerHTML = `
        <div class="box-1">
            <h2 class="export-title">Your Color Palette</h2>
            <button class="close">&Cross;</button>
        </div>
        <div class="box-2">
        <div class="variable-box">
            <div class="variable__box-container"></div>
        </div>
        <div class="btn-box">
            <button class="btn copy-text">Copy</button>
            <button class="btn download">Download</button>
        </div>
    `;
    document.body.append(exportDiv);
    getColors(exportDiv);

    function closeModal() {
        backdrop.classList.remove('backdrop-visible');
        exportDiv.remove();
    }

    const closeBtn = exportDiv.querySelector('.close');

    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    const copyBtn = document.querySelector('.copy-text');
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(document.querySelector('.variable__box-container').textContent).then(() => console.log('COPIED'));
    })
}



function getColors(exportDiv, wantRGBValue = true) {
    const variableContainer = exportDiv.querySelector('.variable__box-container');

    let hexDiv = document.createElement('div');
    hexDiv.className = 'all-colors';
    hexDiv.insertAdjacentHTML('afterbegin', `<p class="comment">/* hex values */</p>`);

    colors.forEach((color, idx) => {
        hexDiv.innerHTML += `
            <p class="color-name">--color-${idx + 1}: <span class="color-value">${color};</span></p>
        `;
    });
    variableContainer.append(hexDiv);

    if (wantRGBValue) {
        let rgbDiv = document.createElement('div');
        rgbDiv.className = 'all-colors';
        rgbDiv.insertAdjacentHTML('afterbegin', `<p class="comment">/* rgb values */</p>`);

        colorPalettes.forEach((colorPalette, idx) => {
            let id = colorPalette.getAttribute('style').lastIndexOf('rgb');
            let value = colorPalette.getAttribute('style').slice(id);
            rgbDiv.innerHTML += `
            <p class="color-name">--color-${idx + 1}: <span class="color-value">${value}</span></p>
        `;
        });
        variableContainer.append(rgbDiv);
    }
}

generateBtn.addEventListener('click', () => {
    colors = [];
    colorGenerator();
});

window.addEventListener('load', () => {
    colorGenerator();
});

exportBtn.addEventListener('click', toggleDisplay);

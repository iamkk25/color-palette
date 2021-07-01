const generateBtn = document.querySelector('.generate');
const exportBtn = document.querySelector('.export');
// const exportSection = document.querySelector('.export-box');
const backdrop = document.querySelector('.backdrop')
const colorPalettes = document.querySelectorAll('.color-palette');
const colorCoords = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
let colors = [];

function generator() {
    let hexArr = [];
    for (let i = 0; i < 6; i++) {
        let newRandom = Math.floor(Math.random() * colorCoords.length)
        hexArr.push(colorCoords[newRandom])
    }
    let hexValue = hexArr.join('');
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

    //CREATING VIRTUAL DOM
    const fragment = document.createDocumentFragment();

    const exportDiv = document.createElement('div');
    exportDiv.className = 'export-box';
    exportDiv.innerHTML = `
        <div class="box-1">
            <h2 class="export-title">Your Color Palette</h2>
            <button class="close">&Cross;</button>
        </div>
        <div class="box-2">
        <div class="variable-box">
            <div class="variable-box__container"></div>
        </div>
        <div class="btn-box">
            <button class="btn copy-url">Copy URL</button>
            <button class="btn download">Download</button>
        </div>
    `;

    // APPENDING CONTENT TO THE VIRTUAL DOM
    fragment.append(exportDiv);

    if (document.body.lastChild.className !== 'export-box'){
        // VIRTUAL DOM TO ACTUAL DOM
        document.body.append(fragment);
        getColors(exportDiv)
    } 

    function closeModal() {
        backdrop.classList.remove('backdrop-visible');
        exportDiv.remove();
    }

    const closeBtn = exportDiv.querySelector('.close');

    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
}



function getColors(exportDiv,wantRGBValue = true) {
    const variableContainer = exportDiv.querySelector('.variable-box__container');

    let hexDiv = document.createElement('div');
    hexDiv.className = 'all-colors';
    hexDiv.insertAdjacentHTML('afterbegin', `<p class="comment">/* hex values */</p>`);

    colors.forEach((color, idx) => {
        let p = document.createElement('p');
        p.className = 'color-name';
        p.textContent = `--color-${idx + 1}: `;

        let span = document.createElement('span');
        span.className = 'color-value';
        span.textContent = `${color};`;

        p.append(span);
        hexDiv.append(p);
    });
    variableContainer.append(hexDiv);

    if (wantRGBValue) {
        let rgbDiv = document.createElement('div');
        rgbDiv.className = 'all-colors';
        rgbDiv.insertAdjacentHTML('afterbegin', `<p class="comment">/* rgb values */</p>`);

        colorPalettes.forEach((colorPalette, idx) => {
            let id = colorPalette.getAttribute('style').lastIndexOf('rgb');
            let value = colorPalette.getAttribute('style').slice(id);

            let p = document.createElement('p');
            p.className = 'color-name';
            p.textContent = `--color-${idx + 1}: `;

            let span = document.createElement('span');
            span.className = 'color-value';
            span.textContent = value;

            p.append(span);
            rgbDiv.append(p);
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

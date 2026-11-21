const generateBtn = document.getElementById('generate-btn');
const colorPalatte = document.querySelector('.palatte-container');
// const copyBtn = document.querySelectorAll('.copy-btn');

colorPalatte.addEventListener('click', function (e) {
    if (e.target.classList.contains('copy-btn')) {
        let hexValue = e.target.previousElementSibling.textContent;
        navigator.clipboard.writeText(hexValue)
            .then(() => {
                console.log('copied text successfully: ' + hexValue);
                successCopyCheckstatus(e.target)
            })
            .catch(err => {
                alert('err: ' + err);
            })
    }else if(e.target.classList.contains('color')) {
        let hexValue = e.target.nextElementSibling.textContent;
        console.log(hexValue);

        navigator.clipboard.writeText(hexValue)
            .then(() => {
                console.log('copied text successfully: ' + hexValue);
                successCopyCheckstatus(e.target.nextElementSibling.querySelector('.copy-btn'))
            })
            .catch(err => {
                alert('err: ' + err);
            })

    }
})

// once successfully copies

function successCopyCheckstatus(e) {
    e.classList.remove("far", "fa-copy");
    e.classList.add("fa", "fa-check");
    e.style.color = '#48bb78';

    setTimeout(function () {
        e.classList.remove("fa", "fa-check");
        e.classList.add("far", "fa-copy");
        e.style.color = 'gray';
        console.log('in side timeout+ '+e);
        
    },1500);
}

generateBtn.addEventListener('click', generatePalate);


// Developing copy to clipboard funcionlity


function generatePalate() {
    let colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());

    }
    updateDisplayColor(colors);
}

// GenerateRandom Color method ;
function generateRandomColor() {
    // TODO: create logic here
    const letters = '123456789ABCDEFG';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log('generatebtn was clicked in random color');

    return color;
}

// Method: updateDisplayColor for displaying color on UI
function updateDisplayColor(colors) {
    // TODO: Create Logic of method here 
    let colorBoxes = document.querySelectorAll('.color-box');
    // let hexValue = document.querySelectorAll('.hex-value');

    colorBoxes.forEach((color, index) => {

        let colorDiv = color.querySelector('.color');
        let hexval = color.querySelector('.hex-value');
        colorDiv.style.backgroundColor = colors[index];
        hexval.textContent = colors[index];

    });
}
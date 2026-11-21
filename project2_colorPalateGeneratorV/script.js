const generateBtn = document.getElementById('generate-btn');
const colorPalatte = document.querySelector('.palatte-container');

generateBtn.addEventListener('click',generatePalate);

function generatePalate(){
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

    for(let i=0; i<6;i++){
        color+= letters[Math.floor(Math.random()*16)];
    }
    console.log('generatebtn was clicked in random color');
    
    return color;
}

// Method: updateDisplayColor for displaying color on UI
function updateDisplayColor(colors) {
    // TODO: Create Logic of method here 
    let colorBoxes = document.querySelectorAll('.color-box');
    // let hexValue = document.querySelectorAll('.hex-value');

    colorBoxes.forEach((color,index)=>{

        let colorDiv = color.querySelector('.color');
        let hexval = color.querySelector('.hex-value');
        colorDiv.style.backgroundColor = colors[index];
        hexval.textContent = colors[index];
       
    });
}
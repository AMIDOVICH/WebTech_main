const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
let score = 0;

const sound = new Audio("smash.mp3");

function run() {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'mole.png';

    // Add a flag to check if the mole has been clicked
    let moleClicked = false;

    img.addEventListener('click', () => {
        if (!moleClicked) {
            moleClicked = true;
            score += 10;
            sound.play();
            scoreEl.textContent = score;
            img.src = 'mole-whacked.png';
            clearTimeout(timer);
            setTimeout(() => {
                hole.removeChild(img);
                moleClicked = false; // Reset the flag when the mole is removed
                run();
            }, 250);
        }
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
        if (!moleClicked) {
            hole.removeChild(img);
            run();
        }
    }, 750);
}

run();

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    let lastHole;
    let timeUp = false;
    const button = document.querySelector('.startButton');
    let score = 0;

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const index = Math.floor(Math.random() * holes.length);
        const hole = holes[index];

        if (hole === lastHole) {
            return randomHole(holes);
        }

        lastHole = hole;
        return hole;
    }

    function showMole() {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        hole.classList.add('up');

        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) {
                showMole();
            }
        }, time)

    }

    button.addEventListener('click', function() {
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        showMole();
        setTimeout(() => timeUp = true, 10000
        );
    });

    function whackMole(e) {
        if(!e.isTrusted) return;
        score++;
        this.classList.remove('up');
        scoreBoard.textContent = score;
    }

    moles.forEach(mole => mole.addEventListener('click', whackMole))
});

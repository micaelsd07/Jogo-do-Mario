const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');

let score = 0;
let isGameOver = false;

const jump = () => {
    if (!isGameOver) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

// Loop para aumentar a pontuação enquanto o jogo estiver rodando
const scoreLoop = setInterval(() => {
    if (!isGameOver) {
        score++;
        scoreElement.innerHTML = `Score: ${score}`;
    }
}, 100); // Aumenta a cada 100ms

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        isGameOver = true;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
        clearInterval(scoreLoop); // Para de contar pontos no Game Over
    }
}, 10);

document.addEventListener('keydown', jump);
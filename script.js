let score = 0;
let timeLeft = 10;
let timer;
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');

function startGame() {
  score = 0;
  scoreEl.textContent = "Score: 0";
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  timerEl.textContent = `⏱️ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱️ ${timeLeft}`;
    if (timeLeft === 0) {
      endGame("⏱️ Time's up!");
    }
  }, 1000);

  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];
  let answer = eval(`${num1} ${operator} ${num2}`);
  questionEl.textContent = `${num1} ${operator} ${num2} = ?`;

  const options = [answer];
  while (options.length < 4) {
    let wrong = answer + Math.floor(Math.random() * 10) - 5;
    if (!options.includes(wrong)) options.push(wrong);
  }

  shuffleArray(options);

  choicesEl.innerHTML = '';
  options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      if (option === answer) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
        nextQuestion();
      } else {
        endGame("❌ Wrong answer!");
      }
    };
    choicesEl.appendChild(btn);
  });
}

function endGame(message) {
  clearInterval(timer);
  questionEl.textContent = message;
  choicesEl.innerHTML = '';
  const retry = document.createElement('button');
  retry.textContent = "🔁 Try Again";
  retry.onclick = startGame;
  choicesEl.appendChild(retry);
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

startGame();

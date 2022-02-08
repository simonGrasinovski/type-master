const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const timerElement = document.getElementById('timer');
const quoteScreenElement = document.getElementById('quoteScreen');
const quoteFieldElement = document.getElementById('quoteField');

let timer;

function fetchNewQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
  .then(response => response.json())
  .then(data => data.content);
}

function startTimer() {
  let counter = 0;
  timerElement.innerHTML = 0;

  timer = setInterval(() => {
    counter ++;
    timerElement.innerHTML = counter;
  }, 1000);
}

async function displayNewQuote() {
  const quote = await fetchNewQuote();
  quoteScreenElement.innerHTML = '';
  quoteFieldElement.value = '';

  quote.split('').forEach(char => {
    const charSpan = document.createElement('span');
    quoteScreenElement.appendChild(charSpan);
    charSpan.innerHTML = char;
  });
  clearInterval(timer);
  startTimer();
}

quoteFieldElement.addEventListener('input', () => {
  const screenChar = quoteScreenElement.querySelectorAll('span');
  const typedChar = quoteFieldElement.value.split('');
 
  let correct = true;

  screenChar.forEach((char, index) => {
    const character = typedChar[index];

    if(character == null) {
      char.classList.remove('correct');
      char.classList.remove('incorrect');
      correct = false
    } else if(character === char.innerHTML) {
      char.classList.add('correct');
      char.classList.remove('incorrect');
    } else {
      char.classList.remove('correct');
      char.classList.add('incorrect');
      correct = false;
    }
  });

  if(correct) displayNewQuote();
});

displayNewQuote();
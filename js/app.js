function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const cards = ['fa-atom', 'fa-frog', 'fa-feather-alt', 'fa-cogs', 'fa-anchor', 'fa-fan', 'fa-bolt', 'fa-hat-wizard', 'fa-apple-alt', 'fa-bell', 'fa-bomb', 'fa-brain'];
let score = 0;
let nextCard = 0;
let shuffledCards = ['fa-atom', 'fa-frog', 'fa-feather-alt', 'fa-cogs', 'fa-anchor', 'fa-fan', 'fa-bolt', 'fa-hat-wizard', 'fa-apple-alt', 'fa-bell', 'fa-bomb', 'fa-brain'];
    shuffledCards = shuffle(shuffledCards)

function placeCards() {
  for (i = 0; i < shuffledCards.length; i++) {
    document.getElementById('cards').children[i].firstElementChild.classList = `fas ${shuffledCards[i]}`
  }
}

function start() {
  score = 0;
    nextCard = 0;
    shuffledCards = shuffle(shuffledCards)
    for (e = 0; e < 3; e++) {
      let matched = document.getElementsByClassName('matched');
      for (i = 0; i <= matched.length + 1; i++) {
        for (element of matched) {
          element.classList.remove('matched')
        }
      }
    }
    updateScore()
    placeCards()
}

function restart(event) {
  if (event.target.classList == 'restart') {
    start();
  }
}

function updateScore() {
  document.getElementById('score').textContent = score;
  document.getElementById('next-card').firstChild.classList = `fas fas ${cards[nextCard]}`
  if (nextCard === 12) {
    alert(`You won! It only took you ${score} attempts.`)
  }
}

function pickCard(card) {
  if (card.target.classList == 'card' && document.getElementsByClassName('show').length === 0) {
    if (card.target.firstElementChild.classList[1] == cards[nextCard]) {
      card.target.classList.add('matched')
      nextCard++
      console.log(`matched`)
    } else {
      card.target.classList.add('show')
      setTimeout(function(){card.target.classList.remove('show'); }, 330);
      console.log('missed')
    }
    score++
    updateScore()
  }
}

document.addEventListener('click', restart)

document.addEventListener('click', pickCard)

start();
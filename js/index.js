const arrayOfWords = {en: 'game', ru: 'игра', ua: 'гра'};

const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
{en: 'application', ru: 'приложение', ua: 'додаток'},
{en: 'programming', ru: 'программирование', ua: 'програмування'},
{en: 'interface', ru: 'интерфейс', ua: 'інтерфейс'},
{en: 'wizard', ru: 'мастер', ua: 'майстер'}
];

let currentLanguage = 'en';

let selectedWord = words[Math.floor(Math.random() * words.length)][currentLanguage];

document.getElementById("language-one").addEventListener("click", lenguagePressed);
function lenguagePressed(event) {
  let currentLanguage = event.target.value;
  selectedWord = words[Math.floor(Math.random() * words.length)][currentLanguage];
  displayWord();
}
console.log(selectedWord);

let playable = true;


const correctLetters = [];
const wrongLetters = [];


function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃';
		popup.style.display = 'flex';

		playable = false;
	}
}


function updateWrongLettersEl() {
	
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

	
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost. 😕';
		finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}


function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}


window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {  
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

playAgainBtn.addEventListener('click', () => {
	playable = true;

	
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)][currentLanguage];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();
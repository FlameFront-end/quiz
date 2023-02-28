const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage()
showQuestions()
submitBtn.onclick = checkAnswer

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestions() {
	//Рендер заголовка
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const titleHTML = headerTemplate.replace('%title%', questions[questionIndex]['question'])
	headerContainer.innerHTML = titleHTML
	// Варианты ответов
	let answerNumber = 1
	for (answerText of questions[questionIndex]['answers']) {
		const questionTemplate =
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`

		let answerHTMl = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', answerNumber)

		listContainer.innerHTML += answerHTMl
		answerNumber ++
	}
}

function checkAnswer() {
	console.log('Начало проверки')
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')
	if (!checkedRadio) {
		submitBtn.blur()
		console.log('Ответ не выбран')
		return
	}

	const userAnswer = parseInt(checkedRadio.value)
	const correctAnswer = questions[questionIndex]['correct']

	if (userAnswer === correctAnswer) {
		score++
		console.log('Верно')
	} else {
		console.log('Неверно')
	}

	//Проверка на последний вопрос
	if (questionIndex !== questions.length - 1) {
		console.log('Не последний')
		questionIndex++
		clearPage()
		showQuestions()
	} else {
		console.log('Последний')
		clearPage()
		showResults()
	}
}
function showResults() {
	console.log('showResults')
	let resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
		`
	let title, message

	if (score === questions.length) {
		title = 'Поздравляем!'
		message = 'Вы ответили верно на все вопросы!'
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Не плохой результат!'
		message = 'Вы дали более половины правильных ответов'
	} else {
		title = 'Стоит постараться!'
		message = 'Пока что у вас меньше половины правильных ответов'
	}

	let result = `${score} из ${questions.length}`

	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result)

	headerContainer.innerHTML = finalMessage

	submitBtn.blur()
	submitBtn.innerHTML = 'Начать заново'
	submitBtn.onclick = () => history.go()
}

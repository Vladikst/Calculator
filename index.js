let runningTotal = 0
let buffer = '0'
let previousOperator

const screen = document.querySelector('.screen')

function buttonClick(value) {
	if (isNaN(value)) {
		handleSumbol(value)
	} else {
		handleNumber(value)
	}
	screen.innerText = buffer
}

function handleSumbol(sumbol) {
	switch (sumbol) {
		case 'C':
			buffer = '0'
			runningTotal = 0
			break
		case '=':
			if (previousOperator === null) {
				return
			}
			flushOperation(parseInt(buffer))
			previousOperator = null
			buffer = runningTotal
			runningTotal = 0
			break
		case '←':
			if (buffer.length === 1) {
				buffer = '0'
			} else {
				buffer = buffer.substring(0, buffer.length - 1)
			}
			break
		case '+':
		case '−':
		case '×':
		case '÷':
			handleMath(sumbol)
			break
	}
}

function handleMath(sumbol) {
	if (buffer === '0') {
		return
	}

	const intBuffer = parseInt(buffer)

	if (runningTotal === 0) {
		runningTotal = intBuffer
	} else {
		flushOperation(intBuffer)
	}
	previousOperator = sumbol
	buffer = '0'
}

function flushOperation(intBuffer) {
	if (previousOperator === '+') {
		runningTotal += intBuffer
	} else if (previousOperator === '−') {
		runningTotal -= intBuffer
	} else if (previousOperator === '×') {
		runningTotal *= intBuffer
	} else if (previousOperator === '÷') {
		runningTotal /= intBuffer
	}
}

function handleNumber(numberString) {
	if (buffer === '0') {
		buffer = numberString
	} else {
		buffer += numberString
	}
}

function init() {
	document
		.querySelector('.calc-buttons')
		.addEventListener('click', function (event) {
			buttonClick(event.target.innerText)
		})
}

init()

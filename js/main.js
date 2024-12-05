import { camelToKebab } from './services/util.service.js'

window.app = {
	init,
}

const state = {
	interval: null,
	showSeconds: true,
	prevTime: {},
}

function init() {
	toggleClock()
}

function renderTime() {
	const time = getTime()

	if (Object.values(state.prevTime).join('') === Object.values(time).join('')) return
	else state.prevTime = time

	renderDigits(time)
}

function renderDigits(time) {
	for (const key in time) {
		if (!state.showSeconds && key.startsWith('sec')) continue

        const elDigits = document.querySelector(`${getClassName(key)}`)
		const elHiddenDigit = document.querySelector(`${getClassName(key)} :first-child`)
		const elDisplayedDigit = document.querySelector(`${getClassName(key)} :last-child`)

		if (elDisplayedDigit.innerText !== time[key]) {
			elHiddenDigit.innerText = time[key]
            elDigits.appendChild(elHiddenDigit)
		}
	}
}

function toggleClock() {
	if (state.interval) {
		clearInterval(state.interval)
		state.interval = null
	} else {
		state.interval = setInterval(renderTime, 10)
	}
}

function getTime() {
	const now = new Date()
	const timeStr = now.toISOString().slice(11, -5)

	return {
		hoursLeft: timeStr[0],
		hoursRight: timeStr[1],

		minutesLeft: timeStr[3],
		minutesRight: timeStr[4],

		secondsLeft: timeStr[6],
		secondsRight: timeStr[7],
	}
}

function getClassName(key) {
    return key.split(/(?=[A-Z])/).map(s => '.' + s.toLowerCase()).join(' ')
}

function toggleCards() {
	const elWrapper = document.querySelector('.wrapper')
	const elCards = document.querySelectorAll('.card')
	const digit = elCards[1].innerText === '9' ? '0' : +elCards[1].innerText + 1
	elCards[0].innerText = digit
	elWrapper.appendChild(elCards[0])
}

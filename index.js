const g = name => (document.getElementById(name))

const bYes = g('yes')
const bYesCount = g('yes-count')
const bYesClear = g('yes-clear')

const bAll = g('all')
const bAllCount = g('all-count')
const bAllClear = g('all-clear')

const bNot = g('not')
const bNotCount = g('not-count')
const bNotClear = g('not-clear')

const bRun = g('run')

load()

bYes.addEventListener('change', update)
bAll.addEventListener('change', update)
bRun.addEventListener('click', update)

bYesClear.addEventListener('click', () => {
	bYes.value = ''
	update()
})
bAllClear.addEventListener('click', () => {
	bAll.value = ''
	update()
})
bNotClear.addEventListener('click', () => {
	bYes.value = ''
	bAll.value = ''
	update()
})

function go() {
	const yes = parse(bYes.value)
	const all = parse(bAll.value)
	const not = all.reduce((a, b) => {
		if (!yes.includes(b)) {
			a.push(b)
		}
		return a
	}, [])
	return format(not)
}

function parse(string) {
	return uniq(string.split(/[ \n]+/g).sort())
}

function format(array) {
	return array.join('\n')
}

function uniq(array) {
	return array.reduce((a, b) => {
		if (b !== '' && !a.includes(b)) {
        a.push(b)
    }
		return a
	}, [])
}

function update() {
	bYes.value = format(parse(bYes.value))
	bAll.value = format(parse(bAll.value))
	bNot.value = go()
	save('yes', bYes.value)
	save('all', bAll.value)
	count()
}

function save(name, value) {
	window.localStorage.setItem(name, value)
}

function load() {
	bYes.value = window.localStorage.getItem('yes') || ''
	bAll.value = window.localStorage.getItem('all') || ''
	bNot.value = go()
	count()
}

function count() {
	bYesCount.innerHTML = parse(bYes.value).length
	bAllCount.innerHTML = parse(bAll.value).length
	bNotCount.innerHTML = parse(bNot.value).length
}

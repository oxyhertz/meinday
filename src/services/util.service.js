export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getRandomColor,
  relativeTimeString,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}
function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  // Darken the color by reducing its alpha value
  var r = parseInt(color.substring(1, 3), 16)
  var g = parseInt(color.substring(3, 5), 16)
  var b = parseInt(color.substring(5, 7), 16)
  var a = Math.round(255 * 0.5) // Set the desired level of darkness
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
}

function relativeTimeString(timestamp) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const now = Date.now()
  const diff = now - timestamp

  if (diff < 60 * 1000) {
    const diffInSecs = Math.round(diff / 1000)
    const formatted = rtf.format(-diffInSecs, 'second')
    return formatted
  } else if (diff < 60 * 60 * 1000) {
    const diffInMins = Math.round(diff / (60 * 1000))
    const formatted = rtf.format(-diffInMins, 'minute')
    return formatted
  } else if (diff < 24 * 60 * 60 * 1000) {
    const diffInHours = Math.round(diff / (60 * 60 * 1000))
    const formatted = rtf.format(-diffInHours, 'hour')
    return formatted
  } else {
    const diffInDays = Math.round(diff / (24 * 60 * 60 * 1000))
    const formatted = rtf.format(-diffInDays, 'day')
    return formatted
  }
}

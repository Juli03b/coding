const b = document.querySelector('button')
const u = new URL('/hello','https://google.com')
u.password = 'zulu'
b.addEventListener('click', function (e) {
    console.log(u.password)
  })
// gui stuff

$(() => {
  $('.toggleMenu').click(() => {
    $('.info').toggleClass('enabled')
    $('span').toggleClass('enabled')
  })
  $('.info').click(() => {
    $('.info').toggleClass('enabled')
    $('span').toggleClass('enabled')
  })
})

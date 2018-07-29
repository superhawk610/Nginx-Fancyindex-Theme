// move body content into wrapper div
$('body').wrapInner('<div id="wrapper" />')

// add image shadowbox
$('body').append('<div id="shadowbox"><div id="container"><img /></div></div>')

// intercept clicks on images and display in shadowbox
$(document).on('click', 'a', function(e) {
  if (
    $(this)
      .attr('href')
      .match(/png|jpe?g|svg|tiff?|gif/i)
  ) {
    e.preventDefault()

    $('#shadowbox img').attr('src', $(this).attr('href'))
    $('#shadowbox').addClass('active')
  }
})

// close shadowbox when clicked outside
$(document).on('click', '#shadowbox', function(e) {
  $('#shadowbox').removeClass('active')
  setTimeout(function() {
    $('#shadowbox img').attr('src', '')
  }, 300)
})

$(document).on('click', '#shadowbox #container', function(e) {
  e.stopPropagation()
})

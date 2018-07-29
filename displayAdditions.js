// move body content into wrapper div
$('body').wrapInner('<div id="wrapper" />')

// supported image types
var isSupported = /png|jpe?g|svg|tiff?|gif/i

// check file listing for supported image types
var imageRows = []
$('table tbody tr').each(function(index, element) {
  var name = $(element)
    .find('td')
    .text()
  if (name.match(isSupported)) {
    imageRows.push(index)
  }
})

// disable arrows when not available
var currentIndex = -1
function refreshArrows() {
  $('#arrow-left').prop('disabled', false)
  $('#arrow-right').prop('disabled', false)

  // first image has no previous image
  if (currentIndex === 0) {
    $('#arrow-left').prop('disabled', true)
  }

  // last image has no next image
  if (currentIndex === imageRows.length - 1) {
    $('#arrow-right').prop('disabled', true)
  }
}

// intercept clicks on images and display in shadowbox
$(document).on('click', 'a', function(e) {
  if (
    $(this)
      .attr('href')
      .match(isSupported)
  ) {
    e.preventDefault()

    var $row = $(this).closest('tr'),
      i = $row.index()

    currentIndex = imageRows.indexOf(i)
    refreshArrows()

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

// load prev/next pictures on arrow clicks
$(document).on('click', '#shadowbox #arrow-left', function(e) {
  e.stopPropagation()
  $('#shadowbox img').attr('src', '')

  currentIndex--
  var newIndex = imageRows[currentIndex]
  $newAnchor = $('table tbody tr')
    .eq(newIndex)
    .find('a')

  refreshArrows()

  $('#shadowbox img').attr('src', $newAnchor.attr('href'))
})

$(document).on('click', '#shadowbox #arrow-right', function(e) {
  e.stopPropagation()
  $('#shadowbox img').attr('src', '')

  currentIndex++
  var newIndex = imageRows[currentIndex]
  $newAnchor = $('table tbody tr')
    .eq(newIndex)
    .find('a')

  refreshArrows()

  $('#shadowbox img').attr('src', $newAnchor.attr('href'))
})

$(document).on('click', '#shadowbox #container', function(e) {
  e.stopPropagation()
})

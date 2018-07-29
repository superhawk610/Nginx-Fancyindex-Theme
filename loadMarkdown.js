var converter = new showdown.Converter()
function insertMarkdown(selector, file) {
  $(selector).load(file, function() {
    var elem = document.querySelector(selector)
    // strip leading whitespace so it isn't evaluated as code
    var text = elem.innerHTML
    text = text.replace(/\n[ ]*/g, '\n')
    var html = converter.makeHtml(text)
    elem.innerHTML = html
  })
}

insertMarkdown('#raw_include_HEADER_md', 'HEADER.md')
insertMarkdown('#raw_include_README_md', 'README.md')

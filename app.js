const fs = require('fs')
const path = require('path')
const extract = require('extract-comment')
const markdown = require('markdown').markdown
const matter= require('gray-matter')

function findFileComments(path) {
  console.log(path)
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      console.error (err)
      return
    } else {
      let comments = extract(data)
      if (comments.length) {
        let gray = matter(comments[0].value.trim())
        console.log(gray.data)
        console.log(markdown.toHTML(gray.content))
      }
    }
  })
}


function main () {
  fs.readdir(path.join(__dirname, '/'), (err, files) => {
    if (err) {
      console.error(err)
    } else {
      console.log(files)
      files.forEach((file) => {
        if (file.match(/^.*\.js/g)) {
          findFileComments(file)
        }
      })
    }
  })
}

main()
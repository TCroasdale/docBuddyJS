const fs = require('fs')
const path = require('path')
const extract = require('extract-comment')
const markdown = require('markdown').markdown
const matter = require('gray-matter')
const { argv } = require('yargs')
const conf = require('./.docdown.config.js')

Array.prototype.forSmart = function (fn, callback) {
  
}


/**
 * ---
 * $comment: The extracted comment
 * $returns: null if not a docstring, else the doc object
 * ---
 * Parses a comment and returns the doc object
 */
function processComment (comment) {
  let docObject = {
    meta: {},
    lineNo: 0,
    md: '',
    codeContext: undefined
  }

  if (comment.code) {
    let processed = matter(comment.value.trim())
    docObject.meta = processed.data
    docObject.md = processed.content

    docObject.lineNo = comment.loc.start.line
    docObject.codeContext = {
      type: comment.code.context.type,
      name: comment.code.context.name,
      params: comment.code.context.params
    }
    return docObject
  }
  return null
}

/**
 * ---
 * $fileName: The file name of the file
 * $callback: The callback function with signature (err, data)
 * $format: The format to parse into
 * ---
 * This function retrieves all function signatures in a single file.
 */
function findFileComments(fileName, callback, format='md') {
  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
      callback(err, undefined)
    } else {
      let comments = extract(data)
      if (comments.length) {
        let cmtData = []

        comments.forEach((comment) => {
          let docObject = processComment(comment)
          if (docObject)
            cmtData.push(docObject)
        })


        callback(false, cmtData)
      } else {
        callback(false, [])
      }
    }
  })
}

/**
 * ---
 * $dir: The directory to read from
 * $callback: The callback to call when finished, uses signature (err, data)
 * ---
 * Fetches all the comment data from a file
 */
function readDir (dir, callback) {
  let dirPath = path.join(__dirname, dir)
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      callback(err, null)
    } else {

      let dirData = {} // The doc data for the directory

      files.forEach((file) => {
        if (file.match(/^.*\.js/g)) {
          let filePath = path.join(dirPath, file)
          findFileComments(filePath, (err, data) => {
            if (err) {
              callback(err, null)
            } else {
              if(data.length) {
                dirData[file] = data
                console.log(dirData)
              }
            }
          })
        }
      })

    }
  })
}

/**
 * The entry point of the program
 */
function main () {
  const workDir = argv.dir ? argv.dir : '/'
  
  if (typeof workDir === typeof '') { // If only one dir specified
    readDir(workDir, (err, data) => {
      if (err) {
        console.error (err)
      }
    })
  } else { // if multiple are specified
    let programData = {}

    workDir.forEach((subDir) => {
      readDir(subDir, (err, data))
    })

  }
}


main()
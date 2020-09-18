const fs = require('fs')
const path = require('path')
const extract = require('extract-comment')
const markdown = require('markdown').markdown
const matter = require('gray-matter')
const { argv } = require('yargs')
const conf = require('./.docdown.config.js')
const Promise = require('promise')

/**
 * ---
 * $fn: The function to call on each object, signature (elem, done)
 * $callback: The function to call when everything is done
 * ---
 * A smart for loop that waits for everything to finish in the event of callback functions
 */
Array.prototype.forSmart = function (fn, callback) {
  let count = this.length
  
  this.forEach((elem) => {
    fn(elem, (err) => {
      count --

      if (count === 0) {
        callback(err)
      }
    })
  })
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
    if (comment.code.context) {
      docObject.codeContext = {
        type: comment.code.context.type,
        name: comment.code.context.name,
        params: comment.code.context.params
      }
    } else {
      docObject.codeContext = {
        type: 'function',
        name: comment.code.value.replace(/(function|[\s]*|)[^\w]/g, ''), // gets only fn name
        params: []
      }
    }
    return docObject
  }
  return null
}

/**
 * ---
 * $fileName: The file name of the file
 * $callback: The callback function with signature (err, data)
 * ---
 * This function retrieves all function signatures in a single file.
 */
function findFileComments(fileName, callback) {
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

      files.forSmart((file, done) => {
          if (!file.match(/^.*\.js/g)) {
            return done()
          }
          console.log(`Starting work on file ${file}`)
        
          let filePath = path.join(dirPath, file)
          findFileComments(filePath, (err, data) => {
            if (err) {
              done(err)
            } else {
              if(data.length) {
                dirData[file] = data
              }
              done()
            }
          })
      },
      () =>{
        console.log('finished all directory work')
        callback(false, dirData)
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

    workDir.forSmart((subDir) => {
      readDir(subDir, (err, data) => {
        if (err) {
          console.error(err)
        } else {
          
        }
      })
    }, () => {
      console.log('finished processing all directoreis')
    })

  }
}


main()
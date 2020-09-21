const fs = require('fs')
const path = require('path')
const extract = require('extract-comment')
const markdown = require('markdown').markdown
const matter = require('gray-matter')
const { argv } = require('yargs')
const conf = require('./.docdown.config.js')
const Promise = require('promise')
const mdCompiler = require('./compilemarkdown')

/**
 * ---
 * fn: The function to call on each object, signature (elem, done)
 * $callback:
 *    description: The function to call when everything is done
 *    signature:
 *      err: The error, or null if no error
 * 
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
 * comment: The extracted comment
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
 * fileName: The file name of the file
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
          if (docObject) {
            cmtData.push(docObject)
          }
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
 * dir: The directory to read from
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
            return done() // only process .js files
          }
        
          let filePath = path.join(dirPath, file)
          findFileComments(filePath, (err, data) => {
            if (err) {
              done(err)
            } else {
              if(data.length) {
                dirData[file] = { funcs: data }
              }
              done()
            }
          })
      },
      () =>{
        callback(false, dirData)
      })

    }
  })
}


/**
 * ---
 * documentation: The documentation information for the entire program
 * format: html or md, the output format
 * ---
 */
function processAllDocumatation (documentation, format) {
  // Create root docs folder, if it doesn't exist
  let docsDir = path.join(__dirname, 'docs')
  if (!fs.existsSync(docsDir)){
    fs.mkdirSync(docsDir);
  }

  // Get all directories, and iterate through.
  let dirNames = Object.keys(documentation)
  dirNames.forSmart((dirName, dirDone) => {
    let dirDocs = documentation[dirName]
    let fileNames = Object.keys(documentation[dirName])

    // Create a folder in /docs for all directories processed
    let pathSafeName = dirName.replace('/', '')
    let dirPath = path.join(docsDir, pathSafeName)
    if (!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath);
    }

    // For each file
    fileNames.forSmart((fileName, fileDone) => {
      let thisPath = path.join(dirPath, fileName + '.md')
      dirDocs[fileName].fileName = fileName

      mdCompiler.compileFile('default.md', dirDocs[fileName], (err, md) => {
        if (err) {
          console.error(err)
        } else {
          writeFile(md, thisPath, (err) => {
            if (err) {
              fileDone(err)
            } else {
              fileDone()
            }
          })
        }
      })
      // EO fileNames.for
    },
    (err) => {
      dirDone(err)
    })

  }, // EO dirNames.for
  (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('finished writing')
    }
  })
}

/**
 * ---
 * contents: The string to print to a file 
 * fileName: the file to write to
 * $callback: callback fn with signature (err)
 */
function writeFile (contents, fileName, callback) {
  fs.writeFile(fileName, contents, (err) => {
    if (err) {
      callback(err)
    } else {
      callback(false)
    }
  })
}

/**
 * ---
 * ---
 * The entry point of the program
 */
function main () {
  const workDir = argv.dir ? argv.dir : '/'
  const format = argv.format ? argv.format : 'md'
  
  if (typeof workDir === typeof '') { // If only one dir specified
    readDir(workDir, (err, data) => {
      if (err) {
        console.error (err)
      }
    })
  } else { // if multiple are specified
    let programData = {}

    workDir.forSmart((subDir, done) => {
      readDir(subDir, (err, data) => {
        if (err) {
          done(err)
        } else {
          programData[subDir] = data
          done ()
        }
      })
    }, () => {
      console.log(programData)
      processAllDocumatation(programData, format)
    })

  }
}


main()
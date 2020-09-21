const fs = require('fs')
const path = require('path')
const ejs = require('ejs')


/**
 * ---
 * templateName: The name of the template file, sans .md
 * templateFolder: The folder which the template can be found in, default '/templates'
 * $callback:
 *   description: The callback function which is called is synchronous execution is desired.
 *   args:
 *     err: The error from reading the file
 *     template: The returned template string
 * $returns:
 *    type: String
 *    description: returns the data if no callback is provided
 * ---
 * Reads a template file, either synchronously or asynchronously
 */
module.exports.compileFile = function (templateName, data, callback, templateFolder) {
  templateFolder = (typeof templateFolder !== 'undefined') ? templateFolder : '/templates'
  let templatePath = path.join(path.join(__dirname, templateFolder), templateName)

  ejs.renderFile(templatePath, data, { delimiter: '$' }, (err, str) => {
    if (err) {
      callback (err, undefined)
    } else {
      callback(false, str)
    }
  })
}

/**
 * ---
 * fileName: The name of the file to read
 * fileData: The docstring data of a file
 * ---
 */
module.exports.createMDFile = function (fileName, fileData) {
  let markdown =`# ${fileName}`

  fileData.forEach((functionData) => {
    markdown += '\n'
    markdown += createFunctionMD(functionData)
    markdown += '\n---\n'
  })

  return markdown
}

module.exports.createFunctionMD = function (data) {
  const metaKeys = Object.keys(data.meta)
  const args = metaKeys.filter(key => !key.match(/^(\$return[s]*)/g))

  let signature = ''
  args.forEach((arg) => {
    signature += `${arg.replace('$', '')}, `
  })
  signature = signature.substr(0, signature.length - 2)

  let heading = `### ${data.codeContext.type} ${data.codeContext.name} (${signature}) \n`

  let argsTable = ''
  if (args.length) {
    argsTable = `| Arg | description |\n|-----|-------------|\n`
    args.forEach((arg) => {
      if (arg[0] === '$') {
        argsTable += `|${arg.replace('$', '')}|${data.meta[arg].description}|\n `
      } else {
        argsTable += `|${arg.replace('$', '')}|${data.meta[arg]}|\n `
      }
    })
    argsTable += '\n'
  }

  let returnMD = ''
  if(data.meta['$returns']) {
    returnMD = `\n##### Returns \n> ${data.meta['$returns']}\n`
  }
  if(data.meta['$return']) {
    returnMD = `\n##### Returns \n> ${data.meta['$return']}\n`
  }

  let callbackMD = ''
  if(data.meta['$callback']) {
    callbackMD = `\n##### Callback \n> ${data.meta['$callback'].description}\n`
    if (data.meta['$callback'].signature) {
      callbackMD += '\n##### Signature\n'

      let callbackArgs = Object.keys(data.meta['$callback'].signature)
      let argsCBTable = ''
      if (args.length) {
        argsCBTable = `| Arg | description |\n|-----|-------------|\n`
        callbackArgs.forEach((arg) => {
          if (arg[0] === '$') {
            argsCBTable += `|${arg.replace('$', '')}|${data.meta['$callback'].signature[arg]}|\n `
          } else {
            argsCBTable += `|${arg.replace('$', '')}|${data.meta['$callback'].signature[arg]}|\n `
          }
        })
        argsCBTable += '\n'
      }
      callbackMD += argsCBTable
    }
  }

  let md = ''
  md += heading
  md += argsTable
  md += returnMD
  md += callbackMD

  return md
}
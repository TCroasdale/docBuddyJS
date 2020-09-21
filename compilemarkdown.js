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
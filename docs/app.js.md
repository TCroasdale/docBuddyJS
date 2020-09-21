# app.js

- ``` prototype method forSmart (fn, callback) ```
- ``` function processComment (comment) ```
- ``` function findFileComments (fileName, callback) ```
- ``` function readDir (dir, callback) ```
- ``` function processAllDocumatation (documentation, format) ```
- ``` function writeFile (contents, fileName, callback) ```
- ``` function main () ```



### ``` prototype method forSmart (fn, callback) ```

A smart for loop that waits for everything to finish in the event of callback functions

| Arg | description |
| --: | :-- |
| fn | The function to call on each object, signature (elem, done) |
| callback | The function called when done is called n times |




#### Callback

The function called when done is called n times




| Arg | description |
| --: | :-- |
| err | The error, or falsey if no error |
 




---

### ``` function processComment (comment) ```

Parses a comment and returns the doc object

| Arg | description |
| --: | :-- |
| comment | The extracted comment |



#### Return
##### Type: ``` JSON ```
null if not a docstring, else the doc object


---

### ``` function findFileComments (fileName, callback) ```

This function retrieves all function signatures in a single file.

| Arg | description |
| --: | :-- |
| fileName | The file name of the file |
| callback | The function called when processing is done |




#### Callback

The function called when processing is done




| Arg | description |
| --: | :-- |
| err | The error if ir occurs, falsey if not. |
| data | The comments in the file |
 




---

### ``` function readDir (dir, callback) ```

Fetches all the comment data from all the files in a directory.

| Arg | description |
| --: | :-- |
| dir | The directory to read from |
| callback | The callback to call when finished, uses signature (err, data) |




#### Callback

The callback to call when finished, uses signature (err, data)




| Arg | description |
| --: | :-- |
| err | The error if occured, falsey if not |
| data | The returned docstrings from that directory. |
 




---

### ``` function processAllDocumatation (documentation, format) ```



| Arg | description |
| --: | :-- |
| documentation | The documentation information for the entire program |
| format | html or md, the output format |





---

### ``` function writeFile (contents, fileName, callback) ```



| Arg | description |
| --: | :-- |
| contents | The string to print to a file |
| fileName | the file to write to |
| callback | Called when the file has been written to disk. |




#### Callback

Called when the file has been written to disk.




| Arg | description |
| --: | :-- |
| err | The error if it occurs, false otherwise. |
 




---

### ``` function main () ```

The entry point of the program

| Arg | description |
| --: | :-- |





---


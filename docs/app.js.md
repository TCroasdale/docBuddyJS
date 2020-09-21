# app.js

### ``` prototype method forSmart (fn, callback) ```

| Arg | description |
| --: | :-- |
| fn | The function to call on each object, signature (elem, done) |
| callback | The function to call when everything is done |




#### Callback

The function to call when everything is done





---

### ``` function processComment (comment) ```

| Arg | description |
| --: | :-- |
| comment | The extracted comment |



#### Return
 
null if not a docstring, else the doc object


---

### ``` function findFileComments (fileName, callback) ```

| Arg | description |
| --: | :-- |
| fileName | The file name of the file |
| callback |  |




#### Callback





---

### ``` function readDir (dir, callback) ```

| Arg | description |
| --: | :-- |
| dir | The directory to read from |
| callback |  |




#### Callback





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
| callback |  |




#### Callback





---

### ``` function main () ```

| Arg | description |
| --: | :-- |





---


# app.js
### prototype method forSmart () 

  | Arg | description |
  |-----|-------------|
  |fn|The function to call on each object, signature (elem, done)|

##### Callback 
> The function to call when everything is done

---

### function processComment () 

  | Arg | description |
  |-----|-------------|
  |comment|The extracted comment|

##### Returns 
> null if not a docstring, else the doc object

---

### function findFileComments () 

  | Arg | description |
  |-----|-------------|
  |fileName|The file name of the file|

##### Callback 
> The callback function with signature (err, data)

---

### function readDir () 

  | Arg | description |
  |-----|-------------|
  |dir|The directory to read from|

##### Callback 
> The callback to call when finished, uses signature (err, data)

---

### function createMDFile () 

  | Arg | description |
  |-----|-------------|
  |fileData|The docstring data of a file|

---

### function processAllDocumatation () 

  | Arg | description |
  |-----|-------------|
  |documentation|The documentation information for the entire program||format|html or md, the output format|

---

### function writeFile () 

  | Arg | description |
  |-----|-------------|
  |contents|The string to print to a file||fileName|the file to write to|

##### Callback 
> callback fn with signature (err)

---

### function main () 

  | Arg | description |
  |-----|-------------|
  

---

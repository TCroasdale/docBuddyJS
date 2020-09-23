# app.js


- ``` prototype method forSmart (fn, callback) ```

- ``` function processComment (comment) ```

- ``` function findFileComments (fileName, callback) ```

- ``` function readDir (dir, callback) ```

- ``` function processAllDocumatation (documentation, format, destination) ```

- ``` function writeFile (contents, fileName, callback) ```

- ``` function main () ```





### ``` prototype method forSmart (fn, callback) ```

A smart for loop that waits for everything to finish in the event of callback functions




#### Callback
The function called when done is called n times



---



### ``` function processComment (comment) ```

Parses a comment and returns the doc object



#### Return
##### Type: ``` JSON ```
null if not a docstring, else the doc object


---



### ``` function findFileComments (fileName, callback) ```

This function retrieves all function signatures in a single file.




#### Callback
The function called when processing is done



---



### ``` function readDir (dir, callback) ```

Fetches all the comment data from all the files in a directory.




#### Callback
The callback to call when finished, uses signature (err, data)



---



### ``` function processAllDocumatation (documentation, format, destination) ```







---



### ``` function writeFile (contents, fileName, callback) ```






#### Callback
Called when the file has been written to disk.



---



### ``` function main () ```

The entry point of the program





---


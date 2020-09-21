# compilemarkdown.js

- ``` method compileFile (templateName, data, callback, templateFolder) ```



### ``` method compileFile (templateName, data, callback, templateFolder) ```

Reads a template file, either synchronously or asynchronously

| Arg | description |
| --: | :-- |
| templateName | The name of the template file, sans .md |
| templateFolder | The folder which the template can be found in, default &#39;/templates&#39; |
| callback | The callback function which is called is synchronous execution is desired. |



#### Return
##### Type: ``` String ```
returns the data if no callback is provided

#### Callback

The callback function which is called is synchronous execution is desired.




| Arg | description |
| --: | :-- |
| err | The error from reading the file |
| template | The returned template string |
 




---


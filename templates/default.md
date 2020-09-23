# <$= fileName $>

<$ funcs.forEach((func) => {  $>
<$ if (func.codeContext.params) { -$>
- ``` <$= func.codeContext.type $> <$= func.codeContext.name $> (<$= func.codeContext.params.join(', ') $>) ```
<$ } else { -$>
- ``` <$= func.codeContext.type $> <$= func.codeContext.name $> () ```
<$ } -$>
<$ }) $>


<$ funcs.forEach((func) => { -$>

<$ if (func.meta['$route']) { $>

### ``` <$= func.meta['$route'].method $> ``` - <$= func.meta['$route'].endpoint $>

<$ } else { $>

<$ if (func.codeContext.params) { -$>
### ``` <$= func.codeContext.type $> <$= func.codeContext.name $> (<$= func.codeContext.params.join(', ') $>) ```
<$ } else { -$>
### ``` <$= func.codeContext.type $> <$= func.codeContext.name $> () ```
<$ } -$>

<$ } $>

<$= func.md $>

<$ if (Object.keys(func.meta).length) { -$>
<$- include('partials/ArgsTable.md', { args: func.meta }); -$>
<$_ }-$><$# End of args for loop -$>

<$ if (func.meta['$returns']) { $>
#### Return
<$ if (func.meta['$returns'].description) { -$>
##### Type: ``` <$= func.meta['$returns'].type $> ```
<$= func.meta['$returns'].description -$>
<$ } else { -$> 
<$= func.meta['$returns'] -$>
<$ } -$>
<$ } -$>

<$ if (func.meta['$callback']) { $>
#### Callback
<$ if (func.meta['$callback'].description) { -$>
<$= func.meta['$callback'].description $>
<$ } -$>

<$ if (Object.keys(func.meta['$callback'].args).length) { -$>
<$- include('partials/ArgsTable.md', { args: func.meta['$callback'].args }); -$>
<$ } -$>
<$ } $>

---

<$ }) $><$# End of funcs for loop $>
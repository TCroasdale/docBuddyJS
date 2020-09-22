# <$= fileName $>

<$ funcs.forEach((func) => { -$>
- ``` <$= func.codeContext.type $> <$= func.codeContext.name $> (<$= func.codeContext.params.join(', ') $>) ```
<$ }) $>


<$ funcs.forEach((func) => { -$>
### ``` <$= func.codeContext.type $> <$= func.codeContext.name $> (<$= func.codeContext.params.join(', ') $>) ```

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
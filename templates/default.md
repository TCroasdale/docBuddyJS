# <$= fileName $>

<$ funcs.forEach((func) => { -$>
- ``` <$= func.codeContext.type $> <$= func.codeContext.name $> (<$= func.codeContext.params.join(', ') $>) ```
<$ }) $>


<$ funcs.forEach((func) => { -$>
### ``` <$= func.codeContext.type $> <$= func.codeContext.name $> (<$= func.codeContext.params.join(', ') $>) ```

<$= func.md $>

<$ if (func.meta.length) -$>
| Arg | description |
| --: | :-- |
<$_ Object.keys(func.meta).forEach((arg) => { -$>
<$_ if (!arg.match(/^(\$return[s]*)/g)) { -$>
<$_ if (arg[0] === '$') { -$>
| <$= arg.replace('$', '') $> | <$= func.meta[arg].description $> |
<$_ } else { -$>
| <$= arg $> | <$= func.meta[arg] $> |
<$_ } -$>
<$_ } -$>
<$_ }) -$><$# End of args for loop $>

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
<$ if (func.meta['$callback'].description) { $>
<$= func.meta['$callback'].description $>
<$ } $>

<$ if (func.meta['$callback'].args) { $>

| Arg | description |
| --: | :-- |
<$ Object.keys(func.meta['$callback'].args).forEach((arg) => { -$>
<$_ if (!arg.match(/^(\$return[s]*)/g)) { -$>
<$_ if (arg[0] === '$') { -$>
| <$= arg.replace('$', '') $> | <$= func.meta['$callback'].args[arg].description $> |
<$_ } else { -$>
| <$= arg $> | <$= func.meta['$callback'].args[arg] $> |
<$_ } -$>
<$ } -$>
<$ }) -$> <$# End of args for loop $>

<$ } -$>

<$ } $>

---

<$ }) $><$# End of funcs for loop $>
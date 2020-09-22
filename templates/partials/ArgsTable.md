| Arg | description |
| --: | :-- |
<$_ Object.keys(args).forEach((arg) => { -$>
<$_ if (!arg.match(/^(\$return[s]*)/g)) { -$>
<$_ if (arg[0] === '$') { -$>
| <$= arg.replace('$', '') $> | <$= args[arg].description $> |
<$_ } else { -$>
| <$= arg $> | <$= args[arg] $> |
<$_ } -$>
<$_ } -$>
<$_ }) -$><$# End of args for loop $>
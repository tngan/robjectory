# robjectory

A global registry to handle configs and flags

### Description
Developers always declared placed the constants, flags and application configs in different files. Here we provide a global registry to handle them. Global variable is not an evil, in case you know what you are doing.

### Priciples
**Semantic key**

The key name of object literals in JavaScript is case sensitive. In this module, all key names in registry is case insensitive because intuitively it maintains the same semantic meaning.

**Predictable mutability**

Developers now clearly knows whether the global variables are immutable at the very beginning.

### Get Started
```bash
$ npm install robjectory
```

### API Reference
```javascript
var robjectory = require('robjectory');
```

**robjectory.register (key, value, options)**

`key` is a string representing the name of key.<br/>
`value` is optional indicating the value of the key. Default is the name of key.<br/>
`options` is an optional object for advanced configuration.

+ `options.ignoreCapital` is a boolean indicating the format of key, the written style of constants and global variables commonly uses UPPERCASE. Default is false.
+ `options.isMutable` is a boolean indicating the mutability of the key-value pair. Once the key is registered, the corresponding value cannot be modified if this boolean is set to false. Default is false.
+ `options.isDual` is a boolean indicating the duality of the key-value pair. It can be used to search the key by value and vice versa. The dual will follow the same mutability and name convention.

```javascript
robjectory.register('flag');
// true
robjectory.register('FlAg');
// false
robjectory.register('constant', 123);
// true
robjectory.register('newFlag',{
    ignoreCapital: true
});
// true
// the key is 'newFlag', just follow the input
```

**robjectory.mutate (key, value)**

It returns true after mutation. Return false if the value is immutable.

`robjectory.mutate` is the only method that can mutate the value in the registered key-value pair. Mutable variables makes the application unpredictable. Let's imagine if the global configuration setting is changed in some file and cause conflict, it's hard to point out where it changes the value. That's why all key-value pair here is unique and immutable by default once the key is registered.

If developers still want to use mutable variables, it's allowed in our module, but they do need to set the option manually so they acknowledge such variable/config is mutable.

```javascript
robjectory.register('mutable','initialValue',{
    isMutable: true
});
// true { MUTABLE: 'initialValue' }
robjectory.mutate ('mutable','newValue');
// true { MUTABLE: 'newValue' }
```

**robjectory.isMutable (key)**

Check whether the value in a registered key-value pair is mutable.

```javascript
robjectory.register('mutable','initialValue',{
    isMutable: true
});
robjectory.isMutable ('mutable');
// true
```

**robjectory.hasKey (key)**

Check whether the key is registered.

```javascript
robjectory.register('hasKeyTest');
robjectory.hasKey('hasKeyTest');
// true
```

**robjectory.remove (key)**

It returns true if the key-value pair is successfully removed. Returns false indicating the non-exist key.

```javascript
robjectory.register('flag');
// the corresponding value is 'flag'
robjectory.remove('flag');
// true
robjectory.remove('flag');
// false because the key-value pair is deleted in the last step
```

**robjectory.getValue (key)**

It returns the corresponding value. If the key is not registered, it returns undefined.

```javascript
robjectory.getValue('no-flag');
// undefined
robjectory.register('flag');
robjectory.getValue('flag');
// 'flag'
```

**robjectory.findKeyName (key)**

It returns the actual name of key used in object.

```javascript
robjectory.register('flag');
robjectory.findKeyName('flag');
// FLAG
robjectory.findKeyName('flAg');
// FLAG
robjectory.register('tHiSiSmYkEy','value',{
    ignoreCapital: true
});
robjectory.findKeyName('thisismykey');
// tHiSiSmYkEy
```

### License

[MIT](LICENSE)

### Copyright

Copyright (C) 2015 Tony Ngan, released under the MIT License.

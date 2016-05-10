# Makeaform

A jQuery plugin that creates a form based on a hash options

* No dependency
* Supports Bootstrap
* 

## Installation

Include the script in HTML:

```html
<script src="/path/to/src/jquery.makeaform.js"></script>
```

Include the style in HTML:

```html
<script src="/path/to/src/jquery.makeaform.css"></script>
```

## Basic Usage

```javascript
options = {
    'token':'TOKEN',
    'secret':'SECRET',
    //'fields':{ => OPTIONAL
    //    'estado':['PR','SC','SP','RS'], => OPTIONAL
    //    'nível':['Iniciante','Intermediário','Avançado','Ninja'] => OPTIONAL
    //}
};
$('#ELEMENT-ID').makeaform(options);
```

## Modal usage

```javascript
options = {
    'token':'TOKEN',
    'secret':'SECRET',
    'modal':true,
    //'fields':{ => OPTIONAL
    //    'estado':['PR','SC','SP','RS'], => OPTIONAL
    //    'nível':['Iniciante','Intermediário','Avançado','Ninja'] => OPTIONAL
    //}
};
$('#BUTTON-ID').makeaform(options);
```

## Demo & examples

<https://douglasgimli.github.io/jquery.makeaform/examples>

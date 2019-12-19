The **context menu** is generated when you click the right mouse button on a specific element.  
When you select each menu, or click outside of the area where the menu closes.

## Load files

```html
<html>
    <head>
        ....
        <link href="tui-context-menu.css" rel="stylesheet">
    </head>
    <body>
        ....
        <script type="text/javascript" src="tui-context-menu.min.js"></script>
        ....
    </body>
</html>
```

## Write wrapper elements

```html
<!-- Tag to create the context menu -->
<div id="tui-context-menu-container"></div>

<!-- Tag to attach the context menu -->
<div id="tui-context-menu-target"></div>
```

## Create instance

```js
var menu = new tui.ContextMenu(document.getElementById('tui-context-menu-container'));
```

### Set the data to create the context menu.

* title : `string` Each menu name
* command : `string` Key value of each menu (optional)
* seperator : `boolean` Whether to use menu separators (optional)
* menu : `Array.<object>` Submenu of each menu (optional)

```js
var menuData = [
    {title: 'open'},
    {separator: true},
    {
        title: 'export',
        menu: [
            {title: 'png'},
            {title: 'jpg', command: 'exportToJPG'}
        ]
    }
]
```

### Declare a callback function for the custom event.

```js
function handleClick(e, cmd) {
    console.log(cmd); // title or command value of menu data
}
```

### Pass the following parameter to add the context menu.

* arguments[0] : `string` Element selector to create the context menu
* arguments[1] : `function` Callback function for the custom event
* arguments[2] : `Array` Menu data

```js
menu.register(document.getElementById('tui-context-menu-target'), handleClick, menuData);
```

You can see the action from [example](https://nhn.github.io/tui.context-menu/latest/tutorial-example01-basic).

## Remove the context menu

### Remove the menu only.

```js
menu.unregister(document.getElementById('tui-context-menu-target'));
```

### Remove the context-menu instance.

```js
menu.destroy();
```

The **context menu** is generated when you click the right mouse button on a specific element.  
When you select each menu, or click outside of the area where the menu closes.

Try to create the context menu in the following order.

### How to create the context menu

**[Step 1]** The following three script files to include in the html page.

```html
....
<script type="text/javascript" src="tui-code-snippet.js"></script>
<script type="text/javascript" src="tui-context-menu.js"></script>
....
```

**[Step 2]** Add tags required to create the context menu.

```html
<!-- Tag to create the context menu -->
<div id="tui-context-menu-container"></div>

<!-- Tag to attach the context menu -->
<div id="tui-context-menu-target"></div>
```

**[Step 3]** Create a instance of ContextMenu.

```js
var menu = new tui.ContextMenu(document.getElementById('tui-context-menu-container'));
```

**[Step 4-1]** Set the data to create the context menu.
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

**[Step 4-2]** Declare a callback function for the custom event.

```js
function handleClick(e, cmd) {
    console.log(cmd); // title or command value of menu data
}
```

**[Step 4-3]** Pass the following parameter to add the context menu.
 * arguments[0] : `string` Element selector to create the context menu
 * arguments[1] : `function` Callback function for the custom event
 * arguments[2] : `Array` Menu data

```js
menu.register(document.getElementById('tui-context-menu-target'), handleClick, menuData);
```

You can see the action from [example](https://nhnent.github.io/tui.context-menu/latest/tutorial-example01-basic.html).

### How to remove the context menu

**If you remove the menu only**
```js
menu.unregister(document.getElementById('tui-context-menu-target'));
```

**If you want to remove the object**
```js
menu.destroy();
```

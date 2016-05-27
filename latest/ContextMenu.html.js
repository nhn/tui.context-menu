tui.util.defineNamespace("fedoc.content", {});
fedoc.content["ContextMenu.html"] = "<div id=\"main\" class=\"main\">\n\n\n\n\n<section>\n\n<header>\n    \n        <h2>\n        \n        ContextMenu\n        \n        \n        </h2>\n        \n    \n</header>\n\n<article>\n    \n    <div class=\"container-overview\">\n    \n        \n<div class=\"\">\n<dt>\n    \n        <h4 class=\"name\" id=\"ContextMenu\">\n            <span class=\"type-signature\"></span>new ContextMenu<span class=\"signature\">(container, options)</span><span class=\"type-signature\"></span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 34</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>Constructor</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n    <div class=\"container-params\">\n        <div class=\"params\">\n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>container</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">HTMLElement</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>container for placing context menu<br> floating layers</p></td>\n        </tr>\n\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>options</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">object</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>options for context menu</p>\n                <h6>Properties:</h6>\n                \n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n        <th>Attributes</th>\n        \n\n        \n        <th>Default</th>\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>delay</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">number</span>\n\n\n            \n            </td>\n\n            \n                <td class=\"attributes\">\n                \n                    &lt;optional><br>\n                \n\n                \n\n                \n                </td>\n            \n\n            \n                <td class=\"default\">\n                \n                    100\n                \n                </td>\n            \n\n            <td class=\"description last\"><p>delay for displaying submenu</p></td>\n        </tr>\n\n    \n    </tbody>\n</table>\n            </td>\n        </tr>\n\n    \n    </tbody>\n</table></div>\n    </div>\n    \n\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n        <h5>Example</h5>\n        \n    <pre class=\"prettyprint\"><code>var menu = new tui.component.ContextMenu(document.querySelector('#fl'));</code></pre>\n\n    \n</dd>\n</div>\n\n    \n    </div>\n    \n\n    \n\n    \n\n    \n\n     \n\n    \n\n    \n    <div class=\"container-members\">\n        <h3 class=\"subsection-title\">Members</h3>\n\n        <dl>\n            \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"activeLayer\">\n        <span class=\"type-signature\"></span>activeLayer<span class=\"type-signature\"> :FloatingLayer</span>\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 54</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n\n    <!--\n    \n        <h5>Type:</h5>\n        <ul>\n            <li>\n                \n<span class=\"param-type\">FloatingLayer</span>\n\n\n            </li>\n        </ul>\n    \n    -->\n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"cloneMouseMoveEvent\">\n        <span class=\"type-signature\"></span>cloneMouseMoveEvent<span class=\"type-signature\"> :function</span>\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 64</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n\n    <!--\n    \n        <h5>Type:</h5>\n        <ul>\n            <li>\n                \n<span class=\"param-type\">function</span>\n\n\n            </li>\n        </ul>\n    \n    -->\n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"container\">\n        <span class=\"type-signature\"></span>container<span class=\"type-signature\"> :HTMLElement</span>\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 44</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n\n    <!--\n    \n        <h5>Type:</h5>\n        <ul>\n            <li>\n                \n<span class=\"param-type\">HTMLElement</span>\n\n\n            </li>\n        </ul>\n    \n    -->\n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"layerMap\">\n        <span class=\"type-signature\"></span>layerMap<span class=\"type-signature\"> :Map</span>\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 49</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n\n    <!--\n    \n        <h5>Type:</h5>\n        <ul>\n            <li>\n                \n<span class=\"param-type\">Map</span>\n\n\n            </li>\n        </ul>\n    \n    -->\n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"options\">\n        <span class=\"type-signature\"></span>options<span class=\"type-signature\"> :object</span>\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 40</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n\n    <!--\n    \n        <h5>Type:</h5>\n        <ul>\n            <li>\n                \n<span class=\"param-type\">object</span>\n\n\n            </li>\n        </ul>\n    \n    -->\n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"pageScrolled\">\n        <span class=\"type-signature\"></span>pageScrolled<span class=\"type-signature\"> :boolean</span>\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 59</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n\n    <!--\n    \n        <h5>Type:</h5>\n        <ul>\n            <li>\n                \n<span class=\"param-type\">boolean</span>\n\n\n            </li>\n        </ul>\n    \n    -->\n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n        </dl>\n    </div>\n    \n\n    \n    <div class=\"container-methods\">\n        <h3 class=\"subsection-title\">Methods</h3>\n\n        <dl>\n            \n<div class=\"\">\n<dt>\n    \n        <h4 class=\"name\" id=\"destroy\">\n            <span class=\"type-signature\"></span>destroy<span class=\"signature\">()</span><span class=\"type-signature\"></span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 73</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>Destructor</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"\">\n<dt>\n    \n        <h4 class=\"name\" id=\"register\">\n            <span class=\"type-signature\"></span>register<span class=\"signature\">(selector, callback, menuItems)</span><span class=\"type-signature\"></span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 376</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>Register context menu</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n    <div class=\"container-params\">\n        <div class=\"params\">\n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>selector</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">string</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>css selector for displaying contextmenu at<br> secondary mouse button click</p></td>\n        </tr>\n\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>callback</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">function</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>callback for each menu item clicked</p></td>\n        </tr>\n\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>menuItems</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">Array.&lt;MenuItem></span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>menu item schema</p></td>\n        </tr>\n\n    \n    </tbody>\n</table></div>\n    </div>\n    \n\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"\">\n<dt>\n    \n        <h4 class=\"name\" id=\"unregister\">\n            <span class=\"type-signature\"></span>unregister<span class=\"signature\">(selector)</span><span class=\"type-signature\"> &rarr; {boolean}</span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 398</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>Unregister context menu</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n    <div class=\"container-params\">\n        <div class=\"params\">\n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>selector</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">string</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>css selector used for register context menu</p></td>\n        </tr>\n\n    \n    </tbody>\n</table></div>\n    </div>\n    \n\n    \n    <div class=\"container-returns\">\n        <div class=\"returns\">\n        <h5>Returns:</h5>\n        <div class=\"details\">\n        \n                \n<div class=\"param-desc\">\n    <p>whether unregister is successful?</p>\n</div>\n\n            \n        </div>\n        </div>\n    </div>\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        </dl>\n    </div>\n    \n\n    \n        <h3 class=\"subsection-title\">Type Definitions</h3>\n\n        <dl>\n                \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"~MenuItem\">\n        MenuItem\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 12</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n\n    <!--\n    \n    -->\n\n    \n\n    <div class=\"container-properties\">\n        <h5 class=\"subsection-title\">Properties:</h5>\n        <div class=\"properties\">\n        <dl class=\"details\">\n        \n\n<table class=\"props\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n        <th>Attributes</th>\n        \n\n        \n        <th>Default</th>\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>title</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">string</span>\n\n\n            \n            </td>\n\n            \n                <td class=\"attributes\">\n                \n\n                \n                </td>\n            \n\n            \n                <td class=\"default\">\n                \n                </td>\n            \n\n            <td class=\"description last\"><p>title of menu item</p></td>\n        </tr>\n\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>command</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">string</span>\n\n\n            \n            </td>\n\n            \n                <td class=\"attributes\">\n                \n                    &lt;optional><br>\n                \n\n                \n                </td>\n            \n\n            \n                <td class=\"default\">\n                \n                </td>\n            \n\n            <td class=\"description last\"><p>string for alternative of using title to command</p></td>\n        </tr>\n\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>separator</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">boolean</span>\n\n\n            \n            </td>\n\n            \n                <td class=\"attributes\">\n                \n                    &lt;optional><br>\n                \n\n                \n                </td>\n            \n\n            \n                <td class=\"default\">\n                \n                    false\n                \n                </td>\n            \n\n            <td class=\"description last\"><p>set true then this menu will use<br> separator</p></td>\n        </tr>\n\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>menu</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">Array.&lt;MenuItem></span>\n\n\n            \n            </td>\n\n            \n                <td class=\"attributes\">\n                \n                    &lt;optional><br>\n                \n\n                \n                </td>\n            \n\n            \n                <td class=\"default\">\n                \n                </td>\n            \n\n            <td class=\"description last\"><p>you can define submenu recursivly</p></td>\n        </tr>\n\n    \n    </tbody>\n</table>\n\n        </dl>\n        </div>\n    </div>\n\n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n            </dl>\n    \n\n    \n</article>\n\n</section>\n\n\n\n</div>"
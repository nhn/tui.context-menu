/**
 * @fileoverview Context menu component
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */

import * as dom from 'tui-dom';
import * as util from 'tui-code-snippet';
import FloatingLayer from './floatingLayer';
import tmpl from '../template/contextmenu.hbs';

const DEFAULT_ZINDEX = 999;

/**
 * @typedef MenuItem
 * @property {string} title - title of menu item
 * @property {string} [command] - string for alternative of using title to command
 * @property {boolean} [separator=false] - set true then this menu will use
 *  separator
 * @property {MenuItem[]} [menu] - you can define submenu recursivly
 */

/**
 * ContextMenu
 * @tutorial default
 */
class ContextMenu {
    /**
     * Constructor
     * @constructor
     * @param {HTMLElement} container - container for placing context menu floating layers
     * @param {object} options - options for context menu
     *   @param {number} [options.delay=100] - delay for displaying submenu
     * @example
     * //-- #1. Get Module --//
     * var ContextMenu = require('tui-context-menu'); // node, commonjs
     * var ContextMenu = tui.ContextMenu; // distribution file
     *
     * //-- #2. Use property --//
     * var contextMenu = new ContextMenu(...)
     */
    constructor(container, options = {
        delay: 130
    }) {
        /**
         * @type {object}
         * @private
         */
        this.options = util.extend({}, options);
        /**
         * @type {HTMLElement}
         * @private
         */
        this.container = container;

        /**
         * @type {Map}
         * @private
         */
        this.layerMap = new util.Map();

        /**
         * @type {FloatingLayer}
         * @private
         */
        this.activeLayer = null;

        /**
         * @type {boolean}
         * @private
         */
        this.pageScrolled = false;

        /**
         * @type {HTMLElement}
         */
        this.prevElement = null;

        /**
         * @type {function}
         * @private
         */
        this.cloneMouseMoveEvent = null;

        /**
         * floating layer z-index
         * @type {number}
         */
        this.zIndex = DEFAULT_ZINDEX;

        dom.on(document, 'contextmenu', this._onContextMenu, this);
    }

    /**
     * Destructor
     */
    destroy() {
        dom.off(document, 'contextmenu', this._onContextMenu, this);

        this._hideContextMenu();

        this.container = this.layerMap = this.activeLayer =
            this.pageScolled = this.cloneMouseMoveEvent = null;
    }

    /**
     * Hide activated context menu and unbind related DOM events
     * @private
     */
    _hideContextMenu() {
        const layer = this.activeLayer;

        if (!layer) {
            return;
        }

        dom.off(layer.container, 'mousemove', this.cloneMouseMoveEvent, this);
        dom.off(document, 'mousedown', this._onMouseDown, this);
        dom.off(document, 'click', this._onMouseClick, this);
        dom.off(document, 'scroll', this._onPageScroll, this);

        layer.hide();

        let hideElement = (menu) => {
            dom.css(menu, {
                display: 'none',
                marginTop: ''
            });
        };

        dom.findAll(layer.container, '.tui-contextmenu-root').forEach(hideElement);
        dom.findAll(layer.container, '.tui-contextmenu-submenu').forEach(hideElement);
        dom.findAll(layer.container, '.tui-contextmenu-selected').forEach((highlightMenu) => {
            dom.removeClass(highlightMenu, 'tui-contextmenu-selected');
        });

        this.pageScrolled = false;
        this.activeLayer = this.cloneMouseMoveEvent = null;
    }

    /**
     * Mouse down event handler for close context menu
     * @param {MouseEvent} mouseDownEvent - mouseDown event object
     * @private
     */
    _onMouseDown(mouseDownEvent) {
        var target = mouseDownEvent.target || mouseDownEvent.srcElement;

        if (!dom.closest(target, '.tui-contextmenu-root')) {
            this._hideContextMenu();
        }
    }

    /**
     * Mouse click event handler for invoking callback when click menu item
     * @param {MouseEvent} clickEvent - click MouseEvent object
     * @private
     */
    /* eslint-disable complexity */
    _onMouseClick(clickEvent) {
        const target = clickEvent.target || clickEvent.srcElement;
        const title = dom.textContent(target).trim();
        const command = dom.getData(target, 'command');
        const container = dom.closest(target, '.floating-layer');
        const isMenuButton = dom.hasClass(target, 'tui-contextmenu-button');
        const isSeparator = dom.hasClass(target, 'tui-contextmenu-separator');
        const hasSubmenu = dom.hasClass(target, 'tui-contextmenu-has-submenu');
        const isDisableButton = dom.hasClass(target, 'tui-contextmenu-disable');

        if (isDisableButton) {
            this._hideContextMenu();

            return;
        }

        if (!(container && isMenuButton) ||
            isSeparator || hasSubmenu) {
            return;
        }

        this.layerMap.forEach(layer => {
            if (container === layer.container) {
                layer.callback(clickEvent, command || title);
                this._hideContextMenu();
            }
        }, this);
    } /* eslint-ensable complexity */

    /**
     * Show menu element without veil browser viewport
     * @param {HTMLElement} element - menu element
     * @param {object} [strategy] - methods for handle situations that
     *  menu veil by browser viewports
     * @param {object} [initialStyle] - initial style before
     *  calculating new bound
     * @private
     */
    _showWithoutOverflow(
        element,
        strategy = {rightOverflow: function() {}, bottomOverflow: function() {}},
        initialStyle = {marginTop: '', marginLeft: ''}
    ) {
        dom.css(element, 'visibility', 'hidden');
        dom.css(element, initialStyle);
        dom.css(element, 'display', 'block');

        const {right: menuRight, bottom: menuBottom} = dom.getRect(element);

        const menuDoc = (element.document || element.ownerDocument).documentElement;
        const {clientWidth: viewportWidth, clientHeight: viewportHeight} = menuDoc;

        const isRightOverflowed = menuRight > viewportWidth;
        const isBottomOverflowed = menuBottom > viewportHeight;

        if (isRightOverflowed) {
            strategy.rightOverflow(element, menuRight, viewportWidth);
        }

        if (isBottomOverflowed) {
            strategy.bottomOverflow(element, menuBottom, viewportHeight);
        }

        dom.css(element, 'visibility', '');
    }

    /**
     * Show root menu element
     * @param {number} left - left pixel position
     * @param {number} top - top pixel position
     * @private
     */
    _showRootMenu(left, top) {
        const layer = this.activeLayer;

        if (!layer) {
            return;
        }

        const rootMenuElement = dom.find(layer.container, '.tui-contextmenu-root');

        layer.setBound({left, top});
        layer.show();

        this._showWithoutOverflow(
            rootMenuElement,
            {
                rightOverflow: function(el, right, viewportWidth) {
                    dom.css(el, 'marginLeft', `${viewportWidth - right}px`);
                },
                bottomOverflow: function(el, bottom, viewportHeight) {
                    dom.css(el, 'marginTop', `${viewportHeight - bottom}px`);
                }
            }
        );
    }

    /**
     * Show sub menu element
     * @param {HTMLElement} element - submenu root element
     * @private
     */
    _showSubMenu(element) {
        this._showWithoutOverflow(
            element,
            {
                rightOverflow: (el, right, viewportWidth) => {
                    dom.css(el, 'marginLeft',
                        `${(viewportWidth - right) + el.clientWidth}px`);
                },
                bottomOverflow: (el, bottom, viewportHeight) => {
                    dom.css(el, 'marginTop', `${viewportHeight - bottom}px`);
                }
            },
            {
                marginTop: '',
                marginLeft: '100%'
            }
        );
    }

    /**
     * Refresh all submenu element
     *
     * Hide elements that no related with mouse event and show others
     * @param {HTMLElement} layerOnCursor - layer element on cursor
     * @private
     */
    _refreshMenuDisplay(layerOnCursor) {
        const {container} = this.activeLayer;
        const allSubmenus = dom.findAll(container, '.tui-contextmenu-submenu');
        const layersUntilRoot = [];

        while (layerOnCursor && container !== layerOnCursor) {
            if (dom.hasClass(layerOnCursor, 'tui-contextmenu-submenu')) {
                layersUntilRoot.push(layerOnCursor);
            }

            layerOnCursor = layerOnCursor.parentNode;
        }

        allSubmenus.forEach(menuElement => {
            if (layersUntilRoot.indexOf(menuElement) < 0) {
                dom.css(menuElement, 'display', 'none');
            }
        });

        layersUntilRoot.forEach(util.bind(this._showSubMenu, this));
    }

    /**
     * Mouse move event handler for reveal context menus
     * @param {MouseEvent} mouseMoveEvent - mouse move event object
     * @private
     */
    _onMouseMove(mouseMoveEvent) {
        if (this.pageScrolled) {
            this.pageScrolled = false;

            return;
        }

        const target = mouseMoveEvent.target || mouseMoveEvent.srcElement;
        const {activeLayer} = this;

        if (this.prevElement) {
            dom.removeClass(this.prevElement, 'tui-contextmenu-selected');
        }

        if (!(activeLayer && dom.closest(target, '.tui-contextmenu-root'))) {
            return;
        }

        let layerOnCursor;

        if (dom.hasClass(target, 'tui-contextmenu-has-submenu')) {
            layerOnCursor = dom.find(target.parentNode, '.tui-contextmenu-submenu');
        } else {
            layerOnCursor = dom.closest(target, '.tui-contextmenu-submenu');
        }

        this._refreshMenuDisplay(layerOnCursor);
        this._highlightMenuHasSubmenu(layerOnCursor);
    }

    /**
     * Select
     * @param {HTMLElement} layer - current layer located mouse pointer
     * @private
     */
    _highlightMenuHasSubmenu(layer) {
        if (!layer) {
            this.prevElement = null;

            return;
        }

        let selectedMenu = dom.find(layer.parentNode, '.tui-contextmenu-button');

        dom.addClass(selectedMenu, 'tui-contextmenu-selected');

        this.prevElement = selectedMenu;
    }

    /**
     * Scroll handle for prevent break position after scrolling
     * @private
     */
    _onPageScroll() {
        this.pageScrolled = true;
    }

    /**
     * Event handler
     * @param {MouseEvent} clickEvent - mouse event object
     * @private
     */
    _onContextMenu(clickEvent) {
        const opt = this.options;

        let target = clickEvent.target || clickEvent.srcElement;
        let relatedLayer;

        while (target.parentNode) {
            let findElement = this.layerMap.get(target);

            if (findElement) {
                relatedLayer = findElement;
                break;
            }

            target = target.parentNode;
        }

        if (!relatedLayer) {
            return;
        }

        dom.preventDefault(clickEvent);

        this.activeLayer = relatedLayer;

        let position = dom.getMousePosition(clickEvent, document.body || document.documentElement);

        /* clickEvent's clientX, clientY */
        const [left, top] = position;
        const debouncedMouseMove = util.debounce(util.bind(this._onMouseMove, this), opt.delay);

        this.cloneMouseMoveEvent = function(mouseMoveEvent) {
            const virtualMouseEvent = {
                target: (mouseMoveEvent.target || mouseMoveEvent.srcElement)
            };

            debouncedMouseMove(virtualMouseEvent);
        };

        this._showRootMenu(left, top);

        dom.on(relatedLayer.container, 'mousemove', this.cloneMouseMoveEvent, this);
        dom.on(document, 'mousedown', this._onMouseDown, this);
        dom.on(document, 'click', this._onMouseClick, this);
        dom.on(document, 'scroll', this._onPageScroll, this);
    }

    /**
     * Register context menu
     * @param {string} selector - css selector for displaying contextmenu at secondary mouse button click
     * @param {function} callback - callback for each menu item clicked
     * @param {MenuItem[]} menuItems - menu item schema
     */
    register(selector, callback, menuItems) {
        const target = dom.find(selector);

        if (!target) {
            return;
        }

        const layer = new FloatingLayer(this.container);

        layer.callback = callback;
        layer.setBound({width: 'auto', height: 'auto'});
        layer.setContent(tmpl(menuItems));

        this.layerMap.set(target, layer);
    }

    /**
     * Unregister context menu
     * @param {string} selector - css selector used for register context menu
     * @returns {boolean} whether unregister is successful?
     */
    unregister(selector) {
        const {layerMap} = this;
        const target = dom.find(selector);

        if (!target) {
            return false;
        }

        const layer = layerMap.get(target);

        if (!layer) {
            return false;
        }

        layer.destroy();

        layerMap.delete(target);

        return true;
    }
}

export default ContextMenu;

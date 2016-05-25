/**
 * @fileoverview Context menu component
 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
 */
const util = tui.util;

import * as core from './core';
import tmpl from './contextmenu.hbs';

const MODALESS = {modaless: true};

/**
 * @typedef ContextMenu~MenuItem
 * @property {string} title - title of menu item
 * @property {string} [command] - string for alternative of using title to command
 * @property {boolean} [separator=false] - set true then this menu will use
 *  separator
 * @property {MenuItem[]} [menu] - you can define submenu recursivly
 */

/**
 * ContextMenu
 */
export default class ContextMenu {
    /**
     * Constructor
     * @param {HTMLElement} container - container for placing context menu
     *  floating layers
     * @param {object} options - options for context menu
     *   @param {number} [options.delay=100] - delay for displaying submenu
     * @example
     * var menu = new tui.component.ContextMenu(document.querySelector('#fl'));
     */
    constructor(container, options = {
        delay: 130
    }) {
        /**
         * @type {object}
         */
        this.options = Object.assign({}, options);
        /**
         * @type {HTMLElement}
         */
        this.container = container;

        /**
         * @type {Map}
         */
        this.layerMap = new Map();

        /**
         * @type {FloatingLayer}
         */
        this.activeLayer = null;

        /**
         * @type {boolean}
         */
        this.pageScrolled = false;

        /**
         * @type {function}
         */
        this.cloneMouseMoveEvent = null;

        dom.on(document, 'contextmenu', this._onContextMenu, this);
    }

    /**
     * Destructor
     * @api
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

        dom.findAll(layer.container, '.js-menu-root').forEach(hideElement);
        dom.findAll(layer.container, '.js-menu-submenu').forEach(hideElement);

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

        if (!dom.closest(target, '.js-menu-root')) {
            this._hideContextMenu();
        }
    }

    /**
     * Mouse click event handler for invoking callback when click menu item
     * @param {MouseEvent} clickEvent - click MouseEvent object
     * @private
     */
    _onMouseClick(clickEvent) {
        const target = clickEvent.target || clickEvent.srcElement;
        const title = dom.textContent(target).trim();
        const command = dom.getData(target, 'command');
        const container = dom.closest(target, '.floating-layer');
        const isMenuButton = dom.hasClass(target, 'js-menu-button');
        const isSeparator = dom.hasClass(target, 'js-menu-separator');
        const hasSubmenu = dom.hasClass(target, 'js-menu-has-submenu');

        if (!(container && isMenuButton)) {
            return;
        }

        if (isSeparator || hasSubmenu) {
            return;
        }

        for (let layer of this.layerMap.values()) {
            if (container === layer.container) {
                layer.callback(clickEvent, command || title);
                this._hideContextMenu();

                return;
            }
        }
    }

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
        strategy = {rightOverflow: core.noop, bottomOverflow: core.noop},
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

        const rootMenuElement = dom.find(layer.container, '.js-menu-root');

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
        const container = this.activeLayer.container;
        const allSubmenus = dom.findAll(container, '.js-menu-submenu');
        const layersUntilRoot = [];

        while (layerOnCursor && container !== layerOnCursor) {
            if (dom.hasClass(layerOnCursor, 'js-menu-submenu')) {
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
        const activeLayer = this.activeLayer;

        if (!(activeLayer && dom.closest(target, '.js-menu-root'))) {
            return;
        }

        let layerOnCursor;

        if (dom.hasClass(target, 'js-menu-has-submenu')) {
            layerOnCursor = dom.find(target.parentNode, '.js-menu-submenu');
        } else {
            layerOnCursor = dom.closest(target, '.js-menu-submenu');
        }

        this._refreshMenuDisplay(layerOnCursor);
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

        const left = clickEvent.clientX;
        const top = clickEvent.clientY;
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
     * @param {string} selector - css selector for displaying contextmenu at
     *  secondary mouse button click
     * @param {function} callback - callback for each menu item clicked
     * @param {MenuItem[]} menuItems - menu item schema
     * @api
     */
    register(selector, callback, menuItems) {
        const target = dom.find(selector);

        if (!target) {
            return;
        }

        const layer = new tui.component.FloatingLayer(this.container, MODALESS);

        layer.callback = callback;
        layer.setBound({width: 'auto', height: 'auto'});
        layer.setContent(tmpl(menuItems));

        this.layerMap.set(target, layer);
    }

    /**
     * Unregister context menu
     * @param {string} selector - css selector used for register context menu
     * @returns {boolean} whether unregister is successful?
     * @api
     */
    unregister(selector) {
        const layerMap = this.layerMap;
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

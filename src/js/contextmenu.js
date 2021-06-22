/**
 * @fileoverview Context menu component
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */

import forEachArray from 'tui-code-snippet/collection/forEachArray';
import off from 'tui-code-snippet/domEvent/off';
import on from 'tui-code-snippet/domEvent/on';
import preventDefault from 'tui-code-snippet/domEvent/preventDefault';
import addClass from 'tui-code-snippet/domUtil/addClass';
import closest from 'tui-code-snippet/domUtil/closest';
import css from 'tui-code-snippet/domUtil/css';
import getData from 'tui-code-snippet/domUtil/getData';
import hasClass from 'tui-code-snippet/domUtil/hasClass';
import removeClass from 'tui-code-snippet/domUtil/removeClass';
import extend from 'tui-code-snippet/object/extend';
import debounce from 'tui-code-snippet/tricks/debounce';

import FloatingLayer from './floatingLayer';
import Map from './Map';
import {sendHostName, getMousePosition} from './util';
import tmpl from '../template/contextmenu';

const DEFAULT_ZINDEX = 999;

/**
 * @typedef {object} MenuItem
 * @property {string} title - title of menu item
 * @property {string} [command] - string for alternative of using title to command
 * @property {boolean} [separator=false] - set true then this menu will use separator
 * @property {boolean} [disable=false] - set true then this menu will be disabled
 * @property {MenuItem[]} [menu] - you can define submenu recursivly
 */

/**
 * tui-context-menu creates a menu when the right mouse button is clicked.
 * To register a context menu, please refer to {@link ContextMenu#register}.
 * @class ContextMenu
 * @param {HTMLElement} container - container for placing context menu floating layers
 * @param {object} options - options for context menu
 *   @param {number} [options.delay=130] - delay for displaying submenu
 *   @param {boolean} [options.usageStatistics=true] Send the hostname to google analytics.
 *     If you do not want to send the hostname, this option set to false.
 * @example
 * //-- #1. Get Module --//
 * //ES6
 * import ContextMenu from 'tui-context-menu';
 * 
 * // CommonJS
 * const ContextMenu = require('tui-context-menu'); 
 * 
 * // Browser
 * const ContextMenu = tui.ContextMenu;
 *
 * //-- #2. Use property --//
 * const container = document.getElementById('context-menu');
 * const contextMenu = new ContextMenu(container);
 */
class ContextMenu {
  constructor(
    container,
    options = {
      delay: 130,
      usageStatistics: true
    }
  ) {
    /**
     * @type {object}
     * @private
     */
    this.options = extend({}, options);

    /**
     * @type {HTMLElement}
     * @private
     */
    this.container = container;

    /**
     * @type {Map}
     * @private
     */
    this.layerMap = new Map();

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
     * @private
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

    on(document, 'contextmenu', this._onContextMenu, this);

    if (this.options.usageStatistics) {
      sendHostName();
    }
  }

  /**
   * Destructor
   */
  destroy() {
    off(document, 'contextmenu', this._onContextMenu, this);

    this._hideContextMenu();

    this.container = this.layerMap = this.activeLayer = this.pageScolled = this.cloneMouseMoveEvent = null;
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

    off(layer.container, 'mousemove', this.cloneMouseMoveEvent, this);
    off(document, 'mousedown', this._onMouseDown, this);
    off(document, 'click', this._onMouseClick, this);
    off(document, 'scroll', this._onPageScroll, this);

    layer.hide();

    const hideElement = menu => {
      css(menu, {
        display: 'none',
        marginTop: ''
      });
    };

    forEachArray(layer.container.querySelectorAll('.tui-contextmenu-root'), hideElement);
    forEachArray(layer.container.querySelectorAll('.tui-contextmenu-submenu'), hideElement);
    forEachArray(layer.container.querySelectorAll('.tui-contextmenu-selected'), highlightMenu => removeClass(highlightMenu, 'tui-contextmenu-selected'));

    this.pageScrolled = false;
    this.activeLayer = this.cloneMouseMoveEvent = null;
  }

  /**
   * Mouse down event handler for close context menu
   * @param {MouseEvent} mouseDownEvent - mouseDown event object
   * @private
   */
  _onMouseDown(mouseDownEvent) {
    const target = mouseDownEvent.target || mouseDownEvent.srcElement;

    if (!closest(target, '.tui-contextmenu-root')) {
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
    const title = target.textContent.trim();
    const command = getData(target, 'command');
    const container = closest(target, '.floating-layer');
    const isMenuButton = hasClass(target, 'tui-contextmenu-button');
    const isSeparator = hasClass(target, 'tui-contextmenu-separator');
    const hasSubmenu = hasClass(target, 'tui-contextmenu-has-submenu');
    const isDisableButton = hasClass(target, 'tui-contextmenu-disable');

    if (isDisableButton) {
      this._hideContextMenu();

      return;
    }

    if (!(container && isMenuButton) || isSeparator || hasSubmenu) {
      return;
    }

    this.layerMap.forEach(layer => {
      if (container === layer.container) {
        layer.callback(clickEvent, command || title);
        this._hideContextMenu();
      }
    }, this);
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
    strategy = {rightOverflow() {}, bottomOverflow() {}},
    initialStyle = {marginTop: '', marginLeft: ''}
  ) {
    css(element, 'visibility', 'hidden');
    css(element, initialStyle);
    css(element, 'display', 'block');

    const {right: menuRight, bottom: menuBottom} = element.getBoundingClientRect();

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

    css(element, 'visibility', '');
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

    const rootMenuElement = layer.container.querySelector('.tui-contextmenu-root');

    layer.setBound({left, top});
    layer.show();

    this._showWithoutOverflow(rootMenuElement, {
      rightOverflow(el, right, viewportWidth) {
        css(el, 'marginLeft', `${viewportWidth - right}px`);
      },
      bottomOverflow(el, bottom, viewportHeight) {
        css(el, 'marginTop', `${viewportHeight - bottom}px`);
      }
    });
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
          css(el, 'marginLeft', `${viewportWidth - right + el.clientWidth}px`);
        },
        bottomOverflow: (el, bottom, viewportHeight) => {
          css(el, 'marginTop', `${viewportHeight - bottom}px`);
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
    const allSubmenus = container.querySelectorAll('.tui-contextmenu-submenu');
    const layersUntilRoot = [];

    while (layerOnCursor && container !== layerOnCursor) {
      if (hasClass(layerOnCursor, 'tui-contextmenu-submenu')) {
        layersUntilRoot.push(layerOnCursor);
      }

      layerOnCursor = layerOnCursor.parentNode;
    }

    forEachArray(allSubmenus, menuElement => {
      if (layersUntilRoot.indexOf(menuElement) < 0) {
        css(menuElement, 'display', 'none');
      }
    });

    forEachArray(layersUntilRoot, elem => this._showSubMenu(elem));
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
      removeClass(this.prevElement, 'tui-contextmenu-selected');
    }

    if (!(activeLayer && closest(target, '.tui-contextmenu-root'))) {
      return;
    }

    let layerOnCursor;

    if (hasClass(target, 'tui-contextmenu-has-submenu')) {
      layerOnCursor = target.parentNode.querySelector('.tui-contextmenu-submenu');
    } else {
      layerOnCursor = closest(target, '.tui-contextmenu-submenu');
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

    const selectedMenu = layer.parentNode.querySelector('.tui-contextmenu-button');

    addClass(selectedMenu, 'tui-contextmenu-selected');

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
      const findElement = this.layerMap.get(target);

      if (findElement) {
        relatedLayer = findElement;
        break;
      }

      target = target.parentNode;
    }

    if (!relatedLayer) {
      return;
    }

    preventDefault(clickEvent);

    this.activeLayer = relatedLayer;

    const {left, top} = getMousePosition(clickEvent, this.activeLayer.container);

    const debouncedMouseMove = debounce(mouseMoveEvent => this._onMouseMove(mouseMoveEvent), opt.delay);

    this.cloneMouseMoveEvent = function(mouseMoveEvent) {
      const virtualMouseEvent = {
        target: mouseMoveEvent.target || mouseMoveEvent.srcElement
      };

      debouncedMouseMove(virtualMouseEvent);
    };

    this._showRootMenu(left, top);

    on(relatedLayer.container, 'mousemove', this.cloneMouseMoveEvent, this);
    on(document, 'mousedown', this._onMouseDown, this);
    on(document, 'click', this._onMouseClick, this);
    on(document, 'scroll', this._onPageScroll, this);
  }

  /**
   * Register context menu
   * @param {string} selector - css selector for displaying contextmenu at secondary mouse button click
   * @param {function} callback - callback for each menu item clicked
   * @param {MenuItem[]} menuItems - {@link MenuItem} schema
   * @example
   * const contextMenu = new ContextMenu(document.getElementById('context-menu'));
   * 
   * function onClick(ev, cmd) {
   *   console.log(`${ev.type}ed ${cmd}.`);
   * }
   * 
   * contextMenu.register('#folder', [
   *   {title: 'Open'},
   *   {
   *     title: 'Create',
   *     menu: [
   *       {title: 'a File', cmd: 'Create a file'},
   *       {title: 'a Folder', cmd: 'Create a folder'}
   *     ]
   *   }
   * ]);
   * 
   * // When click 'a File': "Create a file"
   */
  register(selector, callback, menuItems) {
    const target = document.querySelector(selector);

    if (!target) {
      return;
    }

    const layer = new FloatingLayer(this.container);

    layer.callback = callback;
    layer.setBound({width: 'auto', height: 'auto'});
    layer.setContent(tmpl({
      root: true,
      menuItems,
      tmpl: menu => tmpl({menuItems: menu, tmpl})
    }));

    this.layerMap.set(target, layer);
  }

  /**
   * Unregister context menu
   * @param {string} selector - css selector used for register context menu
   * @returns {boolean} whether unregister is successful?
   */
  unregister(selector) {
    const {layerMap} = this;
    const target = document.querySelector(selector);

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

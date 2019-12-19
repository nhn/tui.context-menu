import forEachOwnProperties from 'tui-code-snippet/collection/forEachOwnProperties';
import addClass from 'tui-code-snippet/domUtil/addClass';
import css from 'tui-code-snippet/domUtil/css';
import removeElement from 'tui-code-snippet/domUtil/removeElement';
import extend from 'tui-code-snippet/object/extend';
import isExisty from 'tui-code-snippet/type/isExisty';
import isNumber from 'tui-code-snippet/type/isNumber';

/**
 * @class
 * @private
 * @classdesc Class representing floating layer of context menu
 */
class FloatingLayer {
  /**
   * Create a floating layer
   * @constructor
   * @param {HTMLElement} manager - parent element contains floating layer
   */
  constructor(manager) {
    /**
     * Base container element for each view instance
     * @type {HTMLElement}
     */
    this.container = document.createElement('div');
    this.initializeContainer(manager);
  }

  initializeContainer(manager) {
    manager.appendChild(this.container);

    css(this.container, {
      display: 'none',
      position: 'absolute',
      'z-index': manager.zIndex
    });
    addClass(this.container, 'floating-layer');
  }

  /**
   * Destroy view instance
   */
  destroy() {
    removeElement(this.container);

    this.container = null;
  }

  /**
   * Set layer content
   * @param {string} html - html string
   */
  setContent(html) {
    this.container.innerHTML = html;
  }

  /**
   * Set container's size and position
   * @param {object} bound - bound rect
   *   @param {number} [options.top] - top pixel
   *   @param {number} [options.right] - right pixel
   *   @param {number} [options.bottom] - bottom pixel
   *   @param {number} [options.left] - left pixel
   *   @param {number} [options.width] - width pixel
   *   @param {number} [options.height] - height pixel
   */
  setBound(bound) {
    const newBound = {};

    forEachOwnProperties(bound, (value, prop) => {
      if (isExisty(value)) {
        newBound[prop] = isNumber(value) ? `${value}px` : value;
      }
    });

    extend(this.container.style, newBound);
  }

  /**
   * Show layer
   */
  show() {
    css(this.container, 'display', 'block');
  }

  /**
   * Hide layer
   */
  hide() {
    css(this.container, 'display', 'none');
  }
}

export default FloatingLayer;

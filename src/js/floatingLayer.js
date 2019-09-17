import * as dom from 'tui-dom';

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

    dom.css(this.container, {
      display: 'none',
      position: 'absolute',
      'z-index': manager.zIndex
    });
    dom.addClass(this.container, 'floating-layer');
  }

  /**
   * Destroy view instance
   */
  destroy() {
    dom.removeElement(this.container);

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
    dom.setBound(this.container, bound);
  }

  /**
   * Show layer
   */
  show() {
    dom.css(this.container, 'display', 'block');
  }

  /**
   * Hide layer
   */
  hide() {
    dom.css(this.container, 'display', 'none');
  }
}

export default FloatingLayer;

const dom = tui.dom;

/** Class representing floating layer of context menu */
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

        /**
         * Cache for container bound
         * @param {object} options - options
         *   @param {number} options.top - top pixel
         *   @param {number} options.right - right pixel
         *   @param {number} options.bottom - bottom pixel
         *   @param {number} options.left - left pixel
         *   @param {number} options.width - width pixel
         *   @param {number} options.height - height pixel
         */
        this.boundCache = null;
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

        this.container = this.boundCache = null;
    }

    /**
     * Set layer content
     * @param {string} html - html string
     */
    setContent(html) {
        this.container.innerHTML = html;
    }

    /**
     * Get container's size and position. return bounds from getBoundingClientRect()
     * It return cached bounds until View.boundCache exists for performance issue.
     * If you want re-calculate conatiner's bound then use bound setter or just clear boundCache property.
     * @returns {object} options - options
     *   @returns {number} options.top - top pixel
     *   @returns {number} options.right - right pixel
     *   @returns {number} options.bottom - bottom pixel
     *   @returns {number} options.left - left pixel
     *   @returns {number} options.width - width pixel
     *   @returns {number} options.height - height pixel
     */
    getBound() {
        let bound = this.boundCache;

        if (!bound) {
            bound = this.boundCache = dom.getRect(this.container);
        }

        return bound;
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
        dom.setBound(
            this.container,
            bound
        );

        this.boundCache = null;
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

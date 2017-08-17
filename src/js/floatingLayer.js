const dom = tui.dom;

class FloatingLayer {

    constructor() {
        var container = document.createElement('div');

        dom.css(container, {
            display: 'none',
            position: 'absolute',
            'z-index': 999
        });
        dom.addClass(container, 'floating-layer');

        /**
         * Base container element for each view instance
         * @type {HTMLElement}
         */
        this.container = container;

        /**
         * Cache for container bound
         */
        this.boundCache = null;
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
     * Get container's size and position. return bounds from
     *  getBoundingClientRect()
     *
     * It return cached bounds until View.boundCache exists for performance iss
     * ue. if you want re-calculate conatiner's bound then use bound setter or
     * just clear boundCache
     * property.
     * @returns {object} size and position
     */
    getBound() {
        let bound = this.boundCache;

        if (!bound) {
            bound = this.boundCache =
                Object.assign({}, dom.getRect(this.container));
        }

        return bound;
    }

    /**
     * Set container's size and position
     * @param {object} options - options
     * @param {number} [options.top] - top pixel
     * @param {number} [options.right] - right pixel
     * @param {number} [options.bottom] - bottom pixel
     * @param {number} [options.left] - left pixel
     * @param {number} [options.width] - width pixel
     * @param {number} [options.height] - height pixel
     */
    setBound({top, right, bottom, left, width, height} = {}) {
        dom.setBound(
            this.container,
            {top, right, bottom, left, width, height}
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

tui.util.CustomEvents.mixin(FloatingLayer);

export default FloatingLayer;

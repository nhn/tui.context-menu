/**
 * @fileoverview Utils for ContextMenu component
 */

import sendHostname from 'tui-code-snippet/request/sendHostname';

/**
 * Send hostname for GA
 * @ignore
 */
export const sendHostName = () => {
  sendHostname('context-menu', 'UA-129987462-1');
};

/**
   * Get mouse postion
   * @param {MouseEvent} clickEvent - mouse event object
   * @returns {Object} object of mouse position contains left and top
   * @private
   */
export const getMousePosition = clickEvent => {
  const {pageX: left, pageY: top} = clickEvent;

  return {left, top};
};

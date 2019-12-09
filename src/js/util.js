/**
 * @fileoverview Utils for ContextMenu component
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */

import sendHostname from 'tui-code-snippet/request/sendHostname';

/**
 * Send hostname for GA
 * @ignore
 */
export const sendHostName = () => {
  sendHostname('context-menu', 'UA-129987462-1');
};

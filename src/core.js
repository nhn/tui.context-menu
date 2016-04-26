/**
 * @fileoverview Core utility methods module
 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
 */
const util = tui.util;

/**
 * A no-operation function that returns undefined regardless of the arguments
 *  it receives.
 */
export function noop() {}

/**
 * Create a duplicate-free version of an array
 * @param {Array} array - The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 */
export function uniq(array) {
    return [...new Set(array)];
}


/**
 * @param {Collection} collection - The collection to iterate over.
 * @param {function} [iteratee] - The function invoked per iteration.
 * @param {*} accumulator - The initial value.
 * @returns {*} Returns the accumulated value.
 */
export function reduce(collection, iteratee, accumulator) {
    if (util.isArray(collection)) {
        if (accumulator) {
            return collection.reduce(iteratee, accumulator);
        }

        return collection.reduce(iteratee);
    }

    util.forEach(collection, function(value, index) {
        if (typeof accumulator === 'undefined') {
            accumulator = value;
        } else {
            accumulator = iteratee(accumulator, value, index);
        }
    });

    return accumulator;
}

/**
 * Removes all elements from array that predicate returns truthy for and
 *  returns an array of the removed elements. The predicate is invoked with
 *  three arguments: (value, index, array).
 * @param {Array} array - The array to modify.
 * @param {(Function|String|Number)} predicate - The function invoked per
 *  iteration.
 * @returns {Array} Returns the new array of removed elements.
 */
export function remove(array, predicate) {
    let match;

    if (util.isFunction(predicate)) {
        match = function(v) {
            return predicate(v);
        };
    } else {
        match = function(v) {
            return predicate === v;
        };
    }

    let removed = [];

    for (let idx = 0, len = array.length; idx < len; idx += 1) {
        let value = array[idx];
        if (match(value, idx, array)) {
            removed.push(value);
            array.splice(idx, 1);
            len -= 1;
            idx -= 1;
        }
    }

    return removed;
}

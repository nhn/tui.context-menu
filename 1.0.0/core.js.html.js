tui.util.defineNamespace("fedoc.content", {});
fedoc.content["core.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Core utility methods module\n * @author NHN Ent. FE Development team &lt;dl_javascript@nhnent.com>\n */\nconst util = tui.util;\n\n/**\n * A no-operation function that returns undefined regardless of the arguments\n *  it receives.\n */\nexport function noop() {}\n\n/**\n * Create a duplicate-free version of an array\n * @param {Array} array - The array to inspect.\n * @returns {Array} Returns the new duplicate free array.\n */\nexport function uniq(array) {\n    return [...new Set(array)];\n}\n\n\n/**\n * @param {Collection} collection - The collection to iterate over.\n * @param {function} [iteratee] - The function invoked per iteration.\n * @param {*} accumulator - The initial value.\n * @returns {*} Returns the accumulated value.\n */\nexport function reduce(collection, iteratee, accumulator) {\n    if (util.isArray(collection)) {\n        if (accumulator) {\n            return collection.reduce(iteratee, accumulator);\n        }\n\n        return collection.reduce(iteratee);\n    }\n\n    util.forEach(collection, function(value, index) {\n        if (typeof accumulator === 'undefined') {\n            accumulator = value;\n        } else {\n            accumulator = iteratee(accumulator, value, index);\n        }\n    });\n\n    return accumulator;\n}\n\n/**\n * Removes all elements from array that predicate returns truthy for and\n *  returns an array of the removed elements. The predicate is invoked with\n *  three arguments: (value, index, array).\n * @param {Array} array - The array to modify.\n * @param {(Function|String|Number)} predicate - The function invoked per\n *  iteration.\n * @returns {Array} Returns the new array of removed elements.\n */\nexport function remove(array, predicate) {\n    let match;\n\n    if (util.isFunction(predicate)) {\n        match = function(v) {\n            return predicate(v);\n        };\n    } else {\n        match = function(v) {\n            return predicate === v;\n        };\n    }\n\n    let removed = [];\n\n    for (let idx = 0, len = array.length; idx &lt; len; idx += 1) {\n        let value = array[idx];\n        if (match(value, idx, array)) {\n            removed.push(value);\n            array.splice(idx, 1);\n            len -= 1;\n            idx -= 1;\n        }\n    }\n\n    return removed;\n}\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"
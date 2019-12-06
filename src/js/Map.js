import inArray from 'tui-code-snippet/array/inArray';
import forEachArray from 'tui-code-snippet/collection/forEachArray';
import isArray from 'tui-code-snippet/type/isArray';

/**
 * @class
 * @private
 * @classdesc ES6 Map
 */
class Map {
  constructor(initData) {
    this._keys = [];
    this._values = [];

    if (initData) {
      this.set(initData);
    }
  }

  _getKeyIndex(key) {
    return inArray(key, this._keys);
  }

  get(key) {
    return this._values[this._getKeyIndex(key)];
  }

  _setOne(key, value) {
    const keyIndex = this._getKeyIndex(key);

    if (keyIndex > -1) {
      this._values[keyIndex] = value;
    } else {
      this._keys.push(key);
      this._values.push(value);
    }
  }

  set(key, value) {
    if (isArray(key)) {
      forEachArray(key, ([k, v]) => this._setOne(k, v));
    } else {
      this._setOne(key, value);
    }
  }

  has(key) {
    return this._getKeyIndex(key) > -1;
  }

  delete(key) {
    const keyIndex = this._getKeyIndex(key);

    if (keyIndex > -1) {
      this._keys.splice(keyIndex, 1);
      this._values.splice(keyIndex, 1);
    }
  }

  forEach(callback, thisArg = this) {
    forEachArray(this._values, (value, index) => {
      callback.call(thisArg, value, this._keys[index]);
    });
  }
}

export default Map;

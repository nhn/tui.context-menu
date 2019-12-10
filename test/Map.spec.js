/* eslint-disable no-undefined */
import Map from '../src/js/Map';

describe('Map', () => {
  let map;

  beforeEach(() => {
    map = new Map();
  });

  describe('set() and get()', () => {
    it('for the string key', () => {
      map.set('company', 'NHN');
      map.set('team', 'FE');

      expect(map.get('company')).toEqual('NHN');
      expect(map.get('team')).toEqual('FE');
    });

    it('for the object key', () => {
      const key1 = {},
        key2 = function() {},
        key3 = [];

      map.set(key1, 'object');
      map.set(key2, 'function');
      map.set(key3, 'array');

      expect(map.get(key1)).toEqual('object');
      expect(map.get(key2)).toEqual('function');
      expect(map.get(key3)).toEqual('array');
    });

    describe('if the key already exists, set() updates the value', () => {
      it('with string key', () => {
        map.set('key', 'once');
        map.set('key', 'again');
        expect(map.get('key')).toEqual('again');
      });

      it('with object key', () => {
        const key = {};

        map.set(key, 'once');
        map.set(key, 'again');
        expect(map.get(key)).toEqual('again');
      });
    });

    describe('get() returns undefined', () => {
      it('if the key does not exist', () => {
        expect(map.get('key')).toBeUndefined();
      });

      it('if the value is undefined', () => {
        map.set('key', undefined);
        expect(map.get('key')).toBeUndefined();
      });
    });

    describe('primitive values', () => {
      it('can be used for the key', () => {
        map.set(null, 'null');
        map.set(undefined, 'undefined');
        map.set(true, 'true');
        map.set(false, 'false');
        map.set(1, 'one');

        expect(map.get(null)).toEqual('null');
        expect(map.get(undefined)).toEqual('undefined');
        expect(map.get(true)).toEqual('true');
        expect(map.get(false)).toEqual('false');
        expect(map.get(1)).toEqual('one');
      });

      it('are not equal to string keys', () => {
        map.set(null, 'null');
        map.set('null', 'null string');
        map.set(1, 'one');
        map.set('1', 'one string');

        expect(map.get(null)).toEqual('null');
        expect(map.get('null')).toEqual('null string');
        expect(map.get(1)).toEqual('one');
        expect(map.get('1')).toEqual('one string');
      });
    });
  });

  describe('has()', () => {
    it('returns true if the key exists', () => {
      map.set(1, 'one');
      expect(map.has(1)).toBe(true);
    });

    it('returns true even if value is undefined', () => {
      map.set(1, undefined);
      expect(map.has(1)).toBe(true);
      expect(map.get(1)).toBeUndefined();
    });

    it('returns false if the key does not exists', () => {
      expect(map.has(1)).toBe(false);
    });
  });

  describe('delete() removes the element', () => {
    it('for the string key', () => {
      map.set('1', 'one');
      map.delete('1');
      expect(map.has('1')).toBe(false);
    });

    it('for the object key', () => {
      const key = {};

      map.set(key, 'value');
      map.delete(key);
      expect(map.has(key)).toBe(false);
    });

    it('delete and set again', () => {
      const key = {};

      map.set(key, 'once');
      map.delete(key);
      map.set(key, 'again');
      expect(map.get(key)).toBe('again');
    });

    it('delete and set again with undefined key', () => {
      map.set(undefined, 'once');
      map.delete(undefined);
      expect(map.has(undefined)).toBe(false);

      map.set(undefined, 'again');
      expect(map.get(undefined)).toBe('again');
    });

    it('deleted key is not undefined key', () => {
      map.set(1, 'one');
      map.set(undefined, 'undefined');
      map.delete(1);

      expect(map.get(undefined)).toBe('undefined');
    });
  });

  describe('forEach() executes a function once per each key/value pair', () => {
    let string;

    beforeEach(() => {
      string = '';
      map.set(1, '1');
      map.set(null, '2');
      map.set('3', '3');
    });

    it('in insertion order', () => {
      map.forEach(value => {
        string += value;
      });
      expect(string).toEqual('123');
    });

    it('second argument is key', () => {
      map.forEach((value, key) => {
        string += key;
      });
      expect(string).toEqual('1null3');
    });

    it('third argument is map itself', () => {
      map.forEach((value, key, thisMap) => {
        string += thisMap.get(key);
      });
      expect(string).toEqual('123');
    });

    it('context can be set', () => {
      const context = {value: '0'};

      // eslint-disable-next-line prefer-arrow-callback
      map.forEach(function(value) {
        string += value + this.value;
      }, context);
      expect(string).toEqual('102030');
    });
  });
});

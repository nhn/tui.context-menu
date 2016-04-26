var core = tui.component.ContextMenu.core;

describe('core', function() {
    it('uniq', function() {
        expect(core.uniq(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
        expect(core.uniq([1, 2, 1, 3])).toEqual([1, 2, 3]);
        expect(core.uniq([1, 2, '1', 3])).toEqual([1, 2, '1', 3]);
    });

    it('reduce', function() {
        var arr = [1, 2, 3],
            obj = {'a': 1, 'b': 2};

        expect(core.reduce(arr, function(acc, value) {
            return acc + value;
        })).toBe(6);

        expect(core.reduce(arr, function(acc, value) {
            return acc + value;
        }, 1)).toBe(7);

        expect(core.reduce(obj, function(acc, value) {
            return acc + value;
        })).toBe(3);

        expect(core.reduce(obj, function(acc, value, key) {
            acc[key + 'z'] = value;

            return acc;
        }, {})).toEqual({az: 1, bz: 2});
    });

    it('remove', function() {
        var arr = [1, 2, 3, 4, 5];

        expect(core.remove(arr, function(v) {
            return v === 3;
        })).toEqual([3]);
        expect(arr).toEqual([1, 2, 4, 5]);

        arr = ['a', 'b', 'c'];

        expect(core.remove(arr, 'c')).toEqual(['c']);
        expect(arr).toEqual(['a', 'b']);
    });
});

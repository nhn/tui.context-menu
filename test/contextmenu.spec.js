import * as dom from 'tui-dom';
import ContextMenu from '../src/js/contextmenu.js';

describe('ContextMenu component', function() {
    beforeEach(function() {
        fixture.set('<style>html, body { overflow: hidden; }</style>' +
                    '<div id="menu1"></div>' +
                    '<div id="menu2"></div>' +
                    '<div id="flContainer"></div>');
    });

    it('use selector for displaying context menu.', function() {
        const cm = new ContextMenu(document.querySelector('#flContainer'));

        cm.register('#menu1', null, [{
            title: 'open'
        }]);

        const menu1Element = document.querySelector('#menu1');

        expect(cm.layerMap.has(menu1Element)).toBe(true);
    });

    it('show context menus that only below of mouse cursor.', function() {
        const cm = new ContextMenu(document.querySelector('#flContainer'));

        cm.register('#menu1', null, [
            {
                title: 'a',
                menu: [{
                    title: 'a-1'
                }]
            },
            {
                title: 'b',
                menu: [{
                    title: 'b-1'
                }]
            },
            {
                title: 'c',
                menu: [{
                    title: 'c-1'
                }]
            }
        ]);

        cm.activeLayer = cm.layerMap.values().next().value;

        const mockMouseMove = {
            target: document.querySelectorAll('.tui-contextmenu-button')[3],
            preventDefault: function() {}
        };

        cm._onMouseMove(mockMouseMove);

        const needHided = document.querySelectorAll('.tui-contextmenu-submenu');

        expect(needHided[0].style.display).toBe('none');
        expect(needHided[1].style.display).toBe('block');
        expect(needHided[2].style.display).toBe('none');
    });

    it('invoke callback when menu item clicked.', function() {
        const cm = new ContextMenu(document.querySelector('#flContainer')),
            callback = jasmine.createSpy('contextMenu');

        cm.register('#menu1', callback, [{
            title: 'open'
        }]);

        const layer = cm.layerMap.values().next().value;

        const mockMouseClick = {
            target: layer.container.querySelector('.tui-contextmenu-button'),
            preventDefault: function() {}
        };

        cm._onMouseClick(mockMouseClick);

        expect(callback).toHaveBeenCalledWith(mockMouseClick, 'open');
    });

    it('can unregister registered context menu.', function() {
        const cm = new ContextMenu(document.querySelector('#flContainer')),
            callback = jasmine.createSpy('contextMenu');

        cm.register('#menu1', callback, [{
            title: 'open'
        }]);

        cm.unregister('#menu1');

        expect(cm.layerMap.size).toBe(0);
        expect(document.querySelectorAll('.floating-layer').length).toBe(0);
    });

    describe('can placing', function() {
        let ce, vWidth, vHeight;

        beforeEach(function() {
            ce = new ContextMenu(document.querySelector('#flContainer'));

            ce.register('#menu1', null, [
                {title: 'root-a'},
                {
                    title: 'root-b',
                    menu: [
                        {title: 'sub-a'},
                        {title: 'sub-b'}
                    ]
                },
                {title: 'root-c'}
            ]);

            ce.activeLayer = ce.layerMap.values().next().value;

            vWidth = document.documentElement.clientWidth;
            vHeight = document.documentElement.clientHeight;
        });

        it('menu element.', function() {
            let menu;

            ce._showRootMenu(10, 10);

            menu = dom.find(ce.activeLayer.container, '.tui-contextmenu-root');
            expect(menu.style.marginLeft).toBe('');
            expect(menu.style.marginTop).toBe('');
        });

        it('root menu element without veil viewport limit.', function() {
            let menu;

            // When it is rendering outside of viewport,
            // size of menu is set to 180 as a default
            ce._showRootMenu(vWidth - 20, vHeight - 20);

            menu = dom.find(ce.activeLayer.container, '.tui-contextmenu-root');
            expect(menu.style.marginLeft).not.toBe('');
            expect(menu.style.marginTop).not.toBe('');
        });
    });

    describe('has disable property in menu data,', function() {
        let cm, callback;

        beforeEach(function() {
            cm = new ContextMenu(document.querySelector('#flContainer'));
            callback = jasmine.createSpy('contextMenu');

            cm.register('#menu1', callback, [
                {title: 'menu-disable1', disable: true},
                {title: 'menu-enable'},
                {title: 'menu-disable2', disable: true}
            ]);
        });

        it('menus that have disable state are generated.', function() {
            var menus = cm.container.querySelectorAll('.tui-contextmenu-disable');

            expect(menus.length).toEqual(2);
        });

        it('when click the disabled menu, the context menu is hidden.', function() {
            var mockMouseClick = {
                target: cm.container.querySelector('.tui-contextmenu-disable'),
                preventDefault: function() {}
            };

            spyOn(cm, '_hideContextMenu');

            cm._onMouseClick(mockMouseClick);

            expect(cm._hideContextMenu).toHaveBeenCalled();
        });
    });
});

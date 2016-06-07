/* eslint vars-on-top: 0 */
var ContextMenu = tui.component.ContextMenu;

describe('ContextMenu component', function() {
    beforeEach(function() {
        fixture.set('<style>html, body { overflow: hidden; }</style>' +
                    '<div id="menu1"></div>' +
                    '<div id="menu2"></div>' +
                    '<div id="flContainer"></div>');
    });

    it('use selector for displaying context menu.', function() {
        var cm = new ContextMenu(document.querySelector('#flContainer'));

        cm.register('#menu1', null, [{
            title: 'open'
        }]);

        var menu1Element = document.querySelector('#menu1');
        expect(cm.layerMap.has(menu1Element)).toBe(true);
    });

    it('show context menus that only below of mouse cursor.', function() {
        var cm = new ContextMenu(document.querySelector('#flContainer'));

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

        var mockMouseMove = {
            target: document.querySelectorAll('.js-menu-button')[3],
            preventDefault: function() {}
        };

        cm._onMouseMove(mockMouseMove);

        var needHided = document.querySelectorAll('.js-menu-submenu');
        expect(needHided[0].style.display).toBe('none');
        expect(needHided[1].style.display).toBe('block');
        expect(needHided[2].style.display).toBe('none');
    });

    it('invoke callback when menu item clicked.', function() {
        var cm = new ContextMenu(document.querySelector('#flContainer')),
            callback = jasmine.createSpy('contextMenu');

        cm.register('#menu1', callback, [{
            title: 'open'
        }]);

        var layer = cm.layerMap.values().next().value;

        var mockMouseClick = {
            target: layer.container.querySelector('.js-menu-button'),
            preventDefault: function() {}
        };

        cm._onMouseClick(mockMouseClick);

        expect(callback).toHaveBeenCalledWith(mockMouseClick, 'open');
    });

    it('can unregister registered context menu.', function() {
        var cm = new ContextMenu(document.querySelector('#flContainer')),
            callback = jasmine.createSpy('contextMenu');

        cm.register('#menu1', callback, [{
            title: 'open'
        }]);

        cm.unregister('#menu1');

        expect(cm.layerMap.size).toBe(0);
        expect(document.querySelectorAll('.floating-layer').length).toBe(0);
    });

    describe('can placing', function() {
        var ce, vWidth, vHeight;

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
            var menu;

            ce._showRootMenu(10, 10);

            menu = dom.find(ce.activeLayer.container, '.js-menu-root');
            expect(menu.style.marginLeft).toBe('');
            expect(menu.style.marginTop).toBe('');
        });

        it('root menu element without veil viewport limit.', function() {
            var menu;

            // 화면을 벗어난 지점에 렌더링 된 경우
            // menu의 기본 크기는 180
            ce._showRootMenu(vWidth - 20, vHeight - 20);

            menu = dom.find(ce.activeLayer.container, '.js-menu-root');
            expect(menu.style.marginLeft).not.toBe('');
            expect(menu.style.marginTop).not.toBe('');
        });
    });

    describe('has disable property in menu data,', function() {
        var cm, callback, layer;

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
            var menus = cm.container.querySelectorAll('.js-menu-disable');

            expect(menus.length).toEqual(2);
        });

        it('when click the disabled menu, the context menu is hidden.', function() {
            var mockMouseClick = {
                target: cm.container.querySelector('.js-menu-disable'),
                preventDefault: function() {}
            };

            spyOn(cm, '_hideContextMenu');

            cm._onMouseClick(mockMouseClick);

            expect(cm._hideContextMenu).toHaveBeenCalled();
        });
    });
});

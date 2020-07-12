import ContextMenu from '../src/js/contextmenu';
import * as util from '../src/js/util';

describe('ContextMenu component', () => {
  beforeEach(() => {
    fixture.set(
      [
        '<style>html, body { overflow: hidden; }</style>',
        '<div id="menu1"></div>',
        '<div id="menu2"></div>',
        '<div id="flContainer"></div>'
      ].join('')
    );
  });

  it('use selector for displaying context menu.', () => {
    const cm = new ContextMenu(document.querySelector('#flContainer'));

    cm.register(document.querySelector('#menu1'), null, [
      {
        title: 'open'
      }
    ]);

    const menu1Element = document.querySelector('#menu1');

    expect(cm.layerMap.has(menu1Element)).toBe(true);
  });

  describe('use "usageStatistics" option', () => {
    let container, cm, sendHostName;

    beforeEach(() => {
      sendHostName = spyOn(util, 'sendHostName');
      container = document.querySelector('#flContainer');
    });

    afterEach(() => {
      cm.destroy();
    });

    it('when the value set to true by default, the host name is send.', () => {
      cm = new ContextMenu(container);

      expect(sendHostName).toHaveBeenCalled();
    });

    it('when the value set to false, the host name is not send to server.', () => {
      cm = new ContextMenu(container, {
        usageStatistics: false
      });

      expect(sendHostName).not.toHaveBeenCalled();
    });
  });

  it('show context menus that only below of mouse cursor.', () => {
    const cm = new ContextMenu(document.querySelector('#flContainer'));

    cm.register(document.querySelector('#menu1'), null, [
      {
        title: 'a',
        menu: [
          {
            title: 'a-1'
          }
        ]
      },
      {
        title: 'b',
        menu: [
          {
            title: 'b-1'
          }
        ]
      },
      {
        title: 'c',
        menu: [
          {
            title: 'c-1'
          }
        ]
      }
    ]);

    cm.activeLayer = cm.layerMap._values[0];

    const mockMouseMove = {
      target: document.querySelectorAll('.tui-contextmenu-button')[3],
      preventDefault() {}
    };

    cm._onMouseMove(mockMouseMove);

    const needHided = document.querySelectorAll('.tui-contextmenu-submenu');

    expect(needHided[0].style.display).toBe('none');
    expect(needHided[1].style.display).toBe('block');
    expect(needHided[2].style.display).toBe('none');
  });

  it('invoke callback when menu item clicked.', () => {
    const cm = new ContextMenu(document.querySelector('#flContainer')),
      callback = jasmine.createSpy('contextMenu');

    cm.register(document.querySelector('#menu1'), callback, [
      {
        title: 'open'
      }
    ]);

    const [layer] = cm.layerMap._values;

    const mockMouseClick = {
      target: layer.container.querySelector('.tui-contextmenu-button'),
      preventDefault() {}
    };

    cm._onMouseClick(mockMouseClick);

    expect(callback).toHaveBeenCalledWith(mockMouseClick, 'open');
  });

  it('can unregister registered context menu.', () => {
    const cm = new ContextMenu(document.querySelector('#flContainer')),
      callback = jasmine.createSpy('contextMenu');

    cm.register(document.querySelector('#menu1'), callback, [
      {
        title: 'open'
      }
    ]);

    cm.unregister(document.querySelector('#menu1'));

    expect(cm.layerMap._values.length).toBe(0);
    expect(document.querySelectorAll('.floating-layer').length).toBe(0);
  });

  describe('can placing', () => {
    let ce, vWidth, vHeight;

    beforeEach(() => {
      ce = new ContextMenu(document.querySelector('#flContainer'));

      ce.register(document.querySelector('#menu1'), null, [
        {title: 'root-a'},
        {
          title: 'root-b',
          menu: [{title: 'sub-a'}, {title: 'sub-b'}]
        },
        {title: 'root-c'}
      ]);

      ce.activeLayer = ce.layerMap._values[0];

      vWidth = document.documentElement.clientWidth;
      vHeight = document.documentElement.clientHeight;
    });

    it('menu element.', () => {
      ce._showRootMenu(10, 10);

      const menu = ce.activeLayer.container.querySelector('.tui-contextmenu-root');

      expect(menu.style.marginLeft).toBe('');
      expect(menu.style.marginTop).toBe('');
    });

    it('root menu element without veil viewport limit.', () => {
      // When it is rendering outside of viewport,
      // size of menu is set to 180 as a default
      ce._showRootMenu(vWidth - 20, vHeight - 20);

      const menu = ce.activeLayer.container.querySelector('.tui-contextmenu-root');

      expect(menu.style.marginLeft).not.toBe('');
      expect(menu.style.marginTop).not.toBe('');
    });
  });

  describe('has disable property in menu data,', () => {
    let cm, callback;

    beforeEach(() => {
      cm = new ContextMenu(document.querySelector('#flContainer'));
      callback = jasmine.createSpy('contextMenu');

      cm.register(document.querySelector('#menu1'), callback, [
        {title: 'menu-disable1', disable: true},
        {title: 'menu-enable'},
        {title: 'menu-disable2', disable: true}
      ]);
    });

    it('menus that have disable state are generated.', () => {
      const menus = cm.container.querySelectorAll('.tui-contextmenu-disable');

      expect(menus.length).toEqual(2);
    });

    it('when click the disabled menu, the context menu is hidden.', () => {
      const mockMouseClick = {
        target: cm.container.querySelector('.tui-contextmenu-disable'),
        preventDefault() {}
      };

      spyOn(cm, '_hideContextMenu');

      cm._onMouseClick(mockMouseClick);

      expect(cm._hideContextMenu).toHaveBeenCalled();
    });
  });
});

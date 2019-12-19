import hasClass from 'tui-code-snippet/domUtil/hasClass';

import FloatingLayer from '../src/js/floatingLayer.js';

describe('FloatingLayer', () => {
  const bound = {
    left: 1,
    top: 2,
    right: 3,
    bottom: 4,
    width: 2,
    height: 2
  };
  let fl;

  beforeEach(() => {
    const manager = document.createElement('div');

    manager.zIndex = 999;
    document.body.appendChild(manager);

    fl = new FloatingLayer(manager);
  });

  afterEach(() => {
    fl.destroy();
    fl = null;
  });

  it('#constructor', () => {
    const {style} = fl.container;

    expect(style.display).toBe('none');
    expect(style.position).toBe('absolute');
    expect(parseInt(style['z-index'], 10)).toBe(999);

    expect(hasClass(fl.container, 'floating-layer')).toBe(true);
  });

  it('#destroy()', () => {
    fl.destroy();

    expect(fl.container).toBeNull();
  });

  it('#setContent()', () => {
    const html = '<p>inner-html</p>';

    fl.setContent(html);
    const innerHtml = fl.container.innerHTML.replace('<P>', '<p>').replace('</P>', '</p>');

    expect(innerHtml).toBe(html);
  });

  it('#setBound()', () => {
    fl.setBound(bound);

    const {style} = fl.container;

    expect(style.top).toBe(`${bound.top}px`);
    expect(style.right).toBe(`${bound.right}px`);
    expect(style.bottom).toBe(`${bound.bottom}px`);
    expect(style.left).toBe(`${bound.left}px`);
    expect(style.width).toBe(`${bound.width}px`);
    expect(style.height).toBe(`${bound.height}px`);
  });

  it('#show()', () => {
    fl.show();
    expect(fl.container.style.display).toBe('block');
  });

  it('#hide()', () => {
    fl.hide();
    expect(fl.container.style.display).toBe('none');
  });
});

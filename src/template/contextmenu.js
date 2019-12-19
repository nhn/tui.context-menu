/* eslint-disable max-len */
import template from 'tui-code-snippet/domUtil/template';

export default function(context) {
  const source = `
  {{if root}}
  <div class="tui-contextmenu tui-contextmenu-root">
  {{/if}}
    <ul class="tui-contextmenu-wrap">
      {{each menuItems}}
        {{if @this["separator"]}}
        <li class="tui-contextmenu-separator">
        {{else}}
        <li class="tui-contextmenu-item">
          {{if @this["menu"]}}
            {{if @this["disable"]}}
              <button type="button" class="tui-contextmenu-button tui-contextmenu-has-submenu tui-contextmenu-disable" data-command="{{@this["command"]}}">{{@this["title"]}}</button>
            {{else}}
              <button type="button" class="tui-contextmenu-button tui-contextmenu-has-submenu" data-command="{{@this["command"]}}">{{@this["title"]}}</button>
              <div class="tui-contextmenu tui-contextmenu-submenu" style="display:none">
                  {{tmpl @this["menu"]}}
              </div>
              {{/if}}
          {{else}}
            {{if @this["disable"]}}
              <button type="button" class="tui-contextmenu-button tui-contextmenu-disable" data-command="{{@this["command"]}}">{{@this["title"]}}</button>
            {{else}}
              <button type="button" class="tui-contextmenu-button" data-command="{{@this["command"]}}">{{@this["title"]}}</button>
            {{/if}}
          {{/if}}
        </li>
        {{/if}}
      {{/each}}
    </ul>
  {{if root}}
  </div>
  {{/if}}`;

  return template(source, context);
}

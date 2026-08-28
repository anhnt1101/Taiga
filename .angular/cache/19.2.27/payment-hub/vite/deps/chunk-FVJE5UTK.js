import {
  TuiWithAppearance,
  TuiWithIcons,
  tuiAppearanceOptionsProvider
} from "./chunk-J6D5N42S.js";
import {
  TUI_VERSION,
  tuiCreateOptions,
  tuiWithStyles
} from "./chunk-SDRQHMGB.js";
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewEncapsulation,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdefineDirective
} from "./chunk-J6YSA62T.js";

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-components-link.mjs
var [TUI_LINK_OPTIONS, tuiLinkOptionsProvider] = tuiCreateOptions({
  appearance: "action"
});
var Styles = class _Styles {
  static {
    this.ɵfac = function Styles_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _Styles)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _Styles,
      selectors: [["ng-component"]],
      exportAs: ["tui-link-5.18.0"],
      decls: 0,
      vars: 0,
      template: function Styles_Template(rf, ctx) {
      },
      styles: ['[tuiLink]:where(*[data-tui-version="5.18.0"]){transition-property:color,text-decoration,opacity;transition-duration:var(--tui-duration, .3s);transition-timing-function:var(--tui-curve-productive-standard);padding:0;background:transparent;border:none;cursor:pointer;font:inherit;color:inherit;border-radius:.125rem;outline-width:1px;outline-offset:-1px;text-underline-offset:.2em;text-decoration:none dashed currentColor 1px;text-decoration-color:color-mix(in lch,currentColor,transparent)}[tuiLink]:where(*[data-tui-version="5.18.0"]):before{margin-inline-end:.25rem}[tuiLink]:where(*[data-tui-version="5.18.0"]):after{margin-inline-start:.25rem}[tuiLink]:where(*[data-tui-version="5.18.0"])[tuiIcons]:where(:not([data-icon-start=font])):before,[tuiLink]:where(*[data-tui-version="5.18.0"])[tuiIcons]:where(:not([data-icon-end=font])):after{content:"\\2060";padding:calc(var(--tui-icon-size, 1rem) / 2);vertical-align:super;font-size:0;line-height:0;box-sizing:border-box;-webkit-mask-size:calc(100% + 10 * var(--tui-stroke-width)) 100%;mask-size:calc(100% + 10 * var(--tui-stroke-width)) 100%;transition:none}[tuiLink]:where(*[data-tui-version="5.18.0"])[data-icon-start=font]:before,[tuiLink]:where(*[data-tui-version="5.18.0"])[data-icon-end=font]:after{display:inline;font-size:var(--tui-icon-size, 1rem);vertical-align:sub}[tuiLink]:where(*[data-tui-version="5.18.0"])[tuiChevron]:after{display:inline-block;vertical-align:initial}@media(hover:hover)and (pointer:fine){[tuiLink]:where(*[data-tui-version="5.18.0"]):is(a,button,select,textarea,input,label,.tui-interactive):not(:disabled):hover:not([data-state]){text-decoration-color:currentColor}}[tuiLink]:where(*[data-tui-version="5.18.0"])[data-state=hover]{text-decoration-color:currentColor}[tuiLink]:where(*[data-tui-version="5.18.0"]):is(a,button,select,textarea,input,label,.tui-interactive):not(:disabled):active:not([data-state]){text-decoration-color:currentColor}[tuiLink]:where(*[data-tui-version="5.18.0"])[data-state=active]{text-decoration-color:currentColor}[tuiLink]:where(*[data-tui-version="5.18.0"])[data-appearance=""]{text-decoration-line:underline;text-decoration-style:solid}\n'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Styles, [{
    type: Component,
    args: [{
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      exportAs: `tui-link-${TUI_VERSION}`,
      styles: ['[tuiLink]:where(*[data-tui-version="5.18.0"]){transition-property:color,text-decoration,opacity;transition-duration:var(--tui-duration, .3s);transition-timing-function:var(--tui-curve-productive-standard);padding:0;background:transparent;border:none;cursor:pointer;font:inherit;color:inherit;border-radius:.125rem;outline-width:1px;outline-offset:-1px;text-underline-offset:.2em;text-decoration:none dashed currentColor 1px;text-decoration-color:color-mix(in lch,currentColor,transparent)}[tuiLink]:where(*[data-tui-version="5.18.0"]):before{margin-inline-end:.25rem}[tuiLink]:where(*[data-tui-version="5.18.0"]):after{margin-inline-start:.25rem}[tuiLink]:where(*[data-tui-version="5.18.0"])[tuiIcons]:where(:not([data-icon-start=font])):before,[tuiLink]:where(*[data-tui-version="5.18.0"])[tuiIcons]:where(:not([data-icon-end=font])):after{content:"\\2060";padding:calc(var(--tui-icon-size, 1rem) / 2);vertical-align:super;font-size:0;line-height:0;box-sizing:border-box;-webkit-mask-size:calc(100% + 10 * var(--tui-stroke-width)) 100%;mask-size:calc(100% + 10 * var(--tui-stroke-width)) 100%;transition:none}[tuiLink]:where(*[data-tui-version="5.18.0"])[data-icon-start=font]:before,[tuiLink]:where(*[data-tui-version="5.18.0"])[data-icon-end=font]:after{display:inline;font-size:var(--tui-icon-size, 1rem);vertical-align:sub}[tuiLink]:where(*[data-tui-version="5.18.0"])[tuiChevron]:after{display:inline-block;vertical-align:initial}@media(hover:hover)and (pointer:fine){[tuiLink]:where(*[data-tui-version="5.18.0"]):is(a,button,select,textarea,input,label,.tui-interactive):not(:disabled):hover:not([data-state]){text-decoration-color:currentColor}}[tuiLink]:where(*[data-tui-version="5.18.0"])[data-state=hover]{text-decoration-color:currentColor}[tuiLink]:where(*[data-tui-version="5.18.0"]):is(a,button,select,textarea,input,label,.tui-interactive):not(:disabled):active:not([data-state]){text-decoration-color:currentColor}[tuiLink]:where(*[data-tui-version="5.18.0"])[data-state=active]{text-decoration-color:currentColor}[tuiLink]:where(*[data-tui-version="5.18.0"])[data-appearance=""]{text-decoration-line:underline;text-decoration-style:solid}\n']
    }]
  }], null, null);
})();
var TuiLink = class _TuiLink {
  constructor() {
    this.nothing = tuiWithStyles(Styles);
  }
  static {
    this.ɵfac = function TuiLink_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiLink)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiLink,
      selectors: [["a", "tuiLink", ""], ["button", "tuiLink", ""]],
      hostAttrs: ["tuiLink", ""],
      features: [ɵɵProvidersFeature([tuiAppearanceOptionsProvider(TUI_LINK_OPTIONS)]), ɵɵHostDirectivesFeature([TuiWithAppearance, TuiWithIcons])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiLink, [{
    type: Directive,
    args: [{
      selector: "a[tuiLink], button[tuiLink]",
      providers: [tuiAppearanceOptionsProvider(TUI_LINK_OPTIONS)],
      hostDirectives: [TuiWithAppearance, TuiWithIcons],
      host: {
        tuiLink: ""
      }
    }]
  }], null, null);
})();

export {
  TUI_LINK_OPTIONS,
  tuiLinkOptionsProvider,
  TuiLink
};
//# sourceMappingURL=chunk-FVJE5UTK.js.map

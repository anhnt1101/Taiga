import {
  tuiLinkOptionsProvider
} from "./chunk-FVJE5UTK.js";
import {
  TuiId,
  TuiNativeValidator
} from "./chunk-O6TWERH2.js";
import {
  TuiHoveredService
} from "./chunk-HKJM3ZKU.js";
import {
  TUI_TEXTFIELD_OPTIONS,
  TuiTextfieldComponent,
  TuiTextfieldOptionsDirective,
  tuiAsTextfieldAccessor
} from "./chunk-OXEZ63PE.js";
import {
  TUI_ITEMS_HANDLERS
} from "./chunk-J334YG6B.js";
import {
  TuiItem
} from "./chunk-UBR7MOSE.js";
import {
  TuiLabel
} from "./chunk-AKQXG24B.js";
import {
  TuiDriver,
  TuiDriverDirective,
  TuiDropdownContent,
  TuiDropdownDirective,
  TuiPopupService,
  TuiPositionAccessor,
  TuiPositionService,
  TuiRectAccessor,
  TuiVisualViewportService,
  tuiAsDriver,
  tuiAsRectAccessor,
  tuiAsVehicle,
  tuiFallbackAccessor,
  tuiIsObscured,
  tuiPositionAccessorFor,
  tuiRectAccessorFor
} from "./chunk-ZAUGKNIQ.js";
import {
  TuiAppearance,
  TuiButton,
  TuiIcons,
  TuiWithAppearance,
  TuiWithIcons,
  tuiAppearance,
  tuiAppearanceFocus,
  tuiAppearanceMode,
  tuiAppearanceOptionsProvider,
  tuiAppearanceState,
  tuiButtonOptionsProvider,
  tuiIconEnd,
  tuiIconStart
} from "./chunk-J6D5N42S.js";
import {
  TUI_CLOSE_WORD,
  TUI_COMMON_ICONS,
  TUI_VIEWPORT,
  tuiInjectIconResolver
} from "./chunk-YXYSKJQL.js";
import {
  PolymorpheusComponent,
  PolymorpheusOutlet,
  TuiActiveZone,
  TuiPortal,
  TuiPortalDirective,
  injectContext,
  tuiAsPortal,
  tuiIsFocused
} from "./chunk-2QPRVNSQ.js";
import {
  EMPTY_CLIENT_RECT,
  TUI_DEFAULT_IDENTITY_MATCHER,
  TUI_VERSION,
  TuiAnimated,
  WA_IS_MOBILE,
  outputFromObservable,
  takeUntilDestroyed,
  toObservable,
  tuiClamp,
  tuiControlValue,
  tuiCreateOptions,
  tuiIfMap,
  tuiInjectElement,
  tuiIsPresent,
  tuiIsString,
  tuiPointToClientRect,
  tuiProvide,
  tuiPx,
  tuiSetSignal,
  tuiTypedFromEvent,
  tuiValue,
  tuiWithStyles,
  tuiZoneOptimized
} from "./chunk-SDRQHMGB.js";
import {
  NgControl,
  NgModel,
  RadioControlValueAccessor
} from "./chunk-SVYNCHRR.js";
import {
  NgTemplateOutlet
} from "./chunk-KWB6JEQH.js";
import {
  DOCUMENT
} from "./chunk-43U6UUQ6.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  INJECTOR$1,
  Injectable,
  InjectionToken,
  Pipe,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  forwardRef,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵinject,
  ɵɵinvalidFactory,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-J6YSA62T.js";
import {
  fromEvent,
  merge
} from "./chunk-PV7DW26G.js";
import {
  BehaviorSubject,
  EMPTY,
  Subject,
  __spreadProps,
  __spreadValues,
  debounce,
  delay,
  distinctUntilChanged,
  filter,
  map,
  of,
  repeat,
  skip,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer
} from "./chunk-IVSRFTZX.js";

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-components-icon.mjs
var TuiIcon = class _TuiIcon {
  constructor() {
    this.icons = inject(TuiIcons);
    this.mask = computed(() => this.icons.resolve(this.background()));
    this.background = input("");
  }
  static {
    this.ɵfac = function TuiIcon_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiIcon)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TuiIcon,
      selectors: [["tui-icon", 3, "tuiBadge", ""]],
      hostVars: 2,
      hostBindings: function TuiIcon_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵstyleProp("--t-icon-bg", ctx.mask());
        }
      },
      inputs: {
        background: [1, "background"]
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: TuiIcons,
        inputs: ["iconStart", "icon", "iconEnd", "badge"]
      }])],
      decls: 0,
      vars: 0,
      template: function TuiIcon_Template(rf, ctx) {
      },
      styles: ['tui-icon:where(*[data-tui-version="5.18.0"]){--tui-icon-size: 1em;position:relative;display:inline-flex;inline-size:1em;block-size:1em;font-size:1.5rem;flex-shrink:0;border:0 solid transparent;vertical-align:middle;box-sizing:border-box;-webkit-mask-image:var(--t-icon-bg);mask-image:var(--t-icon-bg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:calc(100% + 10 * var(--tui-stroke-width)) 100%;mask-size:calc(100% + 10 * var(--tui-stroke-width)) 100%;zoom:calc(100%*clamp(0px,var(--tui-font-offset) - 10px,1px)/.8px)}@media(hover:hover)and (pointer:fine){tui-icon:where(*[data-tui-version="5.18.0"])[data-appearance=icon]:hover{color:var(--tui-text-secondary)}}tui-icon:where(*[data-tui-version="5.18.0"])[tuiIcons]:before,tui-icon:where(*[data-tui-version="5.18.0"])[tuiIcons]:after{zoom:1}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end]:before{-webkit-mask-image:var(--t-icon-start),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);mask-image:var(--t-icon-start),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);-webkit-mask-composite:source-in;mask-composite:intersect}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end][data-icon-start=img]:before,tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end][data-icon-start=font]:before{-webkit-mask-image:radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);mask-image:radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em)}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end]:after{position:absolute;inset-block-start:0;inset-inline-start:0;inline-size:100%;block-size:100%}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-start]:before{position:absolute;inset-block-start:0;inset-inline-start:0;inline-size:100%;block-size:100%}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-start]:after{transform:translate(36%,36%);--tui-icon-size: .5715em}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-start=font]:before,tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end=font]:after{zoom:.667}\n'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiIcon, [{
    type: Component,
    args: [{
      selector: "tui-icon:not([tuiBadge])",
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      hostDirectives: [{
        directive: TuiIcons,
        inputs: ["iconStart: icon", "iconEnd: badge"]
      }],
      host: {
        "[style.--t-icon-bg]": "mask()"
      },
      styles: ['tui-icon:where(*[data-tui-version="5.18.0"]){--tui-icon-size: 1em;position:relative;display:inline-flex;inline-size:1em;block-size:1em;font-size:1.5rem;flex-shrink:0;border:0 solid transparent;vertical-align:middle;box-sizing:border-box;-webkit-mask-image:var(--t-icon-bg);mask-image:var(--t-icon-bg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:calc(100% + 10 * var(--tui-stroke-width)) 100%;mask-size:calc(100% + 10 * var(--tui-stroke-width)) 100%;zoom:calc(100%*clamp(0px,var(--tui-font-offset) - 10px,1px)/.8px)}@media(hover:hover)and (pointer:fine){tui-icon:where(*[data-tui-version="5.18.0"])[data-appearance=icon]:hover{color:var(--tui-text-secondary)}}tui-icon:where(*[data-tui-version="5.18.0"])[tuiIcons]:before,tui-icon:where(*[data-tui-version="5.18.0"])[tuiIcons]:after{zoom:1}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end]:before{-webkit-mask-image:var(--t-icon-start),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);mask-image:var(--t-icon-start),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);-webkit-mask-composite:source-in;mask-composite:intersect}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end][data-icon-start=img]:before,tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end][data-icon-start=font]:before{-webkit-mask-image:radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);mask-image:radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em)}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end]:after{position:absolute;inset-block-start:0;inset-inline-start:0;inline-size:100%;block-size:100%}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-start]:before{position:absolute;inset-block-start:0;inset-inline-start:0;inline-size:100%;block-size:100%}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-start]:after{transform:translate(36%,36%);--tui-icon-size: .5715em}tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-start=font]:before,tui-icon:where(*[data-tui-version="5.18.0"])[data-icon-end=font]:after{zoom:.667}\n']
    }]
  }], null, null);
})();
var TuiIconPipe = class _TuiIconPipe {
  constructor() {
    this.transform = tuiInjectIconResolver();
  }
  static {
    this.ɵfac = function TuiIconPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiIconPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "tuiIcon",
      type: _TuiIconPipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiIconPipe, [{
    type: Pipe,
    args: [{
      name: "tuiIcon"
    }]
  }], null, null);
})();

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-components-radio.mjs
var _c0 = ["type", "radio", "tuiRadio", ""];
var [TUI_RADIO_OPTIONS, tuiRadioOptionsProvider] = tuiCreateOptions({
  size: "m",
  appearance: ({
    checked
  }) => checked ? "primary" : "outline-grayscale"
});
var TuiRadioComponent = class _TuiRadioComponent {
  constructor() {
    this.destroyRef = inject(DestroyRef);
    this.el = tuiInjectElement();
    this.options = inject(TUI_RADIO_OPTIONS);
    this.appearance = tuiAppearance(this.options.appearance(this.el));
    this.control = inject(NgControl, {
      self: true,
      optional: true
    });
    this.size = input(this.options.size);
  }
  ngOnInit() {
    tuiControlValue(this.control).pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      const fix = this.control instanceof NgModel && value == null ? this.control.model : value;
      this.el.indeterminate = fix == null && this.el.matches("[tuiCheckbox]");
      this.ngDoCheck();
    });
  }
  ngDoCheck() {
    this.appearance.set(this.options.appearance(this.el));
  }
  static {
    this.ɵfac = function TuiRadioComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiRadioComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TuiRadioComponent,
      selectors: [["input", "type", "radio", "tuiRadio", ""]],
      hostVars: 4,
      hostBindings: function TuiRadioComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("disabled", !ctx.control || ctx.control.disabled);
          ɵɵattribute("data-size", ctx.size());
          ɵɵclassProp("_readonly", !ctx.control);
        }
      },
      inputs: {
        size: [1, "size"]
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: TuiAppearance,
        inputs: ["tuiAppearanceState", "tuiAppearanceState", "tuiAppearanceFocus", "tuiAppearanceFocus", "tuiAppearanceMode", "tuiAppearanceMode"]
      }, TuiNativeValidator])],
      attrs: _c0,
      decls: 0,
      vars: 0,
      template: function TuiRadioComponent_Template(rf, ctx) {
      },
      styles: ['[tuiRadio]:where(*[data-tui-version="5.18.0"]){--t-size: 1.5rem;transition-property:background,box-shadow;transition-duration:calc(var(--tui-duration) / 2);transition-timing-function:var(--tui-curve-productive-standard);inline-size:var(--t-size);block-size:var(--t-size);cursor:pointer;margin:0;flex-shrink:0;border-radius:100%;color:var(--tui-text-primary-on-accent-1)}[tuiRadio]:where(*[data-tui-version="5.18.0"]):disabled._readonly._readonly{opacity:1}[tuiRadio]:where(*[data-tui-version="5.18.0"]):before{position:absolute;inset-block-start:0;inset-inline-start:0;inset-block-end:0;inset-inline-end:0;content:"";margin:auto;border-radius:100%;background:currentColor;transform:scale(0);transition-property:transform}[tuiRadio]:where(*[data-tui-version="5.18.0"]):checked:before{transform:scale(.5)}[tuiRadio]:where(*[data-tui-version="5.18.0"])[data-size=s]{--t-size: 1rem}[tuiRadio]:where(*[data-tui-version="5.18.0"]):invalid:not([data-mode]),[tuiRadio]:where(*[data-tui-version="5.18.0"])[data-mode~=invalid]{color:#fff}\n'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiRadioComponent, [{
    type: Component,
    args: [{
      selector: 'input[type="radio"][tuiRadio]',
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      hostDirectives: [{
        directive: TuiAppearance,
        inputs: ["tuiAppearanceState", "tuiAppearanceFocus", "tuiAppearanceMode"]
      }, TuiNativeValidator],
      host: {
        "[attr.data-size]": "size()",
        "[class._readonly]": "!control",
        "[disabled]": "!control || control.disabled"
      },
      styles: ['[tuiRadio]:where(*[data-tui-version="5.18.0"]){--t-size: 1.5rem;transition-property:background,box-shadow;transition-duration:calc(var(--tui-duration) / 2);transition-timing-function:var(--tui-curve-productive-standard);inline-size:var(--t-size);block-size:var(--t-size);cursor:pointer;margin:0;flex-shrink:0;border-radius:100%;color:var(--tui-text-primary-on-accent-1)}[tuiRadio]:where(*[data-tui-version="5.18.0"]):disabled._readonly._readonly{opacity:1}[tuiRadio]:where(*[data-tui-version="5.18.0"]):before{position:absolute;inset-block-start:0;inset-inline-start:0;inset-block-end:0;inset-inline-end:0;content:"";margin:auto;border-radius:100%;background:currentColor;transform:scale(0);transition-property:transform}[tuiRadio]:where(*[data-tui-version="5.18.0"]):checked:before{transform:scale(.5)}[tuiRadio]:where(*[data-tui-version="5.18.0"])[data-size=s]{--t-size: 1rem}[tuiRadio]:where(*[data-tui-version="5.18.0"]):invalid:not([data-mode]),[tuiRadio]:where(*[data-tui-version="5.18.0"])[data-mode~=invalid]{color:#fff}\n']
    }]
  }], null, null);
})();
var TuiRadioDirective = class _TuiRadioDirective {
  constructor() {
    this.identityMatcher = input(TUI_DEFAULT_IDENTITY_MATCHER);
    const accessor = inject(RadioControlValueAccessor);
    const writeValue = accessor.writeValue.bind(accessor);
    accessor.writeValue = (value) => {
      if (this.identityMatcher()(value, accessor.value)) {
        writeValue(accessor.value);
      } else {
        writeValue(value);
      }
    };
  }
  static {
    this.ɵfac = function TuiRadioDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiRadioDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiRadioDirective,
      selectors: [["input", "type", "radio", "tuiRadio", "", "identityMatcher", ""]],
      inputs: {
        identityMatcher: [1, "identityMatcher"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiRadioDirective, [{
    type: Directive,
    args: [{
      selector: 'input[type="radio"][tuiRadio][identityMatcher]'
    }]
  }], () => [], null);
})();
var TuiRadio = [TuiRadioComponent, TuiRadioDirective];

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-components-checkbox.mjs
var _c02 = ["type", "checkbox", "tuiCheckbox", ""];
var [TUI_CHECKBOX_OPTIONS, tuiCheckboxOptionsProvider] = tuiCreateOptions({
  size: "m",
  appearance: (el) => el.checked || el.indeterminate ? "primary" : "outline-grayscale",
  icons: {
    checked: () => "@tui.check",
    indeterminate: () => "@tui.minus"
  }
});
var TuiCheckbox = class _TuiCheckbox extends TuiRadioComponent {
  constructor() {
    super(...arguments);
    this.check = tuiIconStart(computed(() => this.options.icons.checked(this.size())));
    this.indeterminate = tuiIconEnd(computed(() => this.options.icons.indeterminate(this.size())));
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵTuiCheckbox_BaseFactory;
      return function TuiCheckbox_Factory(__ngFactoryType__) {
        return (ɵTuiCheckbox_BaseFactory || (ɵTuiCheckbox_BaseFactory = ɵɵgetInheritedFactory(_TuiCheckbox)))(__ngFactoryType__ || _TuiCheckbox);
      };
    })();
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TuiCheckbox,
      selectors: [["input", "type", "checkbox", "tuiCheckbox", ""]],
      features: [ɵɵProvidersFeature([tuiProvide(TUI_RADIO_OPTIONS, TUI_CHECKBOX_OPTIONS)]), ɵɵHostDirectivesFeature([TuiIcons]), ɵɵInheritDefinitionFeature],
      attrs: _c02,
      decls: 0,
      vars: 0,
      template: function TuiCheckbox_Template(rf, ctx) {
      },
      styles: [`[tuiCheckbox]:where(*[data-tui-version="5.18.0"]){--t-size: 1.5rem;--t-radius: var(--tui-radius-s);inline-size:var(--t-size);block-size:var(--t-size);border-radius:var(--t-radius);cursor:pointer;margin:0;flex-shrink:0}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):before{position:absolute;block-size:100%;inline-size:100%;font-size:1rem;-webkit-mask-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');mask-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');transform:scale(0);transition:transform var(--tui-duration) ease-in-out,mask 0s var(--tui-duration) ease-in-out}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):after{display:none}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):disabled._readonly._readonly{opacity:1;pointer-events:none}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):checked:before,[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):indeterminate:before{-webkit-mask-image:var(--t-icon-start);mask-image:var(--t-icon-start);transform:scale(1);transition:transform var(--tui-duration) ease-in-out,mask 0s ease-in-out;transition-duration:inherit}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):indeterminate:before{-webkit-mask-image:var(--t-icon-end);mask-image:var(--t-icon-end)}[tuiCheckbox]:where(*[data-tui-version="5.18.0"])[data-size=s]{--t-size: 1rem;--t-radius: var(--tui-radius-xs)}[tuiCheckbox]:where(*[data-tui-version="5.18.0"])[data-size=s]:before{font-size:.875rem}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):invalid:not([data-mode]),[tuiCheckbox]:where(*[data-tui-version="5.18.0"])[data-mode~=invalid]{color:#fff}
`],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiCheckbox, [{
    type: Component,
    args: [{
      selector: 'input[type="checkbox"][tuiCheckbox]',
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [tuiProvide(TUI_RADIO_OPTIONS, TUI_CHECKBOX_OPTIONS)],
      hostDirectives: [TuiIcons],
      styles: [`[tuiCheckbox]:where(*[data-tui-version="5.18.0"]){--t-size: 1.5rem;--t-radius: var(--tui-radius-s);inline-size:var(--t-size);block-size:var(--t-size);border-radius:var(--t-radius);cursor:pointer;margin:0;flex-shrink:0}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):before{position:absolute;block-size:100%;inline-size:100%;font-size:1rem;-webkit-mask-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');mask-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');transform:scale(0);transition:transform var(--tui-duration) ease-in-out,mask 0s var(--tui-duration) ease-in-out}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):after{display:none}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):disabled._readonly._readonly{opacity:1;pointer-events:none}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):checked:before,[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):indeterminate:before{-webkit-mask-image:var(--t-icon-start);mask-image:var(--t-icon-start);transform:scale(1);transition:transform var(--tui-duration) ease-in-out,mask 0s ease-in-out;transition-duration:inherit}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):indeterminate:before{-webkit-mask-image:var(--t-icon-end);mask-image:var(--t-icon-end)}[tuiCheckbox]:where(*[data-tui-version="5.18.0"])[data-size=s]{--t-size: 1rem;--t-radius: var(--tui-radius-xs)}[tuiCheckbox]:where(*[data-tui-version="5.18.0"])[data-size=s]:before{font-size:.875rem}[tuiCheckbox]:where(*[data-tui-version="5.18.0"]):invalid:not([data-mode]),[tuiCheckbox]:where(*[data-tui-version="5.18.0"])[data-mode~=invalid]{color:#fff}
`]
    }]
  }], null, null);
})();

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-portals-alert.mjs
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
      exportAs: ["tui-alert-5.18.0"],
      decls: 0,
      vars: 0,
      template: function Styles_Template(rf, ctx) {
      },
      styles: ['[tuiAlert]:where(*[data-tui-version="5.18.0"]){position:relative;display:grid;grid-column:1;place-self:start start;isolation:isolate;--tui-from: translateX(-100%)}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-inline=end]{justify-self:end;--tui-from: translateX(100%)}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-inline=center]{justify-self:center;--tui-from: translateY(-100%)}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]{align-self:end}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end][data-inline=center]{--tui-from: translateY(100%)}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(1){grid-row:16}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(2){grid-row:17}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(3){grid-row:18}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(4){grid-row:19}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(5){grid-row:20}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(6){grid-row:21}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(7){grid-row:22}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(8){grid-row:23}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(9){grid-row:24}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(10){grid-row:25}[tuiAlert]:where(*[data-tui-version="5.18.0"]).tui-enter,[tuiAlert]:where(*[data-tui-version="5.18.0"]).tui-leave{animation-name:tuiFade,tuiSlide,tuiCollapse}[tuiAlert]:where(*[data-tui-version="5.18.0"]):not(:first-of-type){margin-block-start:0!important}[tuiAlert]:where(*[data-tui-version="5.18.0"]):not(:last-of-type){margin-block-end:0!important}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(1){grid-row:5}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(2){grid-row:6}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(3){grid-row:7}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(4){grid-row:8}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(5){grid-row:9}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(6){grid-row:10}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(7){grid-row:11}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(8){grid-row:12}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(9){grid-row:13}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(10){grid-row:14}[tuiAlert]:where(*[data-tui-version="5.18.0"])>*{grid-row:1 / span 2}[tuiAlert]:where(*[data-tui-version="5.18.0"])>*:before,[tuiAlert]:where(*[data-tui-version="5.18.0"])>*:after{content:"";display:block;block-size:.375rem}\n'],
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
      exportAs: `tui-alert-${TUI_VERSION}`,
      styles: ['[tuiAlert]:where(*[data-tui-version="5.18.0"]){position:relative;display:grid;grid-column:1;place-self:start start;isolation:isolate;--tui-from: translateX(-100%)}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-inline=end]{justify-self:end;--tui-from: translateX(100%)}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-inline=center]{justify-self:center;--tui-from: translateY(-100%)}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]{align-self:end}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end][data-inline=center]{--tui-from: translateY(100%)}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(1){grid-row:16}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(2){grid-row:17}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(3){grid-row:18}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(4){grid-row:19}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(5){grid-row:20}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(6){grid-row:21}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(7){grid-row:22}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(8){grid-row:23}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(9){grid-row:24}[tuiAlert]:where(*[data-tui-version="5.18.0"])[data-block=end]:nth-of-type(10){grid-row:25}[tuiAlert]:where(*[data-tui-version="5.18.0"]).tui-enter,[tuiAlert]:where(*[data-tui-version="5.18.0"]).tui-leave{animation-name:tuiFade,tuiSlide,tuiCollapse}[tuiAlert]:where(*[data-tui-version="5.18.0"]):not(:first-of-type){margin-block-start:0!important}[tuiAlert]:where(*[data-tui-version="5.18.0"]):not(:last-of-type){margin-block-end:0!important}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(1){grid-row:5}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(2){grid-row:6}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(3){grid-row:7}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(4){grid-row:8}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(5){grid-row:9}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(6){grid-row:10}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(7){grid-row:11}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(8){grid-row:12}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(9){grid-row:13}[tuiAlert]:where(*[data-tui-version="5.18.0"]):nth-of-type(10){grid-row:14}[tuiAlert]:where(*[data-tui-version="5.18.0"])>*{grid-row:1 / span 2}[tuiAlert]:where(*[data-tui-version="5.18.0"])>*:before,[tuiAlert]:where(*[data-tui-version="5.18.0"])>*:after{content:"";display:block;block-size:.375rem}\n']
    }]
  }], null, null);
})();
var TuiAlertDirective = class _TuiAlertDirective {
  constructor() {
    this.nothing = tuiWithStyles(Styles);
    this.context = injectContext();
  }
  static {
    this.ɵfac = function TuiAlertDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiAlertDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiAlertDirective,
      hostAttrs: ["data-tui-version", "5.18.0", "role", "alert", "tuiAlert", ""],
      hostVars: 2,
      hostBindings: function TuiAlertDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("data-block", ctx.context.block)("data-inline", ctx.context.inline);
        }
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiAlertDirective, [{
    type: Directive,
    args: [{
      host: {
        "data-tui-version": TUI_VERSION,
        role: "alert",
        tuiAlert: "",
        "[attr.data-block]": "context.block",
        "[attr.data-inline]": "context.inline"
      }
    }]
  }], null, null);
})();
var TuiAlertService = class _TuiAlertService extends TuiPortal {
  constructor(concurrency, service = inject(TuiPopupService)) {
    super(service);
    this.current = /* @__PURE__ */ new Map();
    this.queue = /* @__PURE__ */ new Set();
    this.concurrency = Math.min(concurrency, 5);
  }
  add(component) {
    if (this.current.size < this.concurrency) {
      this.current.set(component, this.service.add(component));
    } else {
      this.queue.add(component);
    }
    return () => {
      this.current.get(component)?.destroy();
      this.current.delete(component);
      this.queue.delete(component);
      const [next] = this.queue;
      if (this.current.size < this.concurrency && next) {
        this.current.set(next, this.service.add(next));
        this.queue.delete(next);
      }
    };
  }
  static {
    this.ɵfac = function TuiAlertService_Factory(__ngFactoryType__) {
      ɵɵinvalidFactory();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TuiAlertService,
      factory: _TuiAlertService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiAlertService, [{
    type: Injectable
  }], () => [{
    type: void 0
  }, {
    type: void 0
  }], null);
})();

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-components-title.mjs
var Styles2 = class _Styles {
  static {
    this.ɵfac = function Styles_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _Styles)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _Styles,
      selectors: [["ng-component"]],
      exportAs: ["tui-title-5.18.0"],
      decls: 0,
      vars: 0,
      template: function Styles_Template(rf, ctx) {
      },
      styles: ['[tuiTitle]:where(*[data-tui-version="5.18.0"]){position:relative;display:flex;min-inline-size:0;flex-direction:column;text-align:start;gap:.25rem;margin:0;font:var(--tui-typography-ui-m)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=s]{gap:.125rem;font:var(--tui-typography-body-s)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=s] [tuiSubtitle]{font:var(--tui-typography-body-xs)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=m]{gap:.125rem;font:var(--tui-typography-heading-h5)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=m] [tuiSubtitle]{font:var(--tui-typography-body-m)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=l]{gap:.5rem;font:var(--tui-typography-heading-h3)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=l] [tuiSubtitle]{font:var(--tui-typography-body-m)}[tuiTitle]:where(*[data-tui-version="5.18.0"]) h1,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h2,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h3,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h4,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h5,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h6{margin:0;font:inherit}[tuiTitle]:where(*[data-tui-version="5.18.0"]) [tuiSubtitle]{font:var(--tui-typography-ui-s);margin:0}[tuiButton]:where(*[data-tui-version="5.18.0"]) [tuiTitle]{margin-inline-end:auto}[tuiButton]:where(*[data-tui-version="5.18.0"]) [tuiTitle] [tuiSubtitle]{color:var(--tui-text-secondary)}\n'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Styles2, [{
    type: Component,
    args: [{
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      exportAs: `tui-title-${TUI_VERSION}`,
      styles: ['[tuiTitle]:where(*[data-tui-version="5.18.0"]){position:relative;display:flex;min-inline-size:0;flex-direction:column;text-align:start;gap:.25rem;margin:0;font:var(--tui-typography-ui-m)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=s]{gap:.125rem;font:var(--tui-typography-body-s)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=s] [tuiSubtitle]{font:var(--tui-typography-body-xs)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=m]{gap:.125rem;font:var(--tui-typography-heading-h5)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=m] [tuiSubtitle]{font:var(--tui-typography-body-m)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=l]{gap:.5rem;font:var(--tui-typography-heading-h3)}[tuiTitle]:where(*[data-tui-version="5.18.0"])[data-size=l] [tuiSubtitle]{font:var(--tui-typography-body-m)}[tuiTitle]:where(*[data-tui-version="5.18.0"]) h1,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h2,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h3,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h4,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h5,[tuiTitle]:where(*[data-tui-version="5.18.0"]) h6{margin:0;font:inherit}[tuiTitle]:where(*[data-tui-version="5.18.0"]) [tuiSubtitle]{font:var(--tui-typography-ui-s);margin:0}[tuiButton]:where(*[data-tui-version="5.18.0"]) [tuiTitle]{margin-inline-end:auto}[tuiButton]:where(*[data-tui-version="5.18.0"]) [tuiTitle] [tuiSubtitle]{color:var(--tui-text-secondary)}\n']
    }]
  }], null, null);
})();
var TuiTitle = class _TuiTitle {
  constructor() {
    this.nothing = tuiWithStyles(Styles2);
    this.tuiTitle = input("");
  }
  static {
    this.ɵfac = function TuiTitle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiTitle)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiTitle,
      selectors: [["", "tuiTitle", ""]],
      hostAttrs: ["data-tui-version", "5.18.0", "tuiTitle", ""],
      hostVars: 1,
      hostBindings: function TuiTitle_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("data-size", ctx.tuiTitle() || null);
        }
      },
      inputs: {
        tuiTitle: [1, "tuiTitle"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiTitle, [{
    type: Directive,
    args: [{
      selector: "[tuiTitle]",
      host: {
        "data-tui-version": TUI_VERSION,
        tuiTitle: "",
        "[attr.data-size]": "tuiTitle() || null"
      }
    }]
  }], null, null);
})();

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-components-notification.mjs
function TuiNotificationComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const text_r1 = ctx.polymorpheusOutlet;
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", text_r1, " ");
  }
}
function TuiNotificationComponent_span_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 7);
  }
  if (rf & 2) {
    const text_r2 = ctx.polymorpheusOutlet;
    ɵɵproperty("innerHTML", text_r2, ɵɵsanitizeHtml);
  }
}
function TuiNotificationComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 8);
    ɵɵlistener("click", function TuiNotificationComponent_Conditional_7_Template_button_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.item.$implicit.complete());
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("iconStart", ctx_r3.icons.close);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r3.close(), " ");
  }
}
var ICONS = {
  info: "@tui.info",
  positive: "@tui.circle-check",
  negative: "@tui.circle-x",
  warning: "@tui.circle-alert",
  neutral: "@tui.info"
};
var TUI_NOTIFICATION_DEFAULT_OPTIONS = {
  appearance: "info",
  icon: (appearance) => ICONS[appearance] ?? "",
  size: "l",
  data: void 0,
  autoClose: 3e3,
  label: "",
  closable: true,
  block: "start",
  inline: "end"
};
var [TUI_NOTIFICATION_OPTIONS, tuiNotificationOptionsProvider] = tuiCreateOptions(TUI_NOTIFICATION_DEFAULT_OPTIONS);
var TUI_NOTIFICATION_CONCURRENCY = new InjectionToken(ngDevMode ? "TUI_NOTIFICATION_CONCURRENCY" : "", {
  factory: () => 5
});
var Styles3 = class _Styles {
  static {
    this.ɵfac = function Styles_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _Styles)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _Styles,
      selectors: [["ng-component"]],
      exportAs: ["tui-notification-5.18.0"],
      decls: 0,
      vars: 0,
      template: function Styles_Template(rf, ctx) {
      },
      styles: ['[tuiNotification]:where(*[data-tui-version="5.18.0"]){-webkit-appearance:none;appearance:none;padding:0;border:0;background:none;font:inherit;line-height:inherit;position:relative;display:flow-root;max-block-size:100%;color:var(--tui-text-primary);padding:var(--t-offset) var(--tui-padding-l);font:var(--tui-typography-body-m);border-radius:var(--tui-radius-l);box-sizing:border-box;text-align:start;text-decoration:none;border-inline-start:var(--t-start) solid transparent;border-inline-end:var(--t-end) solid transparent;--t-offset: calc((var(--t-height) - var(--tui-lh)) / 2);--t-height: var(--tui-height-l);--t-start: 0;--t-end: 0}[tuiNotification]:where(*[data-tui-version="5.18.0"]):is(a,button,select,textarea,input,label,.tui-interactive):not(:disabled){cursor:pointer}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-icon-start]{--t-start: 2rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-icon-end]{--t-end: 1.5rem}[tuiNotification]:where(*[data-tui-version="5.18.0"]):before{position:absolute;inset-inline-start:-1rem;inset-block-start:calc((var(--t-offset) + var(--tui-lh)) * (1 - .15 * var(--t-zoom)));transform:translateY(-100%)}[tuiNotification]:where(*[data-tui-version="5.18.0"]):after{position:absolute;top:50%;transform:translateY(-50%);inset-inline-end:-.5rem;font-size:1rem;margin:0;margin-inline-end:-.25rem;margin-inline-start:auto;color:var(--tui-text-tertiary)!important}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s]{padding:var(--t-offset) .5rem;font:var(--tui-typography-body-s);border-radius:var(--tui-radius-m);--t-height: var(--tui-height-s)}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s][data-icon-start]{--t-start: 1.5rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s]:before{inset-inline-start:calc(-1rem * (1 - .2 * var(--t-zoom)));inset-block-start:calc((var(--t-offset) + var(--tui-lh)) * (1 - .1 * var(--t-zoom)));font-size:1rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s]:after{inset-inline-end:-.875rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s] tui-icon{font-size:1rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s] [tuiTitle]{font:var(--tui-typography-body-s);font-weight:700}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s] [tuiSubtitle]{font:var(--tui-typography-body-s)}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s] [tuiSubtitle]+*{gap:1rem;margin:.375rem 0 .25rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s]>[tuiIconButton]{inset-block-start:0;inset-inline-end:0}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m]{padding:var(--t-offset) var(--tui-padding-m);font:var(--tui-typography-body-s);border-radius:var(--tui-radius-m);--t-height: var(--tui-height-m)}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m][data-icon-start]{--t-start: 1.625rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m]:before{inset-inline-start:-.875rem;font-size:1.25rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m]:after{inset-inline-end:-.75rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m] tui-icon{font-size:1.25rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m] [tuiTitle]{font:var(--tui-typography-ui-m);font-weight:700}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m] [tuiSubtitle]{font:var(--tui-typography-body-s)}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m] [tuiSubtitle]+*{gap:1rem;margin:.625rem 0 .25rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m]>[tuiIconButton]{inset-block-start:.375rem;inset-inline-end:.5rem}[tuiNotification]:where(*[data-tui-version="5.18.0"]) [tuiTitle]{gap:.125rem;font:var(--tui-typography-ui-l);font-weight:700}[tuiNotification]:where(*[data-tui-version="5.18.0"]) [tuiSubtitle]{font:var(--tui-typography-body-m)}[tuiNotification]:where(*[data-tui-version="5.18.0"]) [tuiSubtitle]+*{display:flex;align-items:center;gap:1.25rem;margin-block-start:.625rem;font:var(--tui-typography-body-s)}[tuiNotification]:where(*[data-tui-version="5.18.0"])>[tuiIconButton]{position:absolute;inset-block-start:.75rem;inset-inline-end:.75rem;box-shadow:none!important;background:transparent!important}\n'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Styles3, [{
    type: Component,
    args: [{
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      exportAs: `tui-notification-${TUI_VERSION}`,
      styles: ['[tuiNotification]:where(*[data-tui-version="5.18.0"]){-webkit-appearance:none;appearance:none;padding:0;border:0;background:none;font:inherit;line-height:inherit;position:relative;display:flow-root;max-block-size:100%;color:var(--tui-text-primary);padding:var(--t-offset) var(--tui-padding-l);font:var(--tui-typography-body-m);border-radius:var(--tui-radius-l);box-sizing:border-box;text-align:start;text-decoration:none;border-inline-start:var(--t-start) solid transparent;border-inline-end:var(--t-end) solid transparent;--t-offset: calc((var(--t-height) - var(--tui-lh)) / 2);--t-height: var(--tui-height-l);--t-start: 0;--t-end: 0}[tuiNotification]:where(*[data-tui-version="5.18.0"]):is(a,button,select,textarea,input,label,.tui-interactive):not(:disabled){cursor:pointer}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-icon-start]{--t-start: 2rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-icon-end]{--t-end: 1.5rem}[tuiNotification]:where(*[data-tui-version="5.18.0"]):before{position:absolute;inset-inline-start:-1rem;inset-block-start:calc((var(--t-offset) + var(--tui-lh)) * (1 - .15 * var(--t-zoom)));transform:translateY(-100%)}[tuiNotification]:where(*[data-tui-version="5.18.0"]):after{position:absolute;top:50%;transform:translateY(-50%);inset-inline-end:-.5rem;font-size:1rem;margin:0;margin-inline-end:-.25rem;margin-inline-start:auto;color:var(--tui-text-tertiary)!important}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s]{padding:var(--t-offset) .5rem;font:var(--tui-typography-body-s);border-radius:var(--tui-radius-m);--t-height: var(--tui-height-s)}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s][data-icon-start]{--t-start: 1.5rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s]:before{inset-inline-start:calc(-1rem * (1 - .2 * var(--t-zoom)));inset-block-start:calc((var(--t-offset) + var(--tui-lh)) * (1 - .1 * var(--t-zoom)));font-size:1rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s]:after{inset-inline-end:-.875rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s] tui-icon{font-size:1rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s] [tuiTitle]{font:var(--tui-typography-body-s);font-weight:700}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s] [tuiSubtitle]{font:var(--tui-typography-body-s)}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s] [tuiSubtitle]+*{gap:1rem;margin:.375rem 0 .25rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=s]>[tuiIconButton]{inset-block-start:0;inset-inline-end:0}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m]{padding:var(--t-offset) var(--tui-padding-m);font:var(--tui-typography-body-s);border-radius:var(--tui-radius-m);--t-height: var(--tui-height-m)}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m][data-icon-start]{--t-start: 1.625rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m]:before{inset-inline-start:-.875rem;font-size:1.25rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m]:after{inset-inline-end:-.75rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m] tui-icon{font-size:1.25rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m] [tuiTitle]{font:var(--tui-typography-ui-m);font-weight:700}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m] [tuiSubtitle]{font:var(--tui-typography-body-s)}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m] [tuiSubtitle]+*{gap:1rem;margin:.625rem 0 .25rem}[tuiNotification]:where(*[data-tui-version="5.18.0"])[data-size=m]>[tuiIconButton]{inset-block-start:.375rem;inset-inline-end:.5rem}[tuiNotification]:where(*[data-tui-version="5.18.0"]) [tuiTitle]{gap:.125rem;font:var(--tui-typography-ui-l);font-weight:700}[tuiNotification]:where(*[data-tui-version="5.18.0"]) [tuiSubtitle]{font:var(--tui-typography-body-m)}[tuiNotification]:where(*[data-tui-version="5.18.0"]) [tuiSubtitle]+*{display:flex;align-items:center;gap:1.25rem;margin-block-start:.625rem;font:var(--tui-typography-body-s)}[tuiNotification]:where(*[data-tui-version="5.18.0"])>[tuiIconButton]{position:absolute;inset-block-start:.75rem;inset-inline-end:.75rem;box-shadow:none!important;background:transparent!important}\n']
    }]
  }], null, null);
})();
var TuiNotificationDirective = class _TuiNotificationDirective {
  constructor() {
    this.options = inject(TUI_NOTIFICATION_OPTIONS);
    this.nothing = tuiWithStyles(Styles3);
    this.icons = tuiIconStart(computed((icon = this.icon()) => tuiIsString(icon) ? icon : icon(this.appearance())));
    this.appearance = input(this.options.appearance);
    this.size = input(this.options.size);
    this.icon = input(this.options.icon);
  }
  static {
    this.ɵfac = function TuiNotificationDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiNotificationDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiNotificationDirective,
      selectors: [["", "tuiNotification", "", 5, "ng-template"]],
      hostVars: 1,
      hostBindings: function TuiNotificationDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("data-size", ctx.size());
        }
      },
      inputs: {
        appearance: [1, "appearance"],
        size: [1, "size"],
        icon: [1, "icon"]
      },
      features: [ɵɵProvidersFeature([tuiAppearanceOptionsProvider(TUI_NOTIFICATION_OPTIONS), tuiLinkOptionsProvider({
        appearance: ""
      }), tuiButtonOptionsProvider({
        appearance: "outline-grayscale",
        size: "s"
      })]), ɵɵHostDirectivesFeature([TuiWithIcons, TuiWithAppearance])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiNotificationDirective, [{
    type: Directive,
    args: [{
      selector: "[tuiNotification]:not(ng-template)",
      providers: [tuiAppearanceOptionsProvider(TUI_NOTIFICATION_OPTIONS), tuiLinkOptionsProvider({
        appearance: ""
      }), tuiButtonOptionsProvider({
        appearance: "outline-grayscale",
        size: "s"
      })],
      hostDirectives: [TuiWithIcons, TuiWithAppearance],
      host: {
        "[attr.data-size]": "size()"
      }
    }]
  }], null, null);
})();
var TuiNotificationComponent = class _TuiNotificationComponent {
  constructor() {
    this.el = tuiInjectElement();
    this.icons = inject(TUI_COMMON_ICONS);
    this.close = inject(TUI_CLOSE_WORD);
    this.item = injectContext();
    this.sub = of(typeof this.item.autoClose === "function" ? this.item.autoClose(this.item.appearance) : this.item.autoClose).pipe(switchMap((autoClose) => autoClose ? timer(autoClose) : EMPTY), takeUntil(fromEvent(this.el, "mouseenter")), repeat({
      delay: () => fromEvent(this.el, "mouseleave")
    }), takeUntilDestroyed()).subscribe(() => this.item.$implicit.complete());
  }
  static {
    this.ɵfac = function TuiNotificationComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiNotificationComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TuiNotificationComponent,
      selectors: [["tui-notification-alert"]],
      hostAttrs: ["role", "alert"],
      features: [ɵɵHostDirectivesFeature([TuiAnimated, TuiAlertDirective])],
      decls: 8,
      vars: 9,
      consts: [[1, "t-wrapper"], ["size", "m", "tuiNotification", "", 3, "appearance", "icon"], ["tuiTitle", ""], [4, "polymorpheusOutlet", "polymorpheusOutletContext"], ["tuiSubtitle", ""], [3, "innerHTML", 4, "polymorpheusOutlet", "polymorpheusOutletContext"], ["tuiIconButton", "", "type", "button", 3, "iconStart"], [3, "innerHTML"], ["tuiIconButton", "", "type", "button", 3, "click", "iconStart"]],
      template: function TuiNotificationComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div")(1, "div", 0)(2, "div", 1)(3, "span", 2);
          ɵɵtemplate(4, TuiNotificationComponent_ng_container_4_Template, 2, 1, "ng-container", 3);
          ɵɵelementStart(5, "span", 4);
          ɵɵtemplate(6, TuiNotificationComponent_span_6_Template, 1, 1, "span", 5);
          ɵɵelementEnd()();
          ɵɵtemplate(7, TuiNotificationComponent_Conditional_7_Template, 2, 2, "button", 6);
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵclassProp("t-closable", ctx.item.closable);
          ɵɵproperty("appearance", ctx.item.appearance)("icon", ctx.item.icon);
          ɵɵadvance(2);
          ɵɵproperty("polymorpheusOutlet", ctx.item.label)("polymorpheusOutletContext", ctx.item);
          ɵɵadvance(2);
          ɵɵproperty("polymorpheusOutlet", ctx.item.content)("polymorpheusOutletContext", ctx.item);
          ɵɵadvance();
          ɵɵconditional(ctx.item.closable ? 7 : -1);
        }
      },
      dependencies: [PolymorpheusOutlet, TuiButton, TuiNotificationDirective, TuiTitle],
      styles: ["[_nghost-%COMP%]{inline-size:18rem;margin:1.625rem 3rem;word-break:break-word;transform:translateZ(0)}[_nghost-%COMP%]   tui-root._mobile[_nghost-%COMP%], tui-root._mobile   [_nghost-%COMP%]{margin:.625rem 1rem}.t-wrapper[_ngcontent-%COMP%]{background:var(--tui-background-base);box-shadow:var(--tui-shadow-medium);border-radius:var(--tui-radius-m)}.t-closable[data-size][_ngcontent-%COMP%]{padding-inline-end:2.5rem}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiNotificationComponent, [{
    type: Component,
    args: [{
      selector: "tui-notification-alert",
      imports: [PolymorpheusOutlet, TuiButton, TuiNotificationDirective, TuiTitle],
      changeDetection: ChangeDetectionStrategy.OnPush,
      hostDirectives: [TuiAnimated, TuiAlertDirective],
      host: {
        role: "alert"
      },
      template: '<div>\n    <div class="t-wrapper">\n        <div\n            size="m"\n            tuiNotification\n            [appearance]="item.appearance"\n            [class.t-closable]="item.closable"\n            [icon]="item.icon"\n        >\n            <span tuiTitle>\n                <ng-container *polymorpheusOutlet="item.label as text; context: item">\n                    {{ text }}\n                </ng-container>\n                <span tuiSubtitle>\n                    <span\n                        *polymorpheusOutlet="item.content as text; context: item"\n                        [innerHTML]="text"\n                    ></span>\n                </span>\n            </span>\n            @if (item.closable) {\n                <button\n                    tuiIconButton\n                    type="button"\n                    [iconStart]="icons.close"\n                    (click)="item.$implicit.complete()"\n                >\n                    {{ close() }}\n                </button>\n            }\n        </div>\n    </div>\n</div>\n',
      styles: [":host{inline-size:18rem;margin:1.625rem 3rem;word-break:break-word;transform:translateZ(0)}:host :host-context(tui-root._mobile){margin:.625rem 1rem}.t-wrapper{background:var(--tui-background-base);box-shadow:var(--tui-shadow-medium);border-radius:var(--tui-radius-m)}.t-closable[data-size]{padding-inline-end:2.5rem}\n"]
    }]
  }], null, null);
})();
var TuiNotificationService = class _TuiNotificationService extends TuiAlertService {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(service) {
    super(inject(TUI_NOTIFICATION_CONCURRENCY), service);
    this.options = inject(TUI_NOTIFICATION_OPTIONS);
    this.component = TuiNotificationComponent;
  }
  static {
    this.ɵfac = function TuiNotificationService_Factory(__ngFactoryType__) {
      ɵɵinvalidFactory();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TuiNotificationService,
      factory: function TuiNotificationService_Factory(__ngFactoryType__) {
        let __ngConditionalFactory__ = null;
        if (__ngFactoryType__) {
          __ngConditionalFactory__ = new __ngFactoryType__();
        } else {
          __ngConditionalFactory__ = new _TuiNotificationService(ɵɵinject(TuiPopupService));
        }
        return __ngConditionalFactory__;
      },
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiNotificationService, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      deps: [TuiPopupService],
      useClass: TuiNotificationService
    }]
  }], () => [{
    type: void 0
  }], null);
})();
var TuiNotificationTemplate = class _TuiNotificationTemplate {
  constructor() {
    this.tuiNotificationOptions = input({});
  }
  static {
    this.ɵfac = function TuiNotificationTemplate_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiNotificationTemplate)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiNotificationTemplate,
      selectors: [["ng-template", "tuiNotification", ""]],
      inputs: {
        tuiNotificationOptions: [1, "tuiNotificationOptions"]
      },
      features: [ɵɵProvidersFeature([tuiAsPortal(TuiNotificationService)]), ɵɵHostDirectivesFeature([{
        directive: TuiPortalDirective,
        inputs: ["options", "tuiNotificationOptions", "open", "tuiNotification"],
        outputs: ["openChange", "tuiNotificationChange"]
      }])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiNotificationTemplate, [{
    type: Directive,
    args: [{
      selector: "ng-template[tuiNotification]",
      providers: [tuiAsPortal(TuiNotificationService)],
      hostDirectives: [{
        directive: TuiPortalDirective,
        inputs: ["options: tuiNotificationOptions", "open: tuiNotification"],
        outputs: ["openChange: tuiNotificationChange"]
      }]
    }]
  }], null, null);
})();
var TuiNotification = [TuiNotificationDirective, TuiNotificationTemplate];

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-components-input.mjs
var TuiInputDirective = class _TuiInputDirective {
  constructor() {
    this.el = tuiInjectElement();
    this.control = inject(NgControl, {
      optional: true
    });
    this.handlers = inject(TUI_ITEMS_HANDLERS);
    this.textfield = inject(TuiTextfieldComponent);
    this.dropdown = inject(TuiDropdownDirective);
    this.a = tuiAppearance(inject(TUI_TEXTFIELD_OPTIONS).appearance);
    this.s = tuiAppearanceState(computed(() => this.state()));
    this.m = tuiAppearanceMode(computed(() => this.mode()));
    this.f = tuiAppearanceFocus(computed(() => this.focused() ?? this.textfield.focused()));
    this.readOnly = input(false);
    this.invalid = input(null);
    this.focused = input(null);
    this.state = input(null);
    this.value = tuiValue(this.el);
    this.mode = computed(() => {
      if (this.readOnly()) {
        return "readonly";
      }
      if (this.invalid() === false) {
        return "valid";
      }
      return this.invalid() ? "invalid" : null;
    });
  }
  setValue(value) {
    this.el.focus();
    this.el.select();
    if (value == null) {
      this.el.ownerDocument.execCommand("delete");
      this.el.value = "";
    } else {
      this.el.ownerDocument.execCommand("insertText", false, this.handlers.stringify()(value));
    }
  }
  static {
    this.ɵfac = function TuiInputDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiInputDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiInputDirective,
      selectors: [["input", "tuiInput", ""]],
      hostAttrs: ["tuiInput", ""],
      hostVars: 4,
      hostBindings: function TuiInputDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("focusin", function TuiInputDirective_focusin_HostBindingHandler() {
            return 0;
          })("focusout", function TuiInputDirective_focusout_HostBindingHandler() {
            return 0;
          })("input", function TuiInputDirective_input_HostBindingHandler() {
            return 0;
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("readOnly", ctx.readOnly());
          ɵɵattribute("role", ctx.dropdown.content() && !ctx.el.matches("select") ? "combobox" : null);
          ɵɵclassProp("_empty", ctx.value() === "");
        }
      },
      inputs: {
        readOnly: [1, "readOnly"],
        invalid: [1, "invalid"],
        focused: [1, "focused"],
        state: [1, "state"]
      },
      features: [ɵɵProvidersFeature([tuiAsTextfieldAccessor(_TuiInputDirective)]), ɵɵHostDirectivesFeature([TuiNativeValidator, TuiId])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiInputDirective, [{
    type: Directive,
    args: [{
      selector: "input[tuiInput]",
      providers: [tuiAsTextfieldAccessor(TuiInputDirective)],
      hostDirectives: [TuiNativeValidator, TuiId],
      host: {
        tuiInput: "",
        "[attr.role]": 'dropdown.content() && !el.matches("select") ? "combobox" : null',
        "[class._empty]": 'value() === ""',
        "[readOnly]": "readOnly()",
        "(focusin)": "0",
        "(focusout)": "0",
        "(input)": "0"
      }
    }]
  }], null, null);
})();
var TuiWithInput = class _TuiWithInput {
  static {
    this.ɵfac = function TuiWithInput_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiWithInput)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiWithInput,
      features: [ɵɵHostDirectivesFeature([{
        directive: TuiInputDirective,
        inputs: ["invalid", "invalid", "focused", "focused", "readOnly", "readOnly", "state", "state"]
      }])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiWithInput, [{
    type: Directive,
    args: [{
      hostDirectives: [{
        directive: TuiInputDirective,
        inputs: ["invalid", "focused", "readOnly", "state"]
      }]
    }]
  }], null, null);
})();
var TuiInput = [TuiLabel, TuiTextfieldComponent, TuiTextfieldOptionsDirective, TuiDropdownContent, TuiInputDirective];

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-portals-hint.mjs
function TuiHintUnstyledComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c03 = ["*"];
function TuiHintComponent_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 1);
  }
  if (rf & 2) {
    const text_r1 = ctx.polymorpheusOutlet;
    ɵɵproperty("innerHTML", text_r1, ɵɵsanitizeHtml);
  }
}
var TUI_HINT_COMPONENT = new InjectionToken(ngDevMode ? "TUI_HINT_COMPONENT" : "", {
  factory: () => TuiHintComponent
});
var TuiHintDriver = class _TuiHintDriver extends TuiDriverDirective {
  constructor() {
    super(...arguments);
    this.type = "hint";
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵTuiHintDriver_BaseFactory;
      return function TuiHintDriver_Factory(__ngFactoryType__) {
        return (ɵTuiHintDriver_BaseFactory || (ɵTuiHintDriver_BaseFactory = ɵɵgetInheritedFactory(_TuiHintDriver)))(__ngFactoryType__ || _TuiHintDriver);
      };
    })();
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintDriver,
      features: [ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintDriver, [{
    type: Directive
  }], null, null);
})();
var TUI_HINT_DIRECTIONS = ["bottom-start", "bottom", "bottom-end", "top-start", "top", "top-end", "start-top", "start", "start-bottom", "end-top", "end", "end-bottom"];
var TUI_HINT_DEFAULT_OPTIONS = {
  direction: "bottom-start",
  centered: true,
  showDelay: 500,
  hideDelay: 200,
  appearance: "",
  /** TODO @deprecated use {@link TUI_TOOLTIP_OPTIONS} instead **/
  icon: "@tui.circle-help"
};
var [TUI_HINT_OPTIONS, tuiHintOptionsProvider] = tuiCreateOptions(TUI_HINT_DEFAULT_OPTIONS);
var TuiHintHover = class _TuiHintHover extends TuiDriver {
  constructor() {
    super((subscriber) => this.stream$.subscribe(subscriber));
    this.isMobile = inject(WA_IS_MOBILE);
    this.el = tuiInjectElement();
    this.hovered$ = inject(TuiHoveredService);
    this.options = inject(TUI_HINT_OPTIONS);
    this.visible = false;
    this.toggle$ = new Subject();
    this.stream$ = merge(this.toggle$.pipe(switchMap((show) => this.isMobile ? of(show).pipe(delay(0)) : of(show).pipe(delay(show ? 0 : this.hideDelay()))), takeUntil(this.hovered$), repeat()), this.hovered$.pipe(switchMap((show) => this.isMobile ? of(show).pipe(delay(0)) : of(show).pipe(delay(show ? this.showDelay() : this.hideDelay()))), takeUntil(this.toggle$), repeat())).pipe(filter(() => this.enabled), map((value) => value && (this.el.hasAttribute("tuiHintPointer") || !tuiIsObscured(this.el))), tap((visible) => {
      this.visible = visible;
    }));
    this.parent = inject(_TuiHintHover, {
      optional: true,
      skipSelf: true
    });
    this.showDelay = input(this.options.showDelay, {
      alias: "tuiHintShowDelay"
    });
    this.hideDelay = input(this.options.hideDelay, {
      alias: "tuiHintHideDelay"
    });
    this.type = "hint";
    this.enabled = true;
  }
  toggle(visible = !this.visible) {
    this.toggle$.next(visible);
    this.parent?.toggle(visible);
  }
  close() {
    this.toggle$.next(false);
  }
  static {
    this.ɵfac = function TuiHintHover_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHintHover)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintHover,
      inputs: {
        showDelay: [1, "tuiHintShowDelay", "showDelay"],
        hideDelay: [1, "tuiHintHideDelay", "hideDelay"]
      },
      exportAs: ["tuiHintHover"],
      features: [ɵɵProvidersFeature([tuiAsDriver(_TuiHintHover), TuiHoveredService]), ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintHover, [{
    type: Directive,
    args: [{
      providers: [tuiAsDriver(TuiHintHover), TuiHoveredService],
      exportAs: "tuiHintHover"
    }]
  }], () => [], null);
})();
var GAP$1 = 8;
var ARROW_OFFSET$1 = 22;
var TOP = 1;
var LEFT = 0;
var TuiHintPosition = class _TuiHintPosition extends TuiPositionAccessor {
  constructor() {
    super(...arguments);
    this.el = tuiInjectElement();
    this.viewport = inject(TUI_VIEWPORT);
    this.options = inject(TUI_HINT_OPTIONS);
    this.directionChange = new Subject();
    this.accessor = tuiFallbackAccessor("hint")(inject(TuiRectAccessor, {
      optional: true
    }), {
      getClientRect: () => this.el.getBoundingClientRect()
    });
    this.points = TUI_HINT_DIRECTIONS.reduce((acc, direction) => __spreadProps(__spreadValues({}, acc), {
      [direction]: [0, 0]
    }), {});
    this.direction = input(this.options.direction, {
      alias: "tuiHintDirection"
    });
    this.offset = input(inject(WA_IS_MOBILE) ? 16 : 8, {
      alias: "tuiHintOffset"
    });
    this.centered = input(this.options.centered, {
      alias: "tuiHintCentered"
    });
    this.tuiHintDirectionChange = outputFromObservable(this.directionChange.pipe(distinctUntilChanged()));
    this.type = "hint";
  }
  getPosition({
    width,
    height
  }) {
    const direction = this.direction();
    const rect = this.accessor.getClientRect();
    const leftCenter = rect.left + rect.width / 2;
    const topCenter = rect.top + rect.height / 2;
    const rtl = this.el.matches('[dir="rtl"] :scope');
    const narrow = rect.width < ARROW_OFFSET$1 * 2 || this.centered();
    const short = rect.height < ARROW_OFFSET$1 * 2 || this.centered();
    const start = narrow ? leftCenter - ARROW_OFFSET$1 : rect.left;
    const end = narrow ? leftCenter - width + ARROW_OFFSET$1 : rect.right - width;
    const top = short ? topCenter - ARROW_OFFSET$1 : rect.top;
    const bottom = short ? topCenter - height + ARROW_OFFSET$1 : rect.bottom - height;
    this.points["top-start"][TOP] = rect.top - height - this.offset();
    this.points["top-start"][LEFT] = this.centered() ? end : start;
    this.points.top[TOP] = this.points["top-start"][TOP];
    this.points.top[LEFT] = leftCenter - width / 2;
    this.points["top-end"][TOP] = this.points["top-start"][TOP];
    this.points["top-end"][LEFT] = this.centered() ? start : end;
    this.points["bottom-start"][TOP] = rect.bottom + this.offset();
    this.points["bottom-start"][LEFT] = this.points["top-start"][LEFT];
    this.points.bottom[TOP] = this.points["bottom-start"][TOP];
    this.points.bottom[LEFT] = this.points.top[LEFT];
    this.points["bottom-end"][TOP] = this.points["bottom-start"][TOP];
    this.points["bottom-end"][LEFT] = this.points["top-end"][LEFT];
    this.points["start-top"][TOP] = this.centered() ? bottom : top;
    this.points["start-top"][LEFT] = rect.left - width - this.offset();
    this.points.start[TOP] = topCenter - height / 2;
    this.points.start[LEFT] = this.points["start-top"][LEFT];
    this.points["start-bottom"][TOP] = this.centered() ? bottom : top;
    this.points["start-bottom"][LEFT] = this.points["start-top"][LEFT];
    this.points["end-top"][TOP] = this.points["start-top"][TOP];
    this.points["end-top"][LEFT] = rect.right + this.offset();
    this.points.end[TOP] = this.points.start[TOP];
    this.points.end[LEFT] = this.points["end-top"][LEFT];
    this.points["end-bottom"][TOP] = this.points["start-bottom"][TOP];
    this.points["end-bottom"][LEFT] = this.points["end-top"][LEFT];
    const array = Array.isArray(direction) ? direction : [direction];
    const priority = array.map((direction2) => adjust(direction2, rtl));
    const updated = priority.concat(TUI_HINT_DIRECTIONS).find((dir) => this.checkPosition(this.points[dir], width, height)) || this.fallback;
    this.directionChange.next(adjust(updated, rtl));
    return this.points[updated];
  }
  get fallback() {
    return this.points.top[TOP] > this.viewport.getClientRect().bottom - this.points.bottom[TOP] ? "top" : "bottom";
  }
  checkPosition([left, top], width, height) {
    const viewport = this.viewport.getClientRect();
    return top > viewport.top + GAP$1 && left > viewport.left + GAP$1 && top + height < viewport.bottom - GAP$1 && left + width < viewport.right - GAP$1;
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵTuiHintPosition_BaseFactory;
      return function TuiHintPosition_Factory(__ngFactoryType__) {
        return (ɵTuiHintPosition_BaseFactory || (ɵTuiHintPosition_BaseFactory = ɵɵgetInheritedFactory(_TuiHintPosition)))(__ngFactoryType__ || _TuiHintPosition);
      };
    })();
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintPosition,
      inputs: {
        direction: [1, "tuiHintDirection", "direction"],
        offset: [1, "tuiHintOffset", "offset"],
        centered: [1, "tuiHintCentered", "centered"]
      },
      outputs: {
        tuiHintDirectionChange: "tuiHintDirectionChange"
      },
      features: [ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintPosition, [{
    type: Directive
  }], null, null);
})();
function adjust(direction, rtl) {
  if (rtl && direction.includes("left")) {
    return direction.replace("left", "right");
  }
  return rtl && direction.includes("right") ? direction.replace("right", "left") : direction;
}
var TuiHintDirective = class _TuiHintDirective {
  constructor() {
    this.service = inject(TuiPopupService);
    this.ref = signal(null);
    this.content = input(null, {
      alias: "tuiHint"
    });
    this.context = input(void 0, {
      alias: "tuiHintContext"
    });
    this.appearance = input(inject(TUI_HINT_OPTIONS).appearance, {
      alias: "tuiHintAppearance"
    });
    this.visible = outputFromObservable(toObservable(this.ref).pipe(map(Boolean), skip(1)), {
      alias: "tuiHintVisible"
    });
    this.component = inject(PolymorpheusComponent);
    this.el = tuiInjectElement();
    this.type = "hint";
  }
  ngOnChanges() {
    if (!this.content()) {
      this.toggle(false);
    }
  }
  ngOnDestroy() {
    this.toggle(false);
  }
  getClientRect() {
    return this.el.getBoundingClientRect();
  }
  toggle(show) {
    if (show && this.content() && !this.ref()) {
      this.ref.set(this.service.add(this.component));
    } else if (!show) {
      this.ref()?.destroy();
      this.ref.set(null);
    }
  }
  static {
    this.ɵfac = function TuiHintDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHintDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintDirective,
      selectors: [["", "tuiHint", "", 5, "ng-container", 5, "ng-template"]],
      inputs: {
        content: [1, "tuiHint", "content"],
        context: [1, "tuiHintContext", "context"],
        appearance: [1, "tuiHintAppearance", "appearance"]
      },
      outputs: {
        visible: "tuiHintVisible"
      },
      features: [ɵɵProvidersFeature([tuiAsVehicle(_TuiHintDirective), {
        provide: PolymorpheusComponent,
        deps: [TUI_HINT_COMPONENT, INJECTOR$1],
        useClass: PolymorpheusComponent
      }]), ɵɵHostDirectivesFeature([TuiHintDriver, {
        directive: TuiHintHover,
        inputs: ["tuiHintHideDelay", "tuiHintHideDelay", "tuiHintShowDelay", "tuiHintShowDelay"]
      }, {
        directive: TuiHintPosition,
        inputs: ["tuiHintDirection", "tuiHintDirection", "tuiHintCentered", "tuiHintCentered", "tuiHintOffset", "tuiHintOffset"],
        outputs: ["tuiHintDirectionChange", "tuiHintDirectionChange"]
      }]), ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintDirective, [{
    type: Directive,
    args: [{
      selector: "[tuiHint]:not(ng-container):not(ng-template)",
      providers: [tuiAsVehicle(TuiHintDirective), {
        provide: PolymorpheusComponent,
        deps: [TUI_HINT_COMPONENT, INJECTOR$1],
        useClass: PolymorpheusComponent
      }],
      hostDirectives: [TuiHintDriver, {
        directive: TuiHintHover,
        inputs: ["tuiHintHideDelay", "tuiHintShowDelay"]
      }, {
        directive: TuiHintPosition,
        inputs: ["tuiHintDirection", "tuiHintCentered", "tuiHintOffset"],
        outputs: ["tuiHintDirectionChange"]
      }]
    }]
  }], null, null);
})();
var TuiHintPointer = class _TuiHintPointer extends TuiHintHover {
  constructor() {
    super(...arguments);
    this.currentRect = EMPTY_CLIENT_RECT;
  }
  getClientRect() {
    return this.currentRect;
  }
  onMove({
    clientX,
    clientY
  }) {
    this.currentRect = tuiPointToClientRect(clientX, clientY);
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵTuiHintPointer_BaseFactory;
      return function TuiHintPointer_Factory(__ngFactoryType__) {
        return (ɵTuiHintPointer_BaseFactory || (ɵTuiHintPointer_BaseFactory = ɵɵgetInheritedFactory(_TuiHintPointer)))(__ngFactoryType__ || _TuiHintPointer);
      };
    })();
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintPointer,
      selectors: [["", "tuiHint", "", "tuiHintPointer", ""]],
      hostBindings: function TuiHintPointer_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mousemove.zoneless", function TuiHintPointer_mousemove_zoneless_HostBindingHandler($event) {
            return ctx.onMove($event);
          });
        }
      },
      features: [ɵɵProvidersFeature([tuiAsRectAccessor(_TuiHintPointer), tuiAsDriver(_TuiHintPointer)]), ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintPointer, [{
    type: Directive,
    args: [{
      selector: "[tuiHint][tuiHintPointer]",
      providers: [tuiAsRectAccessor(TuiHintPointer), tuiAsDriver(TuiHintPointer)],
      host: {
        "(mousemove.zoneless)": "onMove($event)"
      }
    }]
  }], null, null);
})();
var TuiHintUnstyledComponent = class _TuiHintUnstyledComponent {
  constructor() {
    this.hint = inject(TuiHintDirective);
  }
  static {
    this.ɵfac = function TuiHintUnstyledComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHintUnstyledComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TuiHintUnstyledComponent,
      selectors: [["ng-component"]],
      decls: 1,
      vars: 1,
      consts: [[4, "polymorpheusOutlet"]],
      template: function TuiHintUnstyledComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, TuiHintUnstyledComponent_ng_container_0_Template, 1, 0, "ng-container", 0);
        }
        if (rf & 2) {
          ɵɵproperty("polymorpheusOutlet", ctx.hint.content());
        }
      },
      dependencies: [PolymorpheusOutlet],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintUnstyledComponent, [{
    type: Component,
    args: [{
      imports: [PolymorpheusOutlet],
      template: '<ng-container *polymorpheusOutlet="hint.content()" />',
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var TuiHintUnstyled = class _TuiHintUnstyled {
  constructor() {
    const hint = inject(TuiHintDirective);
    tuiSetSignal(hint.content, inject(TemplateRef));
    hint.component = new PolymorpheusComponent(TuiHintUnstyledComponent, inject(INJECTOR$1));
  }
  static {
    this.ɵfac = function TuiHintUnstyled_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHintUnstyled)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintUnstyled,
      selectors: [["ng-template", "tuiHint", ""]]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintUnstyled, [{
    type: Directive,
    args: [{
      selector: "ng-template[tuiHint]"
    }]
  }], () => [], null);
})();
function tuiGetHintProviders() {
  return [TuiPositionService, TuiHoveredService, tuiPositionAccessorFor("hint", TuiHintPosition), tuiRectAccessorFor("hint", forwardRef(() => TuiHintDirective))];
}
var GAP = 8;
var ARROW_OFFSET = 22;
var TuiHintComponent = class _TuiHintComponent {
  constructor() {
    this.el = tuiInjectElement();
    this.hover = inject(TuiHintHover);
    this.vvs = inject(TuiVisualViewportService);
    this.viewport = inject(TUI_VIEWPORT);
    this.pointer = inject(TuiHintPointer, {
      optional: true
    });
    this.accessor = inject(TuiRectAccessor);
    this.hint = inject(TuiHintDirective);
    this.content = this.hint.component.component === TuiHintUnstyledComponent ? signal("") : this.hint.content;
    this.theme = this.hint.el.closest("[tuiTheme]")?.getAttribute("tuiTheme");
    this.appearance = tuiAppearance(this.hint.appearance);
    inject(TuiPositionService).pipe(takeWhile(() => this.hint.el.isConnected && this.hint.el.getClientRects().length > 0), map((point) => this.vvs.correct(point)), takeUntilDestroyed()).subscribe({
      next: (point) => this.update(...point),
      complete: () => this.hint.toggle(false)
    });
    inject(TuiHoveredService).pipe(takeUntilDestroyed()).subscribe((hover) => this.hover.toggle(hover));
  }
  onClick(target) {
    if (!target.closest(this.el.tagName) && !this.hint.el.contains(target) || tuiIsObscured(this.hint.el)) {
      this.hover.toggle(false);
    }
  }
  apply(top, left, beakTop, beakLeft) {
    this.el.style.setProperty("top", top);
    this.el.style.setProperty("left", left);
    this.el.style.setProperty("--t-top", `${beakTop}%`);
    this.el.style.setProperty("--t-left", `${beakLeft}%`);
    this.el.style.setProperty("--t-rotate", !beakLeft || Math.ceil(beakLeft) === 100 ? "90deg" : "0deg");
  }
  update(left, top) {
    const {
      clientHeight,
      clientWidth
    } = this.el;
    const rect = this.accessor.getClientRect();
    if (rect === EMPTY_CLIENT_RECT || !clientHeight || !clientWidth) {
      return;
    }
    const viewport = this.viewport.getClientRect();
    const safeLeft = tuiClamp(Math.max(GAP, left), viewport.left + GAP, Math.max(GAP, viewport.width + viewport.left - clientWidth - GAP));
    const startX = Math.round(safeLeft) === Math.round(rect.left);
    const startY = Math.round(top) === Math.round(rect.top);
    const endX = Math.round(safeLeft + clientWidth) === Math.round(rect.right);
    const endY = Math.round(top + clientHeight) === Math.round(rect.bottom);
    const [beakLeft, beakTop] = this.vvs.correct([rect.left + rect.width / 2 - safeLeft, rect.top + rect.height / 2 - top]);
    const x = startX ? ARROW_OFFSET : endX ? clientWidth - ARROW_OFFSET : beakLeft;
    const y = startY ? ARROW_OFFSET : endY ? clientHeight - ARROW_OFFSET : beakTop;
    this.apply(tuiPx(Math.round(top)), tuiPx(Math.round(safeLeft)), Math.round(tuiClamp(y, 0, clientHeight) / clientHeight * 100), Math.round(tuiClamp(x, 0, clientWidth) / clientWidth * 100));
  }
  static {
    this.ɵfac = function TuiHintComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHintComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TuiHintComponent,
      selectors: [["tui-hint"]],
      hostAttrs: ["role", "tooltip"],
      hostVars: 3,
      hostBindings: function TuiHintComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function TuiHintComponent_click_HostBindingHandler($event) {
            return ctx.onClick($event.target);
          }, false, ɵɵresolveDocument);
        }
        if (rf & 2) {
          ɵɵattribute("tuiTheme", ctx.theme);
          ɵɵclassProp("_untouchable", ctx.pointer);
        }
      },
      features: [ɵɵProvidersFeature([tuiGetHintProviders(), tuiButtonOptionsProvider({
        size: "s"
      })]), ɵɵHostDirectivesFeature([TuiAppearance, TuiAnimated, TuiActiveZone])],
      ngContentSelectors: _c03,
      decls: 2,
      vars: 2,
      consts: [[3, "innerHTML", 4, "polymorpheusOutlet", "polymorpheusOutletContext"], [3, "innerHTML"]],
      template: function TuiHintComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
          ɵɵtemplate(1, TuiHintComponent_span_1_Template, 1, 1, "span", 0);
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵproperty("polymorpheusOutlet", ctx.content())("polymorpheusOutletContext", ctx.hint.context());
        }
      },
      dependencies: [PolymorpheusOutlet],
      styles: [`[_nghost-%COMP%]{position:absolute;max-inline-size:min(20rem,calc(100% - 1rem));padding:.75rem 1rem;background:var(--tui-background-accent-1);border-radius:var(--tui-radius-l);color:var(--tui-text-primary-on-accent-1);box-sizing:border-box;font:var(--tui-typography-body-s);white-space:pre-line;overflow-wrap:break-word;transform-origin:var(--t-left) var(--t-top);--tui-background-elevation-2: var(--tui-background-elevation-3);--tui-scale: .5}.tui-enter[_nghost-%COMP%]{animation:tuiFade var(--tui-duration) var(--tui-curve-expressive-standard),tuiScale var(--tui-duration) var(--tui-curve-expressive-standard) 10ms}.tui-leave[_nghost-%COMP%]{animation:tuiFade calc(var(--tui-duration) / 2) var(--tui-curve-expressive-standard) reverse,tuiScale calc(var(--tui-duration) / 2) var(--tui-curve-expressive-standard) reverse}[_nghost-%COMP%]:before{content:"";position:absolute;inset-block-start:var(--t-top);inset-inline-start:var(--t-left);inline-size:.75rem;block-size:.5rem;background:inherit;-webkit-mask-image:url('data:image/svg+xml,<svg viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><path d="M3.61336 1.69607L2.44882 2.96493C1.84795 3.61964 0.949361 3.99951 0.00053941 4C0.000359608 4 0.000179805 4 0 4C0.000179863 4 0.000359764 4 0.000539623 4C0.949362 4.00049 1.84795 4.38036 2.44882 5.03506L3.61336 6.30394C4.55981 7.33517 5.03303 7.85079 5.63254 7.96535C5.87433 8.01155 6.12436 8.01155 6.36616 7.96535C6.96567 7.85079 7.43889 7.33517 8.38534 6.30393L9.54988 5.03507C10.1511 4.37994 11.0505 4 12 4C11.0505 4 10.1511 3.62006 9.54988 2.96493L8.38534 1.69606C7.43889 0.664826 6.96567 0.149207 6.36616 0.0346517C6.12436 -0.0115506 5.87433 -0.0115506 5.63254 0.0346517C5.03303 0.149207 4.55981 0.664827 3.61336 1.69607Z" /></svg>');mask-image:url('data:image/svg+xml,<svg viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><path d="M3.61336 1.69607L2.44882 2.96493C1.84795 3.61964 0.949361 3.99951 0.00053941 4C0.000359608 4 0.000179805 4 0 4C0.000179863 4 0.000359764 4 0.000539623 4C0.949362 4.00049 1.84795 4.38036 2.44882 5.03506L3.61336 6.30394C4.55981 7.33517 5.03303 7.85079 5.63254 7.96535C5.87433 8.01155 6.12436 8.01155 6.36616 7.96535C6.96567 7.85079 7.43889 7.33517 8.38534 6.30393L9.54988 5.03507C10.1511 4.37994 11.0505 4 12 4C11.0505 4 10.1511 3.62006 9.54988 2.96493L8.38534 1.69606C7.43889 0.664826 6.96567 0.149207 6.36616 0.0346517C6.12436 -0.0115506 5.87433 -0.0115506 5.63254 0.0346517C5.03303 0.149207 4.55981 0.664827 3.61336 1.69607Z" /></svg>');transition:none;transform:translate(-50%,-50%) rotate(var(--t-rotate))}[_nghost-%COMP%]:not([style*=top]){visibility:hidden}._untouchable[_nghost-%COMP%]{pointer-events:none}[_nghost-%COMP%]     [tuiTitle]{margin-block-end:.75rem}[_nghost-%COMP%]     [tuiTitle]+footer{margin-block-start:.75rem}[_nghost-%COMP%]     [tuiIconButton][data-appearance=icon][data-size=xs]{float:right;margin-inline-end:-.25rem}@supports (float: inline-end){[_nghost-%COMP%]     [tuiIconButton][data-appearance=icon][data-size=xs]{float:inline-end}}[_nghost-%COMP%]     img{display:block;border-radius:var(--tui-radius-m)}[_nghost-%COMP%]     footer{display:flex;justify-content:flex-end;gap:.5rem;inline-size:18rem;max-inline-size:100%;margin:1rem 0 .25rem}`],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintComponent, [{
    type: Component,
    args: [{
      selector: "tui-hint",
      imports: [PolymorpheusOutlet],
      template: `
        <ng-content />
        <span
            *polymorpheusOutlet="content() as text; context: hint.context()"
            [innerHTML]="text"
        ></span>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [tuiGetHintProviders(), tuiButtonOptionsProvider({
        size: "s"
      })],
      hostDirectives: [TuiAppearance, TuiAnimated, TuiActiveZone],
      host: {
        role: "tooltip",
        "[attr.tuiTheme]": "theme",
        "[class._untouchable]": "pointer",
        "(document:click)": "onClick($event.target)"
      },
      styles: [`:host{position:absolute;max-inline-size:min(20rem,calc(100% - 1rem));padding:.75rem 1rem;background:var(--tui-background-accent-1);border-radius:var(--tui-radius-l);color:var(--tui-text-primary-on-accent-1);box-sizing:border-box;font:var(--tui-typography-body-s);white-space:pre-line;overflow-wrap:break-word;transform-origin:var(--t-left) var(--t-top);--tui-background-elevation-2: var(--tui-background-elevation-3);--tui-scale: .5}:host.tui-enter{animation:tuiFade var(--tui-duration) var(--tui-curve-expressive-standard),tuiScale var(--tui-duration) var(--tui-curve-expressive-standard) 10ms}:host.tui-leave{animation:tuiFade calc(var(--tui-duration) / 2) var(--tui-curve-expressive-standard) reverse,tuiScale calc(var(--tui-duration) / 2) var(--tui-curve-expressive-standard) reverse}:host:before{content:"";position:absolute;inset-block-start:var(--t-top);inset-inline-start:var(--t-left);inline-size:.75rem;block-size:.5rem;background:inherit;-webkit-mask-image:url('data:image/svg+xml,<svg viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><path d="M3.61336 1.69607L2.44882 2.96493C1.84795 3.61964 0.949361 3.99951 0.00053941 4C0.000359608 4 0.000179805 4 0 4C0.000179863 4 0.000359764 4 0.000539623 4C0.949362 4.00049 1.84795 4.38036 2.44882 5.03506L3.61336 6.30394C4.55981 7.33517 5.03303 7.85079 5.63254 7.96535C5.87433 8.01155 6.12436 8.01155 6.36616 7.96535C6.96567 7.85079 7.43889 7.33517 8.38534 6.30393L9.54988 5.03507C10.1511 4.37994 11.0505 4 12 4C11.0505 4 10.1511 3.62006 9.54988 2.96493L8.38534 1.69606C7.43889 0.664826 6.96567 0.149207 6.36616 0.0346517C6.12436 -0.0115506 5.87433 -0.0115506 5.63254 0.0346517C5.03303 0.149207 4.55981 0.664827 3.61336 1.69607Z" /></svg>');mask-image:url('data:image/svg+xml,<svg viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><path d="M3.61336 1.69607L2.44882 2.96493C1.84795 3.61964 0.949361 3.99951 0.00053941 4C0.000359608 4 0.000179805 4 0 4C0.000179863 4 0.000359764 4 0.000539623 4C0.949362 4.00049 1.84795 4.38036 2.44882 5.03506L3.61336 6.30394C4.55981 7.33517 5.03303 7.85079 5.63254 7.96535C5.87433 8.01155 6.12436 8.01155 6.36616 7.96535C6.96567 7.85079 7.43889 7.33517 8.38534 6.30393L9.54988 5.03507C10.1511 4.37994 11.0505 4 12 4C11.0505 4 10.1511 3.62006 9.54988 2.96493L8.38534 1.69606C7.43889 0.664826 6.96567 0.149207 6.36616 0.0346517C6.12436 -0.0115506 5.87433 -0.0115506 5.63254 0.0346517C5.03303 0.149207 4.55981 0.664827 3.61336 1.69607Z" /></svg>');transition:none;transform:translate(-50%,-50%) rotate(var(--t-rotate))}:host:not([style*=top]){visibility:hidden}:host._untouchable{pointer-events:none}:host ::ng-deep [tuiTitle]{margin-block-end:.75rem}:host ::ng-deep [tuiTitle]+footer{margin-block-start:.75rem}:host ::ng-deep [tuiIconButton][data-appearance=icon][data-size=xs]{float:right;margin-inline-end:-.25rem}@supports (float: inline-end){:host ::ng-deep [tuiIconButton][data-appearance=icon][data-size=xs]{float:inline-end}}:host ::ng-deep img{display:block;border-radius:var(--tui-radius-m)}:host ::ng-deep footer{display:flex;justify-content:flex-end;gap:.5rem;inline-size:18rem;max-inline-size:100%;margin:1rem 0 .25rem}
`]
    }]
  }], () => [], null);
})();
var TuiHintDescribe = class _TuiHintDescribe extends TuiDriver {
  constructor() {
    super((subscriber) => this.stream$.subscribe(subscriber));
    this.doc = inject(DOCUMENT);
    this.el = tuiInjectElement();
    this.element = computed((id = this.id()) => id ? this.doc.querySelector(`#${id}`) || this.el : this.el);
    this.id = input("", {
      alias: "tuiHintDescribe"
    });
    this.type = "hint";
    this.stream$ = toObservable(this.id).pipe(distinctUntilChanged(), tuiIfMap(() => fromEvent(this.doc, "keydown", {
      capture: true
    }), tuiIsPresent), switchMap(() => this.focused ? of(false) : merge(tuiTypedFromEvent(this.doc, "keyup"), tuiTypedFromEvent(this.element(), "blur")).pipe(map(() => this.focused))), debounce((visible) => visible ? timer(1e3) : of(null)), startWith(false), distinctUntilChanged(), skip(1), tuiZoneOptimized());
  }
  get focused() {
    return tuiIsFocused(this.element());
  }
  static {
    this.ɵfac = function TuiHintDescribe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHintDescribe)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintDescribe,
      selectors: [["", "tuiHintDescribe", ""]],
      inputs: {
        id: [1, "tuiHintDescribe", "id"]
      },
      features: [ɵɵProvidersFeature([tuiAsDriver(_TuiHintDescribe)]), ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintDescribe, [{
    type: Directive,
    args: [{
      selector: "[tuiHintDescribe]",
      providers: [tuiAsDriver(TuiHintDescribe)]
    }]
  }], () => [], null);
})();
var TuiHintHost = class _TuiHintHost extends TuiRectAccessor {
  constructor() {
    super(...arguments);
    this.tuiHintHost = input();
    this.type = "hint";
  }
  getClientRect() {
    return this.tuiHintHost()?.getBoundingClientRect() || EMPTY_CLIENT_RECT;
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵTuiHintHost_BaseFactory;
      return function TuiHintHost_Factory(__ngFactoryType__) {
        return (ɵTuiHintHost_BaseFactory || (ɵTuiHintHost_BaseFactory = ɵɵgetInheritedFactory(_TuiHintHost)))(__ngFactoryType__ || _TuiHintHost);
      };
    })();
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintHost,
      selectors: [["", "tuiHint", "", "tuiHintHost", ""]],
      inputs: {
        tuiHintHost: [1, "tuiHintHost"]
      },
      features: [ɵɵProvidersFeature([tuiAsRectAccessor(_TuiHintHost)]), ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintHost, [{
    type: Directive,
    args: [{
      selector: "[tuiHint][tuiHintHost]",
      providers: [tuiAsRectAccessor(TuiHintHost)]
    }]
  }], null, null);
})();
var TuiHintManual = class _TuiHintManual extends TuiDriver {
  constructor() {
    super((subscriber) => this.stream$.subscribe(subscriber));
    this.hover = inject(TuiHintHover);
    this.stream$ = new BehaviorSubject(false);
    this.visible = input(false, {
      alias: "tuiHintManual"
    });
    this.type = "hint";
    this.hover.enabled = false;
  }
  ngOnChanges() {
    this.stream$.next(!!this.visible());
    this.hover.enabled = this.visible() === null;
  }
  static {
    this.ɵfac = function TuiHintManual_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHintManual)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintManual,
      selectors: [["", "tuiHint", "", "tuiHintManual", ""]],
      inputs: {
        visible: [1, "tuiHintManual", "visible"]
      },
      features: [ɵɵProvidersFeature([tuiAsDriver(_TuiHintManual)]), ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintManual, [{
    type: Directive,
    args: [{
      selector: "[tuiHint][tuiHintManual]",
      providers: [tuiAsDriver(TuiHintManual)]
    }]
  }], () => [], null);
})();
var TuiHintOverflow = class _TuiHintOverflow {
  constructor() {
    this.hint = inject(TuiHintDirective);
    this.content = input("", {
      alias: "tuiHintOverflow"
    });
  }
  onMouseEnter({
    scrollWidth,
    clientWidth,
    textContent
  }) {
    const content = this.content();
    tuiSetSignal(this.hint.content, scrollWidth > clientWidth && content !== null ? content || textContent : "");
  }
  static {
    this.ɵfac = function TuiHintOverflow_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHintOverflow)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHintOverflow,
      selectors: [["", "tuiHintOverflow", ""]],
      hostBindings: function TuiHintOverflow_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mouseenter", function TuiHintOverflow_mouseenter_HostBindingHandler($event) {
            return ctx.onMouseEnter($event.currentTarget);
          });
        }
      },
      inputs: {
        content: [1, "tuiHintOverflow", "content"]
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: TuiHintDirective,
        inputs: ["tuiHintAppearance", "tuiHintAppearance"]
      }])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHintOverflow, [{
    type: Directive,
    args: [{
      selector: "[tuiHintOverflow]",
      hostDirectives: [{
        directive: TuiHintDirective,
        inputs: ["tuiHintAppearance"]
      }],
      host: {
        "(mouseenter)": "onMouseEnter($event.currentTarget)"
      }
    }]
  }], null, null);
})();
var TuiHint = [TuiHintComponent, TuiHintDirective, TuiHintUnstyled, TuiHintDriver, TuiHintPosition, TuiHintHover, TuiHintOverflow, TuiHintDescribe, TuiHintHost, TuiHintManual, TuiHintPointer];

// node_modules/@taiga-ui/core/fesm2022/taiga-ui-core-components-expand.mjs
var _c04 = ["*"];
function TuiExpand_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.content() || null);
  }
}
var TuiExpand = class _TuiExpand {
  constructor() {
    this.content = contentChild(TuiItem, {
      read: TemplateRef
    });
    this.open = signal(false);
    this.expanded = input(false);
  }
  ngOnInit() {
    this.open.set(this.expanded());
  }
  onTransitionEnd({
    propertyName
  }) {
    if (propertyName === "grid-template-rows") {
      this.open.set(this.expanded());
    }
  }
  static {
    this.ɵfac = function TuiExpand_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiExpand)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TuiExpand,
      selectors: [["tui-expand"]],
      contentQueries: function TuiExpand_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.content, TuiItem, 5, TemplateRef);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostVars: 4,
      hostBindings: function TuiExpand_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("transitionend.self", function TuiExpand_transitionend_self_HostBindingHandler($event) {
            return ctx.onTransitionEnd($event);
          });
        }
        if (rf & 2) {
          ɵɵclassProp("_expanded", ctx.expanded())("_open", ctx.open());
        }
      },
      inputs: {
        expanded: [1, "expanded"]
      },
      ngContentSelectors: _c04,
      decls: 3,
      vars: 1,
      consts: [[1, "t-wrapper"], [3, "ngTemplateOutlet"]],
      template: function TuiExpand_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementStart(0, "div", 0);
          ɵɵtemplate(1, TuiExpand_Conditional_1_Template, 1, 1, "ng-container", 1);
          ɵɵprojection(2);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵconditional(ctx.expanded() || ctx.open() ? 1 : -1);
        }
      },
      dependencies: [NgTemplateOutlet],
      styles: ["[_nghost-%COMP%]{transition-property:grid-template-rows,padding;transition-duration:var(--tui-duration, .3s);transition-timing-function:var(--tui-curve-productive-standard);position:relative;display:grid;grid-template-rows:0fr;transition-delay:1ms}[_nghost-%COMP%]:not(._expanded){padding-block:0}._expanded[_nghost-%COMP%]{visibility:visible;grid-template-rows:1fr}._expanded[_nghost-%COMP%] > .t-wrapper[_ngcontent-%COMP%]{opacity:1;visibility:visible}._expanded._open[_nghost-%COMP%] > .t-wrapper[_ngcontent-%COMP%]{overflow:visible}.t-wrapper[_ngcontent-%COMP%]{transition-property:all;transition-duration:var(--tui-duration, .3s);transition-timing-function:var(--tui-curve-productive-standard);grid-row:1 / span 2;overflow:hidden;opacity:0;visibility:hidden}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiExpand, [{
    type: Component,
    args: [{
      selector: "tui-expand",
      imports: [NgTemplateOutlet],
      template: `
        <div class="t-wrapper">
            @if (expanded() || open()) {
                <ng-container [ngTemplateOutlet]="content() || null" />
            }
            <ng-content />
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class._expanded]": "expanded()",
        "[class._open]": "open()",
        "(transitionend.self)": "onTransitionEnd($event)"
      },
      styles: [":host{transition-property:grid-template-rows,padding;transition-duration:var(--tui-duration, .3s);transition-timing-function:var(--tui-curve-productive-standard);position:relative;display:grid;grid-template-rows:0fr;transition-delay:1ms}:host:not(._expanded){padding-block:0}:host._expanded{visibility:visible;grid-template-rows:1fr}:host._expanded>.t-wrapper{opacity:1;visibility:visible}:host._expanded._open>.t-wrapper{overflow:visible}.t-wrapper{transition-property:all;transition-duration:var(--tui-duration, .3s);transition-timing-function:var(--tui-curve-productive-standard);grid-row:1 / span 2;overflow:hidden;opacity:0;visibility:hidden}\n"]
    }]
  }], null, null);
})();

export {
  TuiIcon,
  TuiIconPipe,
  TUI_RADIO_OPTIONS,
  tuiRadioOptionsProvider,
  TuiRadioComponent,
  TuiRadioDirective,
  TuiRadio,
  TUI_CHECKBOX_OPTIONS,
  tuiCheckboxOptionsProvider,
  TuiCheckbox,
  TuiAlertDirective,
  TuiAlertService,
  TuiTitle,
  TUI_NOTIFICATION_DEFAULT_OPTIONS,
  TUI_NOTIFICATION_OPTIONS,
  tuiNotificationOptionsProvider,
  TUI_NOTIFICATION_CONCURRENCY,
  TuiNotificationDirective,
  TuiNotificationComponent,
  TuiNotificationService,
  TuiNotificationTemplate,
  TuiNotification,
  TuiInputDirective,
  TuiWithInput,
  TuiInput,
  TUI_HINT_COMPONENT,
  TuiHintDriver,
  TUI_HINT_DIRECTIONS,
  TUI_HINT_DEFAULT_OPTIONS,
  TUI_HINT_OPTIONS,
  tuiHintOptionsProvider,
  TuiHintHover,
  TuiHintPosition,
  TuiHintDirective,
  TuiHintPointer,
  TuiHintUnstyledComponent,
  TuiHintUnstyled,
  tuiGetHintProviders,
  TuiHintComponent,
  TuiHintDescribe,
  TuiHintHost,
  TuiHintManual,
  TuiHintOverflow,
  TuiHint,
  TuiExpand
};
//# sourceMappingURL=chunk-NIGCBIR4.js.map

import {
  tuiGenerateId,
  tuiInjectElement,
  tuiProvide,
  tuiTakeUntilDestroyed,
  tuiZonefree
} from "./chunk-SDRQHMGB.js";
import {
  NG_VALIDATORS
} from "./chunk-SVYNCHRR.js";
import {
  DOCUMENT
} from "./chunk-43U6UUQ6.js";
import {
  Directive,
  inject,
  input,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵhostProperty,
  ɵɵlistener
} from "./chunk-J6YSA62T.js";
import {
  BehaviorSubject,
  delay,
  of,
  switchMap
} from "./chunk-IVSRFTZX.js";

// node_modules/@taiga-ui/cdk/fesm2022/taiga-ui-cdk-directives-native-validator.mjs
var TuiNativeValidator = class _TuiNativeValidator {
  constructor() {
    this.el = tuiInjectElement();
    this.doc = inject(DOCUMENT);
    this.control$ = new BehaviorSubject(null);
    this.sub = this.control$.pipe(switchMap((control) => control?.events || of(null)), delay(0), tuiZonefree(), tuiTakeUntilDestroyed()).subscribe(() => this.handleValidation());
    this.tuiNativeValidator = input("Invalid");
    this.id = "";
  }
  get control() {
    return this.control$.value;
  }
  validate(control) {
    this.control$.next(control);
    return null;
  }
  handleValidation() {
    const invalid = !!this.control?.touched && this.control?.invalid;
    this.el.closest("tui-textfield")?.classList.toggle("tui-invalid", invalid);
    this.el.setCustomValidity?.(invalid ? this.tuiNativeValidator() : "");
    this.el.setAttribute("aria-invalid", String(invalid));
    if (!this.id && invalid) {
      this.doc.dispatchEvent(new CustomEvent("tui-validator", {
        detail: this
      }));
      this.el.setAttribute("aria-describedby", this.id);
    }
  }
  static {
    this.ɵfac = function TuiNativeValidator_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiNativeValidator)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiNativeValidator,
      selectors: [["", "tuiNativeValidator", ""]],
      hostBindings: function TuiNativeValidator_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("focusout", function TuiNativeValidator_focusout_HostBindingHandler() {
            return ctx.handleValidation();
          });
        }
      },
      inputs: {
        tuiNativeValidator: [1, "tuiNativeValidator"]
      },
      features: [ɵɵProvidersFeature([tuiProvide(NG_VALIDATORS, _TuiNativeValidator, true)])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiNativeValidator, [{
    type: Directive,
    args: [{
      selector: "[tuiNativeValidator]",
      providers: [tuiProvide(NG_VALIDATORS, TuiNativeValidator, true)],
      host: {
        "(focusout)": "handleValidation()"
      }
    }]
  }], null, null);
})();

// node_modules/@taiga-ui/cdk/fesm2022/taiga-ui-cdk-directives-id.mjs
var TuiId = class _TuiId {
  constructor() {
    this.el = tuiInjectElement();
    this.autoId = tuiGenerateId();
  }
  get id() {
    return this.el.id || this.autoId;
  }
  static {
    this.ɵfac = function TuiId_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiId)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiId,
      selectors: [["", "tuiId", ""]],
      hostVars: 1,
      hostBindings: function TuiId_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("id", ctx.id);
        }
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiId, [{
    type: Directive,
    args: [{
      selector: "[tuiId]",
      host: {
        "[id]": "id"
      }
    }]
  }], null, null);
})();

export {
  TuiNativeValidator,
  TuiId
};
//# sourceMappingURL=chunk-O6TWERH2.js.map

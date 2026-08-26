import {
  TUI_FALLBACK_VALUE
} from "./chunk-RYNVTAQW.js";
import {
  EMPTY_FUNCTION,
  takeUntilDestroyed,
  tuiProvide
} from "./chunk-QU4OCGII.js";
import {
  NgControl,
  NgModel
} from "./chunk-SVYNCHRR.js";
import {
  ChangeDetectorRef,
  Directive,
  computed,
  inject,
  input,
  setClassMetadata,
  signal,
  untracked,
  ɵɵdefineDirective
} from "./chunk-J6YSA62T.js";
import {
  merge
} from "./chunk-PV7DW26G.js";
import {
  Subject,
  delay,
  distinctUntilChanged,
  filter,
  identity,
  map,
  startWith,
  switchMap
} from "./chunk-IVSRFTZX.js";

// node_modules/@taiga-ui/cdk/fesm2022/taiga-ui-cdk-classes.mjs
var TuiValueTransformer = class {
};
function tuiValueTransformerFrom(token) {
  return {
    provide: TuiValueTransformer,
    useFactory: () => inject(token).valueTransformer
  };
}
var TuiNonNullableValueTransformer = class extends TuiValueTransformer {
  fromControlValue(value) {
    this.prevValue = value;
    return value;
  }
  toControlValue(value) {
    this.prevValue = value ?? this.prevValue;
    return this.prevValue;
  }
};
var TUI_IDENTITY_VALUE_TRANSFORMER = {
  fromControlValue: identity,
  toControlValue: identity
};
var FLAGS = {
  self: true,
  optional: true
};
var TuiControl = class _TuiControl {
  constructor() {
    this.fallback = inject(TUI_FALLBACK_VALUE, FLAGS);
    this.refresh$ = new Subject();
    this.internal = signal(this.fallback);
    this.control = inject(NgControl, {
      self: true
    });
    this.cdr = inject(ChangeDetectorRef);
    this.transformer = inject(TuiValueTransformer, FLAGS) ?? TUI_IDENTITY_VALUE_TRANSFORMER;
    this.value = computed(() => this.internal() ?? this.fallback);
    this.readOnly = input(false);
    this.pseudoInvalid = input(void 0, {
      alias: "invalid"
    });
    this.touched = signal(false);
    this.status = signal(void 0);
    this.disabled = computed(() => this.status() === "DISABLED");
    this.interactive = computed(() => !this.disabled() && !this.readOnly());
    this.invalid = computed(() => {
      const pseudoInvalid = this.pseudoInvalid();
      return pseudoInvalid == null ? this.interactive() && this.touched() && this.status() === "INVALID" : pseudoInvalid && this.interactive();
    });
    this.mode = computed(() => (
      // eslint-disable-next-line no-nested-ternary
      this.readOnly() ? "readonly" : this.invalid() ? "invalid" : "valid"
    ));
    this.onTouched = EMPTY_FUNCTION;
    this.onChange = EMPTY_FUNCTION;
    this.control.valueAccessor = this;
    this.refresh$.pipe(delay(0), startWith(null), map(() => this.control.control), filter(Boolean), distinctUntilChanged(), switchMap((c) => merge(c.valueChanges, c.statusChanges, c.events).pipe(startWith(null))), takeUntilDestroyed()).subscribe(() => this.update());
  }
  registerOnChange(onChange) {
    this.refresh$.next();
    this.onChange = (value) => {
      const internal = untracked(this.internal);
      if (value === internal) {
        return;
      }
      onChange(this.transformer.toControlValue(value));
      this.internal.set(value);
      this.update();
    };
  }
  registerOnTouched(onTouched) {
    this.onTouched = () => {
      onTouched();
      this.update();
    };
  }
  setDisabledState() {
    this.update();
  }
  writeValue(value) {
    const safe = this.control instanceof NgModel ? this.control.model : value;
    this.internal.set(this.transformer.fromControlValue(safe));
    this.update();
  }
  update() {
    this.status.set(this.control.control?.status);
    this.touched.set(!!this.control.control?.touched);
    this.cdr.markForCheck();
  }
  static {
    this.ɵfac = function TuiControl_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiControl)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiControl,
      inputs: {
        readOnly: [1, "readOnly"],
        pseudoInvalid: [1, "invalid", "pseudoInvalid"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiControl, [{
    type: Directive
  }], () => [], null);
})();
function tuiAsControl(control) {
  return tuiProvide(TuiControl, control);
}
var TuiValidationError = class {
  constructor(message, context = {}) {
    this.message = message;
    this.context = context;
  }
};

export {
  TuiValueTransformer,
  tuiValueTransformerFrom,
  TuiNonNullableValueTransformer,
  TUI_IDENTITY_VALUE_TRANSFORMER,
  TuiControl,
  tuiAsControl,
  TuiValidationError
};
//# sourceMappingURL=chunk-6VPGTAQ5.js.map

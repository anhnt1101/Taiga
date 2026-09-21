import {
  EMPTY_FUNCTION,
  tuiProvide
} from "./chunk-EW5P4Z7F.js";
import {
  NG_VALIDATORS,
  Validators
} from "./chunk-LYSESRVI.js";
import {
  Directive,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineDirective
} from "./chunk-RU5PXVWH.js";

// node_modules/@taiga-ui/cdk/fesm2022/taiga-ui-cdk-directives-validator.mjs
var TuiValidator = class _TuiValidator {
  constructor() {
    this.onChange = EMPTY_FUNCTION;
    this.validate = Validators.nullValidator;
  }
  registerOnValidatorChange(onChange) {
    this.onChange = onChange;
  }
  ngOnChanges() {
    this.onChange();
  }
  static {
    this.ɵfac = function TuiValidator_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiValidator)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiValidator,
      selectors: [["", "tuiValidator", ""]],
      inputs: {
        validate: [0, "tuiValidator", "validate"]
      },
      features: [ɵɵProvidersFeature([tuiProvide(NG_VALIDATORS, _TuiValidator, true)]), ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiValidator, [{
    type: Directive,
    args: [{
      selector: "[tuiValidator]",
      inputs: ["validate: tuiValidator"],
      providers: [tuiProvide(NG_VALIDATORS, TuiValidator, true)]
    }]
  }], null, null);
})();

export {
  TuiValidator
};
//# sourceMappingURL=chunk-ZRYRRHNI.js.map

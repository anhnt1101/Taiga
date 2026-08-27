import {
  tuiInjectElement
} from "./chunk-OB6TXSB6.js";
import {
  Directive,
  afterNextRender,
  setClassMetadata,
  ɵɵdefineDirective
} from "./chunk-J6YSA62T.js";

// node_modules/@taiga-ui/cdk/fesm2022/taiga-ui-cdk-directives-transitioned.mjs
var TuiTransitioned = class _TuiTransitioned {
  constructor() {
    const el = tuiInjectElement();
    afterNextRender(() => requestAnimationFrame(() => el.style.setProperty("transition", "")));
  }
  static {
    this.ɵfac = function TuiTransitioned_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiTransitioned)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiTransitioned,
      selectors: [["", "tuiTransitioned", ""]],
      hostAttrs: [2, "transition", "none"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiTransitioned, [{
    type: Directive,
    args: [{
      selector: "[tuiTransitioned]",
      host: {
        style: "transition: none"
      }
    }]
  }], () => [], null);
})();

export {
  TuiTransitioned
};
//# sourceMappingURL=chunk-CSM553D7.js.map

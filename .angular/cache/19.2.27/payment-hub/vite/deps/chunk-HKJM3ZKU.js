import {
  TUI_FALSE_HANDLER,
  TUI_TRUE_HANDLER,
  WA_IS_MOBILE,
  outputFromObservable,
  toSignal,
  tuiInjectElement,
  tuiIsElement,
  tuiTypedFromEvent,
  tuiWatch,
  tuiZoneOptimized
} from "./chunk-SDRQHMGB.js";
import {
  Directive,
  Injectable,
  NgZone,
  inject,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable
} from "./chunk-J6YSA62T.js";
import {
  merge
} from "./chunk-PV7DW26G.js";
import {
  Observable,
  distinctUntilChanged,
  filter,
  map,
  of
} from "./chunk-IVSRFTZX.js";

// node_modules/@taiga-ui/cdk/fesm2022/taiga-ui-cdk-directives-hovered.mjs
function movedOut({
  currentTarget,
  relatedTarget
}) {
  return !tuiIsElement(relatedTarget) || !tuiIsElement(currentTarget) || !currentTarget.contains(relatedTarget);
}
var TuiHoveredService = class _TuiHoveredService extends Observable {
  constructor() {
    super((subscriber) => this.stream$.subscribe(subscriber));
    this.el = tuiInjectElement();
    this.zone = inject(NgZone);
    this.stream$ = merge(
      tuiTypedFromEvent(this.el, "mouseenter").pipe(map(TUI_TRUE_HANDLER)),
      tuiTypedFromEvent(this.el, "mouseleave").pipe(map(TUI_FALSE_HANDLER)),
      // Hello, Safari
      tuiTypedFromEvent(this.el, "mouseout").pipe(filter(movedOut), map(TUI_FALSE_HANDLER))
    ).pipe(distinctUntilChanged(), tuiZoneOptimized(this.zone));
  }
  static {
    this.ɵfac = function TuiHoveredService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHoveredService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TuiHoveredService,
      factory: _TuiHoveredService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHoveredService, [{
    type: Injectable
  }], () => [], null);
})();
function tuiHovered() {
  return toSignal(inject(WA_IS_MOBILE) ? of(false) : inject(TuiHoveredService).pipe(tuiWatch()), {
    initialValue: false
  });
}
var TuiHovered = class _TuiHovered {
  constructor() {
    this.tuiHoveredChange = outputFromObservable(inject(TuiHoveredService));
  }
  static {
    this.ɵfac = function TuiHovered_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiHovered)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiHovered,
      selectors: [["", "tuiHoveredChange", ""]],
      outputs: {
        tuiHoveredChange: "tuiHoveredChange"
      },
      features: [ɵɵProvidersFeature([TuiHoveredService])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiHovered, [{
    type: Directive,
    args: [{
      selector: "[tuiHoveredChange]",
      providers: [TuiHoveredService]
    }]
  }], null, null);
})();

export {
  TuiHoveredService,
  tuiHovered,
  TuiHovered
};
//# sourceMappingURL=chunk-HKJM3ZKU.js.map

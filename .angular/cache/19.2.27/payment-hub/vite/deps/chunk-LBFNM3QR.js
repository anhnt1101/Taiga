import {
  WA_WINDOW,
  outputFromObservable,
  tuiDistanceBetweenTouches,
  tuiInjectElement,
  tuiIsPresent,
  tuiPreventDefault,
  tuiTypedFromEvent
} from "./chunk-OB6TXSB6.js";
import {
  DOCUMENT
} from "./chunk-43U6UUQ6.js";
import {
  Directive,
  ElementRef,
  Injectable,
  InjectionToken,
  Output,
  inject,
  output,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵstyleProp
} from "./chunk-J6YSA62T.js";
import {
  merge
} from "./chunk-PV7DW26G.js";
import {
  Observable,
  filter,
  map,
  pairwise,
  repeat,
  scan,
  switchMap,
  takeUntil
} from "./chunk-IVSRFTZX.js";

// node_modules/@taiga-ui/cdk/fesm2022/taiga-ui-cdk-directives-pan.mjs
var TuiPanService = class _TuiPanService extends Observable {
  constructor() {
    const el = tuiInjectElement();
    const doc = inject(DOCUMENT);
    super((subscriber) => merge(tuiTypedFromEvent(el, "touchstart", {
      passive: true
    }), tuiTypedFromEvent(el, "mousedown")).pipe(switchMap(() => merge(tuiTypedFromEvent(doc, "touchmove", {
      passive: true
    }).pipe(filter(({
      touches
    }) => touches.length < 2), map(({
      touches
    }) => touches[0])), tuiTypedFromEvent(doc, "mousemove"))), pairwise(), map(([first, second]) => {
      const deltaX = (second?.clientX ?? 0) - (first?.clientX ?? 0);
      const deltaY = (second?.clientY ?? 0) - (first?.clientY ?? 0);
      return [deltaX, deltaY];
    }), takeUntil(merge(tuiTypedFromEvent(doc, "touchend"), tuiTypedFromEvent(doc, "mouseup"))), repeat()).subscribe(subscriber));
  }
  static {
    this.ɵfac = function TuiPanService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiPanService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TuiPanService,
      factory: _TuiPanService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiPanService, [{
    type: Injectable
  }], () => [], null);
})();
var TuiPan = class _TuiPan {
  constructor() {
    this.tuiPan = outputFromObservable(inject(TuiPanService));
  }
  static {
    this.ɵfac = function TuiPan_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiPan)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiPan,
      selectors: [["", "tuiPan", ""]],
      outputs: {
        tuiPan: "tuiPan"
      },
      features: [ɵɵProvidersFeature([TuiPanService])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiPan, [{
    type: Directive,
    args: [{
      selector: "[tuiPan]",
      providers: [TuiPanService]
    }]
  }], null, null);
})();

// node_modules/@taiga-ui/cdk/fesm2022/taiga-ui-cdk-directives-swipe.mjs
var TUI_SWIPE_OPTIONS = new InjectionToken(ngDevMode ? "TUI_SWIPE_OPTIONS" : "", {
  factory: () => ({
    timeout: 500,
    threshold: 30
  })
});
var TuiSwipeService = class _TuiSwipeService extends Observable {
  constructor() {
    const doc = inject(DOCUMENT);
    const el = tuiInjectElement();
    const {
      timeout,
      threshold
    } = inject(TUI_SWIPE_OPTIONS);
    super((subscriber) => merge(tuiTypedFromEvent(el, "touchstart", {
      passive: true
    }), tuiTypedFromEvent(doc, "touchend")).pipe(pairwise(), filter(([first, second]) => !!first.touches.length && first.touches[0]?.identifier === second.changedTouches[0]?.identifier), map(([start, end]) => {
      const startX = start.touches[0]?.clientX ?? 0;
      const startY = start.touches[0]?.clientY ?? 0;
      const endX = end.changedTouches[0]?.clientX ?? 0;
      const endY = end.changedTouches[0]?.clientY ?? 0;
      const distanceX = startX - endX;
      const distanceY = startY - endY;
      const duration = end.timeStamp - start.timeStamp;
      return (Math.abs(distanceX) > threshold || Math.abs(distanceY) > threshold) && duration < timeout ? {
        direction: tuiGetSwipeDirection(distanceX, distanceY),
        events: [start, end]
      } : null;
    }), filter(tuiIsPresent)).subscribe(subscriber));
  }
  static {
    this.ɵfac = function TuiSwipeService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiSwipeService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TuiSwipeService,
      factory: _TuiSwipeService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiSwipeService, [{
    type: Injectable
  }], () => [], null);
})();
function tuiGetSwipeDirection(deltaX, deltaY) {
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    return deltaY > 0 ? "top" : "bottom";
  }
  return deltaX > 0 ? "left" : "right";
}
var TuiSwipe = class _TuiSwipe {
  constructor() {
    this.tuiSwipe = outputFromObservable(inject(TuiSwipeService));
  }
  static {
    this.ɵfac = function TuiSwipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiSwipe)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiSwipe,
      selectors: [["", "tuiSwipe", ""]],
      outputs: {
        tuiSwipe: "tuiSwipe"
      },
      features: [ɵɵProvidersFeature([TuiSwipeService])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiSwipe, [{
    type: Directive,
    args: [{
      selector: "[tuiSwipe]",
      providers: [TuiSwipeService]
    }]
  }], null, null);
})();

// node_modules/@taiga-ui/cdk/fesm2022/taiga-ui-cdk-directives-zoom.mjs
var TUI_ZOOM_OPTIONS = new InjectionToken(ngDevMode ? "TUI_ZOOM_OPTIONS" : "", {
  factory: () => ({
    wheelSensitivity: 0.01
  })
});
var TOUCH_SENSITIVITY = 0.01;
var TuiZoomService = class _TuiZoomService extends Observable {
  constructor() {
    const el = tuiInjectElement();
    const {
      wheelSensitivity
    } = inject(TUI_ZOOM_OPTIONS);
    super((subscriber) => merge(tuiTypedFromEvent(el, "touchstart", {
      passive: true
    }).pipe(filter(({
      touches
    }) => touches.length > 1), switchMap((startEvent) => tuiTypedFromEvent(el, "touchmove", {
      passive: true
    }).pipe(tuiPreventDefault(), scan((prev, event) => {
      const distance = tuiDistanceBetweenTouches(event);
      return {
        event,
        distance,
        delta: (distance - prev.distance) * TOUCH_SENSITIVITY
      };
    }, {
      event: startEvent,
      distance: tuiDistanceBetweenTouches(startEvent),
      delta: 0
    }), map(({
      event,
      delta
    }) => {
      const clientX = ((event.touches[0]?.clientX ?? 0) + (event.touches[1]?.clientX ?? 0)) / 2;
      const clientY = ((event.touches[0]?.clientY ?? 0) + (event.touches[1]?.clientY ?? 0)) / 2;
      return {
        clientX,
        clientY,
        delta,
        event
      };
    }), takeUntil(tuiTypedFromEvent(el, "touchend"))))), tuiTypedFromEvent(el, "wheel", {
      passive: false
    }).pipe(tuiPreventDefault(), map((wheel) => ({
      clientX: wheel.clientX,
      clientY: wheel.clientY,
      delta: -wheel.deltaY * wheelSensitivity,
      event: wheel
    })))).subscribe(subscriber));
  }
  static {
    this.ɵfac = function TuiZoomService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiZoomService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TuiZoomService,
      factory: _TuiZoomService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiZoomService, [{
    type: Injectable
  }], () => [], null);
})();
var TuiZoom = class _TuiZoom {
  constructor() {
    this.tuiZoom = inject(TuiZoomService);
  }
  static {
    this.ɵfac = function TuiZoom_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TuiZoom)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TuiZoom,
      selectors: [["", "tuiZoom", ""]],
      hostVars: 2,
      hostBindings: function TuiZoom_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵstyleProp("touch-action", "none");
        }
      },
      outputs: {
        tuiZoom: "tuiZoom"
      },
      features: [ɵɵProvidersFeature([TuiZoomService])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TuiZoom, [{
    type: Directive,
    args: [{
      selector: "[tuiZoom]",
      outputs: ["tuiZoom"],
      providers: [TuiZoomService],
      host: {
        "[style.touch-action]": '"none"'
      }
    }]
  }], null, null);
})();

// node_modules/@ng-web-apis/mutation-observer/fesm2022/ng-web-apis-mutation-observer.mjs
var SafeObserver = typeof MutationObserver === "undefined" ? class {
  observe() {
  }
  disconnect() {
  }
  takeRecords() {
    return [];
  }
} : MutationObserver;
var WA_MUTATION_OBSERVER_INIT = new InjectionToken(ngDevMode ? "[WA_MUTATION_OBSERVER_INIT]" : "");
function booleanAttribute(element, attribute) {
  return element.getAttribute(attribute) !== null || void 0;
}
function mutationObserverInitFactory() {
  const {
    nativeElement
  } = inject(ElementRef);
  const attributeFilter = nativeElement.getAttribute("attributeFilter");
  return {
    attributeFilter: attributeFilter?.split(",").map((attr) => attr.trim()),
    attributeOldValue: booleanAttribute(nativeElement, "attributeOldValue"),
    attributes: booleanAttribute(nativeElement, "attributes"),
    characterData: booleanAttribute(nativeElement, "characterData"),
    characterDataOldValue: booleanAttribute(nativeElement, "characterDataOldValue"),
    childList: booleanAttribute(nativeElement, "childList"),
    subtree: booleanAttribute(nativeElement, "subtree")
  };
}
var WaMutationObserver = class _WaMutationObserver extends SafeObserver {
  nativeElement = inject(ElementRef).nativeElement;
  config = inject(WA_MUTATION_OBSERVER_INIT);
  attributeFilter = "";
  attributeOldValue = "";
  attributes = "";
  characterData = "";
  characterDataOldValue = "";
  childList = "";
  subtree = "";
  waMutationObserver = output();
  constructor() {
    super((records) => {
      this.waMutationObserver.emit(records);
    });
    this.observe(this.nativeElement, this.config);
  }
  ngOnDestroy() {
    this.disconnect();
  }
  static ɵfac = function WaMutationObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WaMutationObserver)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _WaMutationObserver,
    selectors: [["", "waMutationObserver", ""]],
    inputs: {
      attributeFilter: "attributeFilter",
      attributeOldValue: "attributeOldValue",
      attributes: "attributes",
      characterData: "characterData",
      characterDataOldValue: "characterDataOldValue",
      childList: "childList",
      subtree: "subtree"
    },
    outputs: {
      waMutationObserver: "waMutationObserver"
    },
    exportAs: ["MutationObserver"],
    features: [ɵɵProvidersFeature([{
      provide: WA_MUTATION_OBSERVER_INIT,
      useFactory: mutationObserverInitFactory
    }]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WaMutationObserver, [{
    type: Directive,
    args: [{
      selector: "[waMutationObserver]",
      inputs: ["attributeFilter", "attributeOldValue", "attributes", "characterData", "characterDataOldValue", "childList", "subtree"],
      providers: [{
        provide: WA_MUTATION_OBSERVER_INIT,
        useFactory: mutationObserverInitFactory
      }],
      exportAs: "MutationObserver"
    }]
  }], () => [], {
    waMutationObserver: [{
      type: Output,
      args: ["waMutationObserver"]
    }]
  });
})();
var WaMutationObserverService = class _WaMutationObserverService extends Observable {
  constructor() {
    const nativeElement = inject(ElementRef).nativeElement;
    const config = inject(WA_MUTATION_OBSERVER_INIT);
    super((subscriber) => {
      const observer = new SafeObserver((records) => {
        subscriber.next(records);
      });
      observer.observe(nativeElement, config);
      return () => {
        observer.disconnect();
      };
    });
  }
  static ɵfac = function WaMutationObserverService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WaMutationObserverService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _WaMutationObserverService,
    factory: _WaMutationObserverService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WaMutationObserverService, [{
    type: Injectable
  }], () => [], null);
})();

// node_modules/@ng-web-apis/resize-observer/fesm2022/ng-web-apis-resize-observer.mjs
var SafeObserver2 = typeof ResizeObserver === "undefined" ? class {
  observe() {
  }
  unobserve() {
  }
  disconnect() {
  }
} : ResizeObserver;
var WA_RESIZE_OPTION_BOX_DEFAULT = "content-box";
var WA_RESIZE_OPTION_BOX = new InjectionToken(ngDevMode ? "[WA_RESIZE_OPTION_BOX]" : "", {
  factory: () => WA_RESIZE_OPTION_BOX_DEFAULT
});
var WaResizeObserverService = class _WaResizeObserverService extends Observable {
  constructor() {
    const nativeElement = inject(ElementRef).nativeElement;
    const box = inject(WA_RESIZE_OPTION_BOX);
    super((subscriber) => {
      const observer = new SafeObserver2((entries) => subscriber.next(entries));
      observer.observe(nativeElement, {
        box
      });
      return () => {
        observer.disconnect();
      };
    });
  }
  static ɵfac = function WaResizeObserverService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WaResizeObserverService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _WaResizeObserverService,
    factory: _WaResizeObserverService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WaResizeObserverService, [{
    type: Injectable
  }], () => [], null);
})();
var WaResizeObserver = class _WaResizeObserver {
  waResizeObserver = outputFromObservable(inject(WaResizeObserverService));
  waResizeBox = WA_RESIZE_OPTION_BOX_DEFAULT;
  static ɵfac = function WaResizeObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WaResizeObserver)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _WaResizeObserver,
    selectors: [["", "waResizeObserver", ""]],
    inputs: {
      waResizeBox: "waResizeBox"
    },
    outputs: {
      waResizeObserver: "waResizeObserver"
    },
    features: [ɵɵProvidersFeature([WaResizeObserverService, {
      provide: WA_RESIZE_OPTION_BOX,
      useFactory: () => inject(ElementRef).nativeElement.getAttribute("waResizeBox") || WA_RESIZE_OPTION_BOX_DEFAULT
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WaResizeObserver, [{
    type: Directive,
    args: [{
      selector: "[waResizeObserver]",
      inputs: ["waResizeBox"],
      providers: [WaResizeObserverService, {
        provide: WA_RESIZE_OPTION_BOX,
        useFactory: () => inject(ElementRef).nativeElement.getAttribute("waResizeBox") || WA_RESIZE_OPTION_BOX_DEFAULT
      }]
    }]
  }], null, {
    waResizeObserver: [{
      type: Output,
      args: ["waResizeObserver"]
    }]
  });
})();
var WA_RESIZE_OBSERVER_SUPPORT = new InjectionToken(ngDevMode ? "[WA_RESIZE_OBSERVER_SUPPORT]" : "", {
  factory: () => !!inject(WA_WINDOW).ResizeObserver
});

export {
  TuiPanService,
  TuiPan,
  TUI_SWIPE_OPTIONS,
  TuiSwipeService,
  TuiSwipe,
  WA_MUTATION_OBSERVER_INIT,
  WaMutationObserver,
  WaMutationObserverService,
  WaResizeObserverService,
  TUI_ZOOM_OPTIONS,
  TuiZoomService,
  TuiZoom
};
//# sourceMappingURL=chunk-LBFNM3QR.js.map

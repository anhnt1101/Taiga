import {
  WA_WINDOW,
  outputFromObservable
} from "./chunk-SDRQHMGB.js";
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
  ɵɵdefineInjectable
} from "./chunk-J6YSA62T.js";
import {
  Observable
} from "./chunk-IVSRFTZX.js";

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
  WA_MUTATION_OBSERVER_INIT,
  WaMutationObserver,
  WaMutationObserverService,
  WaResizeObserverService
};
//# sourceMappingURL=chunk-VLT53KJJ.js.map

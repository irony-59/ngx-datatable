!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return v(e.substr(6));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], ["5","a"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("2", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function debounce(func, wait, immediate) {
    var timeout,
        args,
        context,
        timestamp,
        result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = new Date() - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate)
            result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow)
        result = func.apply(context, args);
      return result;
    };
  }
  exports_1("debounce", debounce);
  function debounceable(duration, immediate) {
    return function innerDecorator(target, key, descriptor) {
      return {
        configurable: true,
        enumerable: descriptor.enumerable,
        get: function getter() {
          Object.defineProperty(this, key, {
            configurable: true,
            enumerable: descriptor.enumerable,
            value: debounce(descriptor.value, duration, immediate)
          });
          return this[key];
        }
      };
    };
  }
  exports_1("debounceable", debounceable);
  return {
    setters: [],
    execute: function() {}
  };
});

$__System.register("3", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var VisibilityObserver;
  return {
    setters: [],
    execute: function() {
      VisibilityObserver = (function() {
        function VisibilityObserver(element, callback) {
          this.callback = callback;
          if (window.IntersectionObserver) {
            this.observer = new IntersectionObserver(this.processChanges.bind(this), {threshold: [0.5]});
            this.observer.observe(element);
          } else {
            this.runPolyfill(element);
          }
        }
        VisibilityObserver.prototype.runPolyfill = function(element) {
          var _this = this;
          var checkVisibility = function() {
            var _a = element.getBoundingClientRect(),
                width = _a.width,
                height = _a.height;
            if (width && height) {
              _this.callback && _this.callback();
            } else {
              setTimeout(function() {
                return checkVisibility();
              }, 10);
            }
          };
          checkVisibility();
        };
        VisibilityObserver.prototype.isVisible = function(boundingClientRect, intersectionRect) {
          return ((intersectionRect.width * intersectionRect.height) / (boundingClientRect.width * boundingClientRect.height) >= 0.5);
        };
        VisibilityObserver.prototype.visibleTimerCallback = function(element, observer) {
          delete element.visibleTimeout;
          this.processChanges(observer.takeRecords());
          if ('isVisible' in element) {
            delete element.isVisible;
            this.callback && this.callback();
            observer.unobserve(element);
          }
        };
        VisibilityObserver.prototype.processChanges = function(changes) {
          var _this = this;
          changes.forEach(function(changeRecord) {
            var element = changeRecord.target;
            element.isVisible = _this.isVisible(changeRecord.boundingClientRect, changeRecord.intersectionRect);
            if ('isVisible' in element) {
              element.visibleTimeout = setTimeout(_this.visibleTimerCallback.bind(_this), 1000, element, _this.observer);
            } else {
              if ('visibleTimeout' in element) {
                clearTimeout(element.visibleTimeout);
                delete element.visibleTimeout;
              }
            }
          });
        };
        return VisibilityObserver;
      }());
      exports_1("VisibilityObserver", VisibilityObserver);
    }
  };
});

$__System.register("4", ["5", "3"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      VisibilityObserver_1;
  var Visibility;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(VisibilityObserver_1_1) {
      VisibilityObserver_1 = VisibilityObserver_1_1;
    }],
    execute: function() {
      Visibility = (function() {
        function Visibility(element) {
          this.visible = false;
          this.onVisibilityChange = new core_1.EventEmitter();
          new VisibilityObserver_1.VisibilityObserver(element.nativeElement, this.visbilityChange.bind(this));
        }
        Visibility.prototype.visbilityChange = function() {
          this.visible = true;
          this.onVisibilityChange.emit(true);
        };
        __decorate([core_1.HostBinding('class.visible'), __metadata('design:type', Object)], Visibility.prototype, "visible", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], Visibility.prototype, "onVisibilityChange", void 0);
        Visibility = __decorate([core_1.Directive({selector: '[visibility-observer]'}), __metadata('design:paramtypes', [(typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])], Visibility);
        return Visibility;
        var _a;
      }());
      exports_1("Visibility", Visibility);
    }
  };
});

$__System.register("6", ["7"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var column_1;
  function columnTotalWidth(columns, prop) {
    var totalWidth = 0;
    for (var _i = 0,
        allColumns_1 = allColumns; _i < allColumns_1.length; _i++) {
      var column = allColumns_1[_i];
      var has = prop && column[prop];
      totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
  }
  exports_1("columnTotalWidth", columnTotalWidth);
  function getTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    for (var _i = 0,
        columns_1 = columns; _i < columns_1.length; _i++) {
      var c = columns_1[_i];
      totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
  }
  exports_1("getTotalFlexGrow", getTotalFlexGrow);
  function adjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = columnTotalWidth(allColumns),
        totalFlexGrow = getTotalFlexGrow(allColumns),
        colsByGroup = column_1.columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
      scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
  }
  exports_1("adjustColumnWidths", adjustColumnWidths);
  function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    for (var attr in colsByGroup) {
      for (var _i = 0,
          _a = colsByGroup[attr]; _i < _a.length; _i++) {
        var column = _a[_i];
        if (!column.canAutoResize) {
          maxWidth -= column.width;
          totalFlexGrow -= column.flexGrow;
        } else {
          column.width = 0;
        }
      }
    }
    var hasMinWidth = {};
    var remainingWidth = maxWidth;
    do {
      var widthPerFlexPoint = remainingWidth / totalFlexGrow;
      remainingWidth = 0;
      for (var attr in colsByGroup) {
        for (var _b = 0,
            _c = colsByGroup[attr]; _b < _c.length; _b++) {
          var column = _c[_b];
          if (column.canAutoResize && !hasMinWidth[column.prop]) {
            var newWidth = column.width + column.flexGrow * widthPerFlexPoint;
            if (column.minWidth !== undefined && newWidth < column.minWidth) {
              remainingWidth += newWidth - column.minWidth;
              column.width = column.minWidth;
              hasMinWidth[column.prop] = true;
            } else {
              column.width = newWidth;
            }
          }
        }
      }
    } while (remainingWidth !== 0);
  }
  function forceFillColumnWidths(allColumns, expectedWidth, startIdx) {
    var contentWidth = 0,
        columnsToResize = startIdx > -1 ? allColumns.slice(startIdx, allColumns.length).filter(function(c) {
          return c.canAutoResize;
        }) : allColumns.filter(function(c) {
          return c.canAutoResize;
        });
    for (var _i = 0,
        allColumns_2 = allColumns; _i < allColumns_2.length; _i++) {
      var column = allColumns_2[_i];
      if (!column.canAutoResize) {
        contentWidth += column.width;
      } else {
        contentWidth += (column.$$oldWidth || column.width);
      }
    }
    var remainingWidth = expectedWidth - contentWidth,
        additionWidthPerColumn = remainingWidth / columnsToResize.length,
        exceedsWindow = contentWidth > expectedWidth;
    for (var _a = 0,
        columnsToResize_1 = columnsToResize; _a < columnsToResize_1.length; _a++) {
      var column = columnsToResize_1[_a];
      if (exceedsWindow) {
        column.width = column.$$oldWidth || column.width;
      } else {
        if (!column.$$oldWidth) {
          column.$$oldWidth = column.width;
        }
        var newSize = column.$$oldWidth + additionWidthPerColumn;
        if (column.minWith && newSize < column.minWidth) {
          column.width = column.minWidth;
        } else if (column.maxWidth && newSize > column.maxWidth) {
          column.width = column.maxWidth;
        } else {
          column.width = newSize;
        }
      }
    }
  }
  exports_1("forceFillColumnWidths", forceFillColumnWidths);
  return {
    setters: [function(column_1_1) {
      column_1 = column_1_1;
    }],
    execute: function() {}
  };
});

$__System.register("8", ["5"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1;
  var LongPress;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }],
    execute: function() {
      LongPress = (function() {
        function LongPress() {
          this.duration = 500;
          this.onLongPress = new core_1.EventEmitter();
          this.onLongPressing = new core_1.EventEmitter();
          this.onLongPressEnd = new core_1.EventEmitter();
        }
        Object.defineProperty(LongPress.prototype, "press", {
          get: function() {
            return this._pressing;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(LongPress.prototype, "longPress", {
          get: function() {
            return this._longPressing;
          },
          enumerable: true,
          configurable: true
        });
        LongPress.prototype.onMouseDown = function(event) {
          var _this = this;
          this._pressing = true;
          this._longPressing = false;
          this._timeout = setTimeout(function() {
            _this._longPressing = true;
            _this.onLongPress.emit(event);
            _this._interval = setInterval(function() {
              _this.onLongPressing.emit(event);
            }, 50);
          }, this.duration);
        };
        LongPress.prototype.endPress = function() {
          clearTimeout(this._timeout);
          clearInterval(this._interval);
          this._longPressing = false;
          this._pressing = false;
          this.onLongPressEnd.emit();
        };
        __decorate([core_1.Input(), __metadata('design:type', Number)], LongPress.prototype, "duration", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], LongPress.prototype, "onLongPress", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], LongPress.prototype, "onLongPressing", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], LongPress.prototype, "onLongPressEnd", void 0);
        __decorate([core_1.HostBinding('class.press'), __metadata('design:type', Object)], LongPress.prototype, "press", null);
        __decorate([core_1.HostBinding('class.longpress'), __metadata('design:type', Object)], LongPress.prototype, "longPress", null);
        __decorate([core_1.HostListener('mousedown', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], LongPress.prototype, "onMouseDown", null);
        __decorate([core_1.HostListener('mouseup'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], LongPress.prototype, "endPress", null);
        LongPress = __decorate([core_1.Directive({selector: '[long-press]'}), __metadata('design:paramtypes', [])], LongPress);
        return LongPress;
      }());
      exports_1("LongPress", LongPress);
    }
  };
});

$__System.register("9", ["5", "a"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      rxjs_1;
  var Resizable;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(rxjs_1_1) {
      rxjs_1 = rxjs_1_1;
    }],
    execute: function() {
      Resizable = (function() {
        function Resizable(element) {
          this.resizeEnabled = true;
          this.onResize = new core_1.EventEmitter();
          this.prevScreenX = 0;
          this.resizing = false;
          this.element = element.nativeElement;
          if (this.resizeEnabled) {
            var node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
          }
        }
        Resizable.prototype.onMouseup = function(event) {
          this.resizing = false;
          if (this.subcription) {
            this.subcription.unsubscribe();
            this.onResize.emit(this.element.clientWidth);
          }
        };
        Resizable.prototype.onMousedown = function(event) {
          var _this = this;
          var isHandle = event.target.classList.contains('resize-handle');
          if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            this.subcription = rxjs_1.Observable.fromEvent(document, 'mousemove').subscribe(function(event) {
              return _this.move(event);
            });
          }
        };
        Resizable.prototype.move = function(event) {
          var movementX = event.movementX || event.mozMovementX || (event.screenX - this.prevScreenX);
          var width = this.element.clientWidth;
          var newWidth = width + (movementX || 0);
          this.prevScreenX = event.screenX;
          var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
          var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
          if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
          }
        };
        __decorate([core_1.Input(), __metadata('design:type', Object)], Resizable.prototype, "resizeEnabled", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Object)], Resizable.prototype, "minWidth", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Object)], Resizable.prototype, "maxWidth", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], Resizable.prototype, "onResize", void 0);
        __decorate([core_1.HostListener('document:mouseup', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], Resizable.prototype, "onMouseup", null);
        __decorate([core_1.HostListener('mousedown', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], Resizable.prototype, "onMousedown", null);
        Resizable = __decorate([core_1.Directive({
          selector: '[resizable]',
          host: {'[class.resizable]': 'resizeEnabled'}
        }), __metadata('design:paramtypes', [(typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])], Resizable);
        return Resizable;
        var _a;
      }());
      exports_1("Resizable", Resizable);
    }
  };
});

$__System.register("b", ["5", "a"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      rxjs_1;
  var Draggable;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(rxjs_1_1) {
      rxjs_1 = rxjs_1_1;
    }],
    execute: function() {
      Draggable = (function() {
        function Draggable(element) {
          this.dragX = true;
          this.dragY = true;
          this.onDragStart = new core_1.EventEmitter();
          this.onDragging = new core_1.EventEmitter();
          this.onDragEnd = new core_1.EventEmitter();
          this.dragging = false;
          this.element = element.nativeElement;
        }
        Draggable.prototype.onMouseup = function(event) {
          this.dragging = false;
          if (this.subscription) {
            this.subscription.unsubscribe();
            this.onDragEnd.emit({
              event: event,
              element: this.element,
              model: this.model
            });
          }
        };
        Draggable.prototype.onMousedown = function(event) {
          var _this = this;
          if (event.target.classList.contains('draggable')) {
            event.preventDefault();
            this.dragging = true;
            var mouseDownPos_1 = {
              x: event.clientX,
              y: event.clientY
            };
            this.subscription = rxjs_1.Observable.fromEvent(document, 'mousemove').subscribe(function(event) {
              return _this.move(event, mouseDownPos_1);
            });
            this.onDragStart.emit({
              event: event,
              element: this.element,
              model: this.model
            });
          }
        };
        Draggable.prototype.move = function(event, mouseDownPos) {
          if (!this.dragging)
            return;
          var x = event.clientX - mouseDownPos.x;
          var y = event.clientY - mouseDownPos.y;
          if (this.dragX)
            this.element.style.left = x + "px";
          if (this.dragY)
            this.element.style.top = y + "px";
          if (this.dragX || this.dragY) {
            this.onDragging.emit({
              event: event,
              element: this.element,
              model: this.model
            });
          }
        };
        __decorate([core_1.Input(), __metadata('design:type', Object)], Draggable.prototype, "model", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Object)], Draggable.prototype, "dragX", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Object)], Draggable.prototype, "dragY", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], Draggable.prototype, "onDragStart", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], Draggable.prototype, "onDragging", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], Draggable.prototype, "onDragEnd", void 0);
        __decorate([core_1.HostListener('document:mouseup', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], Draggable.prototype, "onMouseup", null);
        __decorate([core_1.HostListener('mousedown', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], Draggable.prototype, "onMousedown", null);
        Draggable = __decorate([core_1.Directive({selector: '[draggable]'}), __metadata('design:paramtypes', [(typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])], Draggable);
        return Draggable;
        var _a;
      }());
      exports_1("Draggable", Draggable);
    }
  };
});

$__System.register("c", ["5", "b"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      Draggable_1;
  var Orderable;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(Draggable_1_1) {
      Draggable_1 = Draggable_1_1;
    }],
    execute: function() {
      Orderable = (function() {
        function Orderable() {
          this.onReorder = new core_1.EventEmitter();
        }
        Orderable.prototype.ngAfterContentInit = function() {
          var _this = this;
          this.drags.forEach(function(d) {
            return d.onDragStart.subscribe(_this.onDragStart.bind(_this)) && d.onDragEnd.subscribe(_this.onDragEnd.bind(_this));
          });
        };
        Orderable.prototype.onDragStart = function() {
          this.positions = {};
          var i = 0;
          for (var _i = 0,
              _a = this.drags.toArray(); _i < _a.length; _i++) {
            var dragger = _a[_i];
            var elm = dragger.element;
            this.positions[dragger.model.prop] = {
              left: parseInt(elm.offsetLeft),
              index: i++
            };
          }
        };
        Orderable.prototype.onDragEnd = function(_a) {
          var element = _a.element,
              model = _a.model;
          var newPos = parseInt(element.offsetLeft);
          var prevPos = this.positions[model.prop];
          var i = 0;
          for (var prop in this.positions) {
            var pos = this.positions[prop];
            var movedLeft = newPos < pos.left && prevPos.left > pos.left;
            var movedRight = newPos > pos.left && prevPos.left < pos.left;
            if (movedLeft || movedRight) {
              this.onReorder.emit({
                prevIndex: prevPos.index,
                newIndex: i,
                model: model
              });
            }
            i++;
          }
          element.style.left = 'auto';
        };
        __decorate([core_1.Output(), __metadata('design:type', Object)], Orderable.prototype, "onReorder", void 0);
        __decorate([core_1.ContentChildren(Draggable_1.Draggable), __metadata('design:type', Object)], Orderable.prototype, "drags", void 0);
        Orderable = __decorate([core_1.Directive({selector: '[orderable]'}), __metadata('design:paramtypes', [])], Orderable);
        return Orderable;
      }());
      exports_1("Orderable", Orderable);
    }
  };
});

$__System.register("d", ["5", "e", "f", "10"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      State_1,
      TableColumn_1,
      SortDirection_1;
  var DataTableHeaderCell;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(State_1_1) {
      State_1 = State_1_1;
    }, function(TableColumn_1_1) {
      TableColumn_1 = TableColumn_1_1;
    }, function(SortDirection_1_1) {
      SortDirection_1 = SortDirection_1_1;
    }],
    execute: function() {
      DataTableHeaderCell = (function() {
        function DataTableHeaderCell(element, state) {
          this.element = element;
          this.state = state;
          element.nativeElement.classList.add('datatable-header-cell');
        }
        Object.defineProperty(DataTableHeaderCell.prototype, "sortDir", {
          get: function() {
            var _this = this;
            var sort = this.state.options.sorts.find(function(s) {
              return s.prop === _this.model.prop;
            });
            if (sort)
              return sort.dir;
          },
          enumerable: true,
          configurable: true
        });
        DataTableHeaderCell.prototype.sortClasses = function(sort) {
          var dir = this.sortDir;
          return {
            'sort-asc icon-down': dir === SortDirection_1.SortDirection.asc,
            'sort-desc icon-up': dir === SortDirection_1.SortDirection.desc
          };
        };
        DataTableHeaderCell.prototype.onSort = function() {
          if (this.model.sortable) {
            this.state.nextSort(this.model);
          }
        };
        __decorate([core_1.Input(), __metadata('design:type', TableColumn_1.TableColumn)], DataTableHeaderCell.prototype, "model", void 0);
        DataTableHeaderCell = __decorate([core_1.Component({
          selector: 'datatable-header-cell',
          template: "\n  \t<div>\n      <span\n        class=\"datatable-header-cell-label draggable\"\n        (click)=\"onSort()\"\n        [innerHTML]=\"model.name\">\n      </span>\n      <span\n        class=\"sort-btn\"\n        [ngClass]=\"sortClasses()\">\n      </span>\n    </div>\n  ",
          directives: [],
          host: {
            '[class.sortable]': 'model.sortable',
            '[class.resizable]': 'model.resizable',
            '[style.width]': 'model.width',
            '[style.minWidth]': 'model.minWidth',
            '[style.maxWidth]': 'model.maxWidth',
            '[style.height]': 'model.height',
            '[attr.title]': 'model.name'
          }
        }), __metadata('design:paramtypes', [(typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, State_1.StateService])], DataTableHeaderCell);
        return DataTableHeaderCell;
        var _a;
      }());
      exports_1("DataTableHeaderCell", DataTableHeaderCell);
    }
  };
});

$__System.register("11", ["5", "e", "8", "b", "9", "c", "d"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      State_1,
      LongPress_1,
      Draggable_1,
      Resizable_1,
      Orderable_1,
      HeaderCell_1;
  var DataTableHeader;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(State_1_1) {
      State_1 = State_1_1;
    }, function(LongPress_1_1) {
      LongPress_1 = LongPress_1_1;
    }, function(Draggable_1_1) {
      Draggable_1 = Draggable_1_1;
    }, function(Resizable_1_1) {
      Resizable_1 = Resizable_1_1;
    }, function(Orderable_1_1) {
      Orderable_1 = Orderable_1_1;
    }, function(HeaderCell_1_1) {
      HeaderCell_1 = HeaderCell_1_1;
    }],
    execute: function() {
      DataTableHeader = (function() {
        function DataTableHeader(state, elm) {
          this.state = state;
          elm.nativeElement.classList.add('datatable-header');
        }
        DataTableHeader.prototype.columnResized = function(width, column) {
          column.width = width;
        };
        DataTableHeader.prototype.columnReordered = function(_a) {
          var prevIndex = _a.prevIndex,
              newIndex = _a.newIndex,
              model = _a.model;
          this.state.options.columns.splice(prevIndex, 1);
          this.state.options.columns.splice(newIndex, 0, model);
        };
        DataTableHeader = __decorate([core_1.Component({
          selector: 'datatable-header',
          template: "\n  \t<div\n      [style.width]=\"state.columnGroupWidths.total\"\n      class=\"datatable-header-inner\"\n      orderable\n      (onReorder)=\"columnReordered($event)\">\n      <div\n        class=\"datatable-row-left\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.left\"\n          resizable\n          [resizeEnabled]=\"column.resizable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"draggable = true\"\n          (onLongPressEnd)=\"draggable = false\"\n          draggable\n          [dragX]=\"column.draggable && draggable\"\n          [dragY]=\"false\"\n          [model]=\"column\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-center\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.center\"\n          resizable\n          [resizeEnabled]=\"column.resizable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"draggable = true\"\n          (onLongPressEnd)=\"draggable = false\"\n          draggable\n          [dragX]=\"column.draggable && draggable\"\n          [dragY]=\"false\"\n          [model]=\"column\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-right\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.right\"\n          resizable\n          [resizeEnabled]=\"column.resizable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"draggable = true\"\n          (onLongPressEnd)=\"draggable = false\"\n          draggable\n          [dragX]=\"column.draggable && draggable\"\n          [dragY]=\"false\"\n          [model]=\"column\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
          directives: [HeaderCell_1.DataTableHeaderCell, Draggable_1.Draggable, Resizable_1.Resizable, Orderable_1.Orderable, LongPress_1.LongPress],
          host: {
            '[style.width]': 'state.innerWidth',
            '[style.height]': 'state.options.headerHeight'
          }
        }), __metadata('design:paramtypes', [State_1.StateService, (typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])], DataTableHeader);
        return DataTableHeader;
        var _a;
      }());
      exports_1("DataTableHeader", DataTableHeader);
    }
  };
});

$__System.register("12", ["5"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1;
  var ProgressBar;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }],
    execute: function() {
      ProgressBar = (function() {
        function ProgressBar() {}
        ProgressBar = __decorate([core_1.Component({
          selector: 'datatable-progress',
          template: "\n    <div\n      class=\"progress-linear\"\n      role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  ",
          directives: []
        }), __metadata('design:paramtypes', [])], ProgressBar);
        return ProgressBar;
      }());
      exports_1("ProgressBar", ProgressBar);
    }
  };
});

$__System.register("13", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function deepValueGetter(obj, path) {
    if (!obj || !path)
      return obj;
    var current = obj,
        split = path.split('.');
    if (split.length) {
      for (var i = 0,
          len = split.length; i < len; i++) {
        current = current[split[i]];
      }
    }
    return current;
  }
  exports_1("deepValueGetter", deepValueGetter);
  return {
    setters: [],
    execute: function() {
      ;
    }
  };
});

$__System.register("14", ["5", "13"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      deepGetter_1;
  var DataTableBodyCell;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(deepGetter_1_1) {
      deepGetter_1 = deepGetter_1_1;
    }],
    execute: function() {
      DataTableBodyCell = (function() {
        function DataTableBodyCell(elm) {
          elm.nativeElement.classList.add('datatable-body-cell');
        }
        Object.defineProperty(DataTableBodyCell.prototype, "rowValue", {
          get: function() {
            if (!this.row)
              return '';
            return deepGetter_1.deepValueGetter(this.row, this.column.prop);
          },
          enumerable: true,
          configurable: true
        });
        __decorate([core_1.Input(), __metadata('design:type', Object)], DataTableBodyCell.prototype, "column", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Object)], DataTableBodyCell.prototype, "row", void 0);
        DataTableBodyCell = __decorate([core_1.Component({
          selector: 'datatable-body-cell',
          template: "\n  \t<div class=\"datatable-body-cell-label\">\n      <span [innerHTML]=\"rowValue\"></span>\n    </div>\n  ",
          directives: [],
          host: {
            '[style.width]': 'column.width',
            '[style.height]': 'column.height'
          }
        }), __metadata('design:paramtypes', [(typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])], DataTableBodyCell);
        return DataTableBodyCell;
        var _a;
      }());
      exports_1("DataTableBodyCell", DataTableBodyCell);
    }
  };
});

$__System.register("15", ["5", "e", "14"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      State_1,
      BodyCell_1;
  var DataTableBodyRow;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(State_1_1) {
      State_1 = State_1_1;
    }, function(BodyCell_1_1) {
      BodyCell_1 = BodyCell_1_1;
    }],
    execute: function() {
      DataTableBodyRow = (function() {
        function DataTableBodyRow(state, elm) {
          this.state = state;
          elm.nativeElement.classList.add('datatable-body-row');
        }
        Object.defineProperty(DataTableBodyRow.prototype, "isSelected", {
          get: function() {
            return this.state.selected && this.state.selected.indexOf(this.row) > -1;
          },
          enumerable: true,
          configurable: true
        });
        __decorate([core_1.Input(), __metadata('design:type', Object)], DataTableBodyRow.prototype, "row", void 0);
        DataTableBodyRow = __decorate([core_1.Component({
          selector: 'datatable-body-row',
          template: "\n  \t<div>\n      <div class=\"datatable-row-left\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.left\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div class=\"datatable-row-center\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.center\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div class=\"datatable-row-right\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.right\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n    </div>\n  ",
          directives: [BodyCell_1.DataTableBodyCell],
          host: {'[class.active]': 'isSelected'}
        }), __metadata('design:paramtypes', [State_1.StateService, (typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])], DataTableBodyRow);
        return DataTableBodyRow;
        var _a;
      }());
      exports_1("DataTableBodyRow", DataTableBodyRow);
    }
  };
});

$__System.register("16", ["5"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1;
  var DataTableScroll;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }],
    execute: function() {
      DataTableScroll = (function() {
        function DataTableScroll(elm) {
          elm.nativeElement.classList.add('datatable-scroll');
        }
        __decorate([core_1.Input(), __metadata('design:type', Number)], DataTableScroll.prototype, "rowHeight", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Number)], DataTableScroll.prototype, "count", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Number)], DataTableScroll.prototype, "scrollWidth", void 0);
        DataTableScroll = __decorate([core_1.Component({
          selector: 'datatable-scroll',
          template: "\n    <ng-content></ng-content>\n  ",
          host: {
            '[style.height]': 'count * rowHeight',
            '[style.width]': 'scrollWidth'
          }
        }), __metadata('design:paramtypes', [(typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])], DataTableScroll);
        return DataTableScroll;
        var _a;
      }());
      exports_1("DataTableScroll", DataTableScroll);
    }
  };
});

$__System.register("17", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Keys;
  return {
    setters: [],
    execute: function() {
      (function(Keys) {
        Keys[Keys["up"] = 38] = "up";
        Keys[Keys["down"] = 40] = "down";
        Keys[Keys["return"] = 13] = "return";
        Keys[Keys["escape"] = 27] = "escape";
      })(Keys || (Keys = {}));
      exports_1("Keys", Keys);
    }
  };
});

$__System.register("18", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function selectRows(selected, row) {
    var selectedIndex = selected.indexOf(row);
    if (selectedIndex > -1) {
      selected.splice(selectedIndex, 1);
    } else {
      selected.push(row);
    }
    return selected;
  }
  exports_1("selectRows", selectRows);
  function selectRowsBetween(selected, rows, index, prevIndex) {
    var reverse = index < prevIndex;
    for (var i = 0,
        len = rows.length; i < len; i++) {
      var row = rows[i];
      var greater = i >= prevIndex && i <= index;
      var lesser = i <= prevIndex && i >= index;
      var range = {};
      if (reverse) {
        range = {
          start: index,
          end: (prevIndex - index)
        };
      } else {
        range = {
          start: prevIndex,
          end: index + 1
        };
      }
      if ((reverse && lesser) || (!reverse && greater)) {
        var idx = selected.indexOf(row);
        if (reverse && idx > -1) {
          selected.splice(idx, 1);
          continue;
        }
        if (i >= range.start && i < range.end) {
          if (idx === -1) {
            selected.push(row);
          }
        }
      }
    }
    return selected;
  }
  exports_1("selectRowsBetween", selectRowsBetween);
  return {
    setters: [],
    execute: function() {}
  };
});

$__System.register("19", ["5", "12", "15", "16", "e", "1a", "17", "18"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      ProgressBar_1,
      BodyRow_1,
      Scroll_1,
      State_1,
      SelectionType_1,
      Keys_1,
      selection_1;
  var DataTableBody;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(ProgressBar_1_1) {
      ProgressBar_1 = ProgressBar_1_1;
    }, function(BodyRow_1_1) {
      BodyRow_1 = BodyRow_1_1;
    }, function(Scroll_1_1) {
      Scroll_1 = Scroll_1_1;
    }, function(State_1_1) {
      State_1 = State_1_1;
    }, function(SelectionType_1_1) {
      SelectionType_1 = SelectionType_1_1;
    }, function(Keys_1_1) {
      Keys_1 = Keys_1_1;
    }, function(selection_1_1) {
      selection_1 = selection_1_1;
    }],
    execute: function() {
      DataTableBody = (function() {
        function DataTableBody(state, elm) {
          this.state = state;
          this.onRowClick = new core_1.EventEmitter();
          this.onRowSelect = new core_1.EventEmitter();
          this.showProgress = true;
          elm.nativeElement.classList.add('datatable-body');
        }
        Object.defineProperty(DataTableBody.prototype, "selectEnabled", {
          get: function() {
            return this.state.options.selectionType !== undefined;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(DataTableBody.prototype, "bodyHeight", {
          get: function() {
            if (this.state.options.scrollbarV)
              return this.state.bodyHeight;
            return 'auto';
          },
          enumerable: true,
          configurable: true
        });
        DataTableBody.prototype.ngOnInit = function() {
          var _this = this;
          this.rows = this.state.rows.slice();
          this.state.onPageChange.subscribe(function(page) {
            var _a = _this.state.indexes,
                first = _a.first,
                last = _a.last;
            _this.rows = _this.state.rows.slice(first, last);
            setTimeout(function() {
              return _this.showProgress = false;
            }, 500);
          });
          this.state.onRowsUpdate.subscribe(function(rows) {
            var _a = _this.state.indexes,
                first = _a.first,
                last = _a.last;
            _this.rows = rows.slice(first, last);
            setTimeout(function() {
              return _this.showProgress = false;
            }, 500);
          });
        };
        DataTableBody.prototype.rowClicked = function(event, index, row) {
          this.onRowClick.emit({
            event: event,
            row: row
          });
          this.selectRow(event, index, row);
        };
        DataTableBody.prototype.rowKeydown = function(event, index, row) {
          if (event.keyCode === Keys_1.Keys.return && this.selectEnabled) {
            this.selectRow(event, index, row);
          } else if (event.keyCode === Keys_1.Keys.up || event.keyCode === Keys_1.Keys.down) {
            var dom = event.keyCode === Keys_1.Keys.up ? event.target.previousElementSibling : event.target.nextElementSibling;
            if (dom)
              dom.focus();
          }
        };
        DataTableBody.prototype.selectRow = function(event, index, row) {
          if (!this.selectEnabled)
            return;
          var multiShift = this.state.options.selectionType === SelectionType_1.SelectionType.multiShift;
          var multiClick = this.state.options.selectionType === SelectionType_1.SelectionType.multi;
          var selections = [];
          if (multiShift || multiClick) {
            if (multiShift && event.shiftKey) {
              var selected = this.state.selected.slice();
              selections = selection_1.selectRowsBetween(selected, this.rows, index, this.prevIndex);
            } else if (multiShift && !event.shiftKey) {
              selections.push(row);
            } else {
              var selected = this.state.selected.slice();
              selections = selection_1.selectRows(selected, row);
            }
          } else {
            selections.push(row);
          }
          this.prevIndex = index;
          this.onRowSelect.emit(selections);
        };
        __decorate([core_1.Output(), __metadata('design:type', Object)], DataTableBody.prototype, "onRowClick", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], DataTableBody.prototype, "onRowSelect", void 0);
        DataTableBody = __decorate([core_1.Component({
          selector: 'datatable-body',
          template: "\n    <div>\n      <datatable-progress></datatable-progress>\n      <datatable-scroll\n        [rowHeight]=\"state.options.rowHeight\"\n        [count]=\"state.rowCount\"\n        [scrollWidth]=\"state.columnGroupWidths.total\">\n        <datatable-body-row\n          *ngFor=\"let row of rows; let i = index;\"\n          [attr.tabindex]=\"i\"\n          (click)=\"rowClicked($event, i, row)\"\n          (keydown)=\"rowKeydown($event, i, row)\"\n          [row]=\"row\">\n        </datatable-body-row>\n        <div\n          class=\"empty\"\n          *ngIf=\"!rows.length\"\n          [innerHTML]=\"state.options.emptyMessage\">\n        </div>\n      </datatable-scroll>\n    </div>\n  ",
          directives: [ProgressBar_1.ProgressBar, BodyRow_1.DataTableBodyRow, Scroll_1.DataTableScroll],
          host: {
            '[style.width]': 'state.innerWidth',
            '[style.height]': 'bodyHeight',
            '[class.loading]': 'showProgress'
          }
        }), __metadata('design:paramtypes', [State_1.StateService, (typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])], DataTableBody);
        return DataTableBody;
        var _a;
      }());
      exports_1("DataTableBody", DataTableBody);
    }
  };
});

$__System.register("7", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function columnsByPin(cols) {
    var ret = {
      left: [],
      center: [],
      right: []
    };
    if (cols) {
      for (var i = 0,
          len = cols.length; i < len; i++) {
        var c = cols[i];
        if (c.frozenLeft) {
          ret.left.push(c);
        } else if (c.frozenRight) {
          ret.right.push(c);
        } else {
          ret.center.push(c);
        }
      }
    }
    return ret;
  }
  exports_1("columnsByPin", columnsByPin);
  function columnGroupWidths(groups, all) {
    return {
      left: columnTotalWidth(groups.left),
      center: columnTotalWidth(groups.center),
      right: columnTotalWidth(groups.right),
      total: columnTotalWidth(all)
    };
  }
  exports_1("columnGroupWidths", columnGroupWidths);
  function columnTotalWidth(columns, prop) {
    var totalWidth = 0;
    if (columns) {
      for (var i = 0,
          len = columns.length; i < len; i++) {
        var c = columns[i];
        var has = prop && c[prop];
        totalWidth = totalWidth + (has ? c[prop] : c.width);
      }
    }
    return totalWidth;
  }
  exports_1("columnTotalWidth", columnTotalWidth);
  return {
    setters: [],
    execute: function() {
      ;
      ;
    }
  };
});

$__System.register("1b", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function scrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";
    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
  }
  exports_1("scrollbarWidth", scrollbarWidth);
  return {
    setters: [],
    execute: function() {
      ;
    }
  };
});

$__System.register("1c", ["1d", "10"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var SortType_1,
      SortDirection_1;
  function nextSortDir(sortType, current) {
    if (sortType === SortType_1.SortType.single) {
      if (current === SortDirection_1.SortDirection.asc) {
        return SortDirection_1.SortDirection.desc;
      } else {
        return SortDirection_1.SortDirection.asc;
      }
    } else {
      if (!current) {
        return SortDirection_1.SortDirection.asc;
      } else if (current === SortDirection_1.SortDirection.asc) {
        return SortDirection_1.SortDirection.desc;
      } else if (currentSort === SortDirection_1.SortDirection.desc) {
        return undefined;
      }
    }
  }
  exports_1("nextSortDir", nextSortDir);
  function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
      a = 0;
    if (b === null || typeof b === 'undefined')
      b = 0;
    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      if (a.toLowerCase() < b.toLowerCase())
        return -1;
      if (a.toLowerCase() > b.toLowerCase())
        return 1;
    } else {
      if (parseFloat(a) < parseFloat(b))
        return -1;
      if (parseFloat(a) > parseFloat(b))
        return 1;
    }
    return 0;
  }
  exports_1("orderByComparator", orderByComparator);
  function sortRows(rows, dirs) {
    var temp = rows.slice();
    return temp.sort(function(a, b) {
      for (var _i = 0,
          dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var _a = dirs_1[_i],
            prop = _a.prop,
            dir = _a.dir;
        var comparison = dir !== SortDirection_1.SortDirection.desc ? orderByComparator(a[prop], b[prop]) : -orderByComparator(a[prop], b[prop]);
        if (comparison !== 0)
          return comparison;
      }
      return 0;
    });
  }
  exports_1("sortRows", sortRows);
  return {
    setters: [function(SortType_1_1) {
      SortType_1 = SortType_1_1;
    }, function(SortDirection_1_1) {
      SortDirection_1 = SortDirection_1_1;
    }],
    execute: function() {
      ;
    }
  };
});

$__System.register("1e", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Sort;
  return {
    setters: [],
    execute: function() {
      Sort = (function() {
        function Sort(props) {
          Object.assign(this, props);
        }
        return Sort;
      }());
      exports_1("Sort", Sort);
    }
  };
});

$__System.register("e", ["5", "7", "1b", "1c", "1e", "1d"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      column_1,
      scrollbarWidth_1,
      sort_1,
      Sort_1,
      SortType_1;
  var StateService;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(column_1_1) {
      column_1 = column_1_1;
    }, function(scrollbarWidth_1_1) {
      scrollbarWidth_1 = scrollbarWidth_1_1;
    }, function(sort_1_1) {
      sort_1 = sort_1_1;
    }, function(Sort_1_1) {
      Sort_1 = Sort_1_1;
    }, function(SortType_1_1) {
      SortType_1 = SortType_1_1;
    }],
    execute: function() {
      StateService = (function() {
        function StateService() {
          this.onRowsUpdate = new core_1.EventEmitter();
          this.onPageChange = new core_1.EventEmitter();
          this.scrollbarWidth = scrollbarWidth_1.scrollbarWidth();
          this.offsetX = 0;
          this.offsetY = 0;
          this.innerWidth = 0;
          this.bodyHeight = 300;
        }
        Object.defineProperty(StateService.prototype, "columnsByPin", {
          get: function() {
            return column_1.columnsByPin(this.options.columns);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(StateService.prototype, "columnGroupWidths", {
          get: function() {
            return column_1.columnGroupWidths(this.columnsByPin, this.options.columns);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(StateService.prototype, "pageCount", {
          get: function() {
            if (!this.options.externalPaging) {
              return this.rows.length;
            }
            return this.options.count;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(StateService.prototype, "pageSize", {
          get: function() {
            if (this.options.scrollbarV)
              return Math.ceil(this.bodyHeight / this.options.rowHeight) + 1;
            return this.options.limit;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(StateService.prototype, "indexes", {
          get: function() {
            var first = 0,
                last = 0;
            if (this.options.scrollbarV) {
              first = Math.max(Math.floor((this.offsetY || 0) / this.options.rowHeight, 0), 0);
              last = Math.min(first + this.pageSize, this.pageCount);
            } else {
              first = Math.max(this.options.offset * this.options.limit, 0);
              last = Math.min(first + this.pageSize, this.pageCount);
            }
            return {
              first: first,
              last: last
            };
          },
          enumerable: true,
          configurable: true
        });
        StateService.prototype.setSelected = function(selected) {
          this.selected = selected;
          return this;
        };
        StateService.prototype.setRows = function(rows) {
          this.rows = rows.slice();
          this.onRowsUpdate.emit(rows);
          return this;
        };
        StateService.prototype.setOptions = function(options) {
          this.options = options;
          return this;
        };
        StateService.prototype.setPage = function(page) {
          this.options.offset = page - 1;
          this.onPageChange.emit({
            offset: this.options.offset,
            limit: this.pageSize,
            pageCount: this.pageCount
          });
        };
        StateService.prototype.nextSort = function(column) {
          var idx = this.options.sorts.findIndex(function(s) {
            return s.prop === column.prop;
          });
          var curSort = this.options.sorts[idx];
          var curDir = undefined;
          if (curSort)
            curDir = curSort.dir;
          var dir = sort_1.nextSortDir(this.options.sortType, curDir);
          if (dir === undefined) {
            this.options.sorts.splice(idx, 1);
          } else if (curSort) {
            this.options.sorts[idx].dir = dir;
          } else {
            if (this.options.sortType === SortType_1.SortType.single) {
              this.options.sorts.splice(0, this.options.sorts.length);
            }
            this.options.sorts.push(new Sort_1.Sort({
              dir: dir,
              prop: column.prop
            }));
          }
          if (!column.comparator) {
            this.setRows(sort_1.sortRows(this.rows, this.options.sorts));
          } else {
            column.comparator(this.rows, this.options.sorts);
          }
        };
        StateService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], StateService);
        return StateService;
      }());
      exports_1("StateService", StateService);
    }
  };
});

$__System.register("1f", ["5"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1;
  var DataTablePager;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }],
    execute: function() {
      DataTablePager = (function() {
        function DataTablePager(elm) {
          this.page = 1;
          this.size = 0;
          this.count = 0;
          this.onPaged = new core_1.EventEmitter();
          elm.nativeElement.classList.add('datatable-pager');
        }
        Object.defineProperty(DataTablePager.prototype, "totalPages", {
          get: function() {
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(DataTablePager.prototype, "count", {
          get: function() {
            return this._count;
          },
          set: function(val) {
            this._count = val;
            this.pages = this.calcPages();
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(DataTablePager.prototype, "page", {
          get: function() {
            return this._page;
          },
          set: function(val) {
            this._page = val;
            this.pages = this.calcPages();
          },
          enumerable: true,
          configurable: true
        });
        DataTablePager.prototype.canPrevious = function() {
          return this.page > 1;
        };
        DataTablePager.prototype.canNext = function() {
          return this.page < this.totalPages;
        };
        DataTablePager.prototype.prevPage = function() {
          if (this.page > 1) {
            this.selectPage(--this.page);
          }
        };
        DataTablePager.prototype.nextPage = function() {
          this.selectPage(++this.page);
        };
        DataTablePager.prototype.selectPage = function(page) {
          if (page > 0 && page <= this.totalPages) {
            this.page = page;
            this.onPaged.emit(page);
          }
        };
        DataTablePager.prototype.calcPages = function(page) {
          var pages = [],
              startPage = 1,
              endPage = this.totalPages,
              maxSize = 5,
              isMaxSized = maxSize < this.totalPages;
          page = page || this.page;
          if (isMaxSized) {
            startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
            endPage = Math.min(startPage + maxSize - 1, this.totalPages);
          }
          for (var number = startPage; number <= endPage; number++) {
            pages.push({
              number: number,
              text: number
            });
          }
          return pages;
        };
        __decorate([core_1.Input(), __metadata('design:type', Number)], DataTablePager.prototype, "page", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Number)], DataTablePager.prototype, "size", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Number)], DataTablePager.prototype, "count", void 0);
        __decorate([core_1.Output(), __metadata('design:type', (typeof(_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)], DataTablePager.prototype, "onPaged", void 0);
        DataTablePager = __decorate([core_1.Component({
          selector: 'datatable-pager',
          template: "\n    <ul class=\"pager\">\n      <li [attr.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\"\n          class=\"icon-prev\">\n        </a>\n      </li>\n      <li [attr.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\"\n          class=\"icon-left\">\n        </a>\n      </li>\n      <li\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [attr.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\"\n          class=\"icon-right\">\n        </a>\n      </li>\n      <li [attr.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\"\n          class=\"icon-skip\">\n        </a>\n      </li>\n    </ul>\n  "
        }), __metadata('design:paramtypes', [(typeof(_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object])], DataTablePager);
        return DataTablePager;
        var _a,
            _b;
      }());
      exports_1("DataTablePager", DataTablePager);
    }
  };
});

$__System.register("20", ["5", "e", "1f"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      State_1,
      Pager_1;
  var DataTableFooter;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(State_1_1) {
      State_1 = State_1_1;
    }, function(Pager_1_1) {
      Pager_1 = Pager_1_1;
    }],
    execute: function() {
      DataTableFooter = (function() {
        function DataTableFooter(elm, state) {
          this.state = state;
          this.onPageChange = new core_1.EventEmitter();
          elm.nativeElement.classList.add('datatable-footer');
        }
        Object.defineProperty(DataTableFooter.prototype, "visible", {
          get: function() {
            return (this.state.pageCount / this.state.pageSize) > 1;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(DataTableFooter.prototype, "curPage", {
          get: function() {
            return this.state.options.offset + 1;
          },
          enumerable: true,
          configurable: true
        });
        __decorate([core_1.Output(), __metadata('design:type', Object)], DataTableFooter.prototype, "onPageChange", void 0);
        DataTableFooter = __decorate([core_1.Component({
          selector: 'datatable-footer',
          template: "\n    <div\n      *ngIf=\"state.options.footerHeight\"\n      [style.height]=\"state.options.footerHeight\">\n      <div class=\"page-count\">{{state.pageCount}} total</div>\n      <datatable-pager\n        [page]=\"curPage\"\n        [size]=\"state.pageSize\"\n        (onPaged)=\"onPageChange.emit($event)\"\n        [count]=\"state.pageCount\"\n        [hidden]=\"!visible\">\n       </datatable-pager>\n     </div>\n  ",
          directives: [Pager_1.DataTablePager]
        }), __metadata('design:paramtypes', [(typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, State_1.StateService])], DataTableFooter);
        return DataTableFooter;
        var _a;
      }());
      exports_1("DataTableFooter", DataTableFooter);
    }
  };
});

$__System.register("21", ["5", "2", "e", "4", "6", "22", "11", "19", "20"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      debounce_1,
      State_1,
      Visibility_1,
      math_1,
      TableOptions_1,
      Header_1,
      Body_1,
      Footer_1;
  var DataTable;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(debounce_1_1) {
      debounce_1 = debounce_1_1;
    }, function(State_1_1) {
      State_1 = State_1_1;
    }, function(Visibility_1_1) {
      Visibility_1 = Visibility_1_1;
    }, function(math_1_1) {
      math_1 = math_1_1;
    }, function(TableOptions_1_1) {
      TableOptions_1 = TableOptions_1_1;
    }, function(Header_1_1) {
      Header_1 = Header_1_1;
    }, function(Body_1_1) {
      Body_1 = Body_1_1;
    }, function(Footer_1_1) {
      Footer_1 = Footer_1_1;
    }],
    execute: function() {
      DataTable = (function() {
        function DataTable(element, state, differs) {
          this.state = state;
          this.onPageChange = new core_1.EventEmitter();
          this.onRowsUpdate = new core_1.EventEmitter();
          this.onRowClick = new core_1.EventEmitter();
          this.onSelectionChange = new core_1.EventEmitter();
          this.element = element.nativeElement;
          this.element.classList.add('datatable');
          this.differ = differs.find({}).create(null);
        }
        DataTable.prototype.ngOnInit = function() {
          var _this = this;
          var _a = this,
              options = _a.options,
              rows = _a.rows,
              selected = _a.selected;
          this.state.setOptions(options).setRows(rows).setSelected(selected);
          this.state.onRowsUpdate.subscribe(function(e) {
            return _this.onRowsUpdate.emit(e);
          });
        };
        DataTable.prototype.ngDoCheck = function() {
          if (this.differ.diff(this.rows)) {
            this.state.setRows(this.rows);
          }
        };
        DataTable.prototype.adjustSizes = function() {
          var _a = this.element.getBoundingClientRect(),
              height = _a.height,
              width = _a.width;
          this.state.innerWidth = Math.floor(width);
          if (this.options.scrollbarV) {
            if (this.options.headerHeight)
              height = -this.options.headerHeight;
            if (this.options.footerHeight)
              height = -this.options.footerHeight;
            this.state.bodyHeight = height;
          }
          this.adjustColumns();
        };
        DataTable.prototype.resize = function() {
          this.adjustSizes();
        };
        DataTable.prototype.adjustColumns = function(forceIdx) {
          var width = this.state.innerWidth;
          if (this.options.scrollbarV) {
            width = -this.state.scrollbarWidth;
          }
          if (this.options.columnMode === 'force') {
            math_1.forceFillColumnWidths(this.options.columns, width, forceIdx);
          } else if (this.options.columnMode === 'flex') {
            math_1.adjustColumnWidths(this.options.columns, width);
          }
        };
        DataTable.prototype.onPageChanged = function(event) {
          this.state.setPage(event);
          this.onPageChange.emit(event);
        };
        __decorate([core_1.Input(), __metadata('design:type', TableOptions_1.TableOptions)], DataTable.prototype, "options", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Array)], DataTable.prototype, "rows", void 0);
        __decorate([core_1.Input(), __metadata('design:type', Array)], DataTable.prototype, "selected", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], DataTable.prototype, "onPageChange", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], DataTable.prototype, "onRowsUpdate", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], DataTable.prototype, "onRowClick", void 0);
        __decorate([core_1.Output(), __metadata('design:type', Object)], DataTable.prototype, "onSelectionChange", void 0);
        __decorate([debounce_1.debounceable(10), core_1.HostListener('window:resize'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], DataTable.prototype, "resize", null);
        DataTable = __decorate([core_1.Component({
          selector: 'datatable',
          template: "\n  \t<div\n      visibility-observer\n      (onVisibilityChange)=\"adjustSizes()\">\n      <datatable-header></datatable-header>\n      <datatable-body\n        (onRowClick)=\"onRowClick.emit($event)\"\n        (onRowSelect)=\"state.setSelected($event)\">\n      </datatable-body>\n      <datatable-footer\n        (onPageChange)=\"onPageChanged($event)\">\n      </datatable-footer>\n    </div>\n  ",
          directives: [Header_1.DataTableHeader, Body_1.DataTableBody, Footer_1.DataTableFooter, Visibility_1.Visibility],
          host: {
            '[class.fixed-header]': 'options.headerHeight !== "auto"',
            '[class.fixed-row]': 'options.rowHeight !== "auto"',
            '[class.scroll-vertical]': 'options.scrollbarV',
            '[class.scroll-horz]': 'options.scrollbarH',
            '[class.selectable]': 'options.selectable',
            '[class.checkboxable]': 'options.checkboxable'
          },
          providers: [State_1.StateService]
        }), __metadata('design:paramtypes', [(typeof(_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, State_1.StateService, (typeof(_b = typeof core_1.KeyValueDiffers !== 'undefined' && core_1.KeyValueDiffers) === 'function' && _b) || Object])], DataTable);
        return DataTable;
        var _a,
            _b;
      }());
      exports_1("DataTable", DataTable);
    }
  };
});

$__System.register("22", ["23", "1d"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var ColumnMode_1,
      SortType_1;
  var TableOptions;
  return {
    setters: [function(ColumnMode_1_1) {
      ColumnMode_1 = ColumnMode_1_1;
    }, function(SortType_1_1) {
      SortType_1 = SortType_1_1;
    }],
    execute: function() {
      TableOptions = (function() {
        function TableOptions(props) {
          this.scrollbarV = true;
          this.scrollbarH = true;
          this.rowHeight = 30;
          this.columnMode = ColumnMode_1.ColumnMode.standard;
          this.loadingMessage = 'Loading...';
          this.emptyMessage = 'No data to display';
          this.headerHeight = 30;
          this.footerHeight = 0;
          this.externalPaging = false;
          this.limit = undefined;
          this.count = 0;
          this.offset = 0;
          this.loadingIndicator = false;
          this.reorderable = true;
          this.sortType = SortType_1.SortType.single;
          this.sorts = [];
          Object.assign(this, props);
        }
        return TableOptions;
      }());
      exports_1("TableOptions", TableOptions);
    }
  };
});

$__System.register("24", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function id() {
    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  }
  exports_1("id", id);
  return {
    setters: [],
    execute: function() {
      ;
    }
  };
});

$__System.register("25", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function camelCase(str) {
    str = str.replace(/[^a-zA-Z0-9 ]/g, " ");
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function(a, b, c) {
      return b.trim() + c.toUpperCase();
    });
    return str;
  }
  exports_1("camelCase", camelCase);
  return {
    setters: [],
    execute: function() {
      ;
    }
  };
});

$__System.register("f", ["24", "25"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var id_1,
      camelCase_1;
  var TableColumn;
  return {
    setters: [function(id_1_1) {
      id_1 = id_1_1;
    }, function(camelCase_1_1) {
      camelCase_1 = camelCase_1_1;
    }],
    execute: function() {
      TableColumn = (function() {
        function TableColumn(props) {
          this.$id = id_1.id();
          this.frozenLeft = false;
          this.frozenRight = false;
          this.flexGrow = 0;
          this.minWidth = 100;
          this.maxWidth = undefined;
          this.width = 150;
          this.resizable = true;
          this.comparator = undefined;
          this.sortable = true;
          this.draggable = true;
          this.canAutoResize = true;
          Object.assign(this, props);
          if (!this.prop && this.name) {
            this.prop = camelCase_1.camelCase(this.name);
          }
        }
        return TableColumn;
      }());
      exports_1("TableColumn", TableColumn);
      ;
    }
  };
});

$__System.register("1a", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var SelectionType;
  return {
    setters: [],
    execute: function() {
      (function(SelectionType) {
        SelectionType[SelectionType["single"] = 0] = "single";
        SelectionType[SelectionType["multi"] = 1] = "multi";
        SelectionType[SelectionType["multiShift"] = 2] = "multiShift";
      })(SelectionType || (SelectionType = {}));
      exports_1("SelectionType", SelectionType);
    }
  };
});

$__System.register("23", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var ColumnMode;
  return {
    setters: [],
    execute: function() {
      (function(ColumnMode) {
        ColumnMode[ColumnMode["standard"] = 0] = "standard";
        ColumnMode[ColumnMode["flex"] = 1] = "flex";
        ColumnMode[ColumnMode["force"] = 2] = "force";
      })(ColumnMode || (ColumnMode = {}));
      exports_1("ColumnMode", ColumnMode);
    }
  };
});

$__System.register("10", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var SortDirection;
  return {
    setters: [],
    execute: function() {
      (function(SortDirection) {
        SortDirection[SortDirection["asc"] = 0] = "asc";
        SortDirection[SortDirection["desc"] = 1] = "desc";
      })(SortDirection || (SortDirection = {}));
      exports_1("SortDirection", SortDirection);
    }
  };
});

$__System.register("1d", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var SortType;
  return {
    setters: [],
    execute: function() {
      (function(SortType) {
        SortType[SortType["single"] = 0] = "single";
        SortType[SortType["multi"] = 1] = "multi";
      })(SortType || (SortType = {}));
      exports_1("SortType", SortType);
    }
  };
});

$__System.register("1", ["21", "22", "f", "1a", "23", "10", "1d"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [function(DataTable_1_1) {
      exports_1({"DataTable": DataTable_1_1["DataTable"]});
    }, function(TableOptions_1_1) {
      exports_1({"TableOptions": TableOptions_1_1["TableOptions"]});
    }, function(TableColumn_1_1) {
      exports_1({"TableColumn": TableColumn_1_1["TableColumn"]});
    }, function(SelectionType_1_1) {
      exports_1({"SelectionType": SelectionType_1_1["SelectionType"]});
    }, function(ColumnMode_1_1) {
      exports_1({"ColumnMode": ColumnMode_1_1["ColumnMode"]});
    }, function(SortDirection_1_1) {
      exports_1({"SortDirection": SortDirection_1_1["SortDirection"]});
    }, function(SortType_1_1) {
      exports_1({"SortType": SortType_1_1["SortType"]});
    }],
    execute: function() {}
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["@angular/core/index.js","rxjs/Rx.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("@angular/core/index.js"), require("rxjs/Rx.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=angular2-data-table.js.map
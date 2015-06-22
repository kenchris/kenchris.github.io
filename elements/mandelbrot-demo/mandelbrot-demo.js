'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MandelbrotDemo = (function () {
  function MandelbrotDemo() {
    _classCallCheck(this, MandelbrotDemo);

    // Defer normal constructor behavior to created because we're only
    // allowed to take the prototype with us from the class.
    Polymer(MandelbrotDemo.prototype);
  }

  _createClass(MandelbrotDemo, [{
    key: 'created',
    value: function created() {
      this.resetFpsCount();
    }
  }, {
    key: 'ready',
    value: function ready() {
      Polymer.dom(this.$.player).setAttribute('workerCount', this.workerCount);
      Polymer.dom(this.$.player).setAttribute('maxIterationCount', this.maxIterationCount);
    }
  }, {
    key: 'resetFpsCount',
    value: function resetFpsCount() {
      this.measurements = 0;
      this.fpsTotal = 0;
    }
  }, {
    key: 'suspendedChange',
    value: function suspendedChange(suspended) {
      this.$.player.disabled = suspended;
    }
  }, {
    key: 'simdToggleChange',
    value: function simdToggleChange(e, detail, sender) {
      if (e.target.checked && typeof SIMD === 'undefined') {
        this.async((function () {
          this.checked = false;
        }).bind(e.target), 200);
        this.$.error.show();
        return;
      }

      this.resetFpsCount();
      this.$.player.useSIMD = e.target.checked;
    }
  }, {
    key: 'fpsChange',
    value: function fpsChange(e, detail, sender) {
      this.fpsTotal += detail.value;
      this.$.average.textContent = (this.fpsTotal / ++this.measurements).toFixed(0);
      this.$.fps.textContent = detail.value.toFixed(0);
    }
  }, {
    key: 'maxIterationChange',
    value: function maxIterationChange(e, detail, sender) {
      this.resetFpsCount();
      this.maxIterationCount = e.target.value;
      this.$.player.maxIterationCount = this.maxIterationCount;
    }
  }, {
    key: 'workerChange',
    value: function workerChange(e, detail, sender) {
      this.resetFpsCount();
      this.workerCount = e.target.value;
      this.$.player.workerCount = this.workerCount;
    }
  }, {
    key: 'is',
    get: function () {
      return 'mandelbrot-demo';
    }
  }, {
    key: 'properties',
    get: function () {
      return {
        maxWorkers: { type: Number, value: navigator.hardwareConcurrency },
        workerCount: { type: Number, value: 1 },
        maxIterationCount: { type: Number, value: 50 }
      };
    }
  }]);

  return MandelbrotDemo;
})();

new MandelbrotDemo();
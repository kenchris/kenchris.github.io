'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function callOnce(fn) {
  var wrapper = function wrapper(event) {
    fn();
    event.target.removeEventListener(event.type, wrapper);
  };
  return wrapper;
}

function loadScriptAsync(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.onload = function () {
      resolve();
    };
    document.head.appendChild(script);
  });
}

var BirdsDemo = (function () {
  function BirdsDemo() {
    _classCallCheck(this, BirdsDemo);

    // Defer normal constructor behavior to created because we're only
    // allowed to take the prototype with us from the class.
    Polymer(BirdsDemo.prototype);
  }

  _createClass(BirdsDemo, [{
    key: 'created',
    value: function created() {
      this.initialized = false;
    }
  }, {
    key: 'init',
    value: function init() {
      if (this.initialized) return;

      // The fbird code needs a valid size.
      if (this.$.frame.clientWidth > 0) {
        this.initialized = true;
        fbird.init({ self: this, basePath: this.resolveUrl('.') });
        return;
      }
    }
  }, {
    key: 'ready',
    value: function ready() {
      loadScriptAsync(this.resolveUrl('fbird.js')).then((function () {
        this.init();
      }).bind(this));
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
      fbird.setUseSIMD(e.target.checked);
    }
  }, {
    key: 'suspendedChange',
    value: function suspendedChange(suspended) {
      this.$.player.disabled = suspended;
      this.onActionChange();
    }
  }, {
    key: 'onActionChange',
    value: function onActionChange() {
      if (typeof fbird == 'undefined') return;

      if (!this.initialized) this.init();

      if (this.$.player.checked) fbird.start();else fbird.stop();
    }
  }, {
    key: 'is',
    get: function () {
      return 'birds-demo';
    }
  }, {
    key: 'properties',
    get: function () {
      return {
        useCanvas: { type: Boolean, value: true }
      };
    }
  }]);

  return BirdsDemo;
})();

new BirdsDemo();

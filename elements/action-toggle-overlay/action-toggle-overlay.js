'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ActionToggleOverlay = (function () {
  function ActionToggleOverlay() {
    _classCallCheck(this, ActionToggleOverlay);

    // Defer normal constructor behavior to created because we're only
    // allowed to take the prototype with us from the class.
    Polymer(ActionToggleOverlay.prototype);
  }

  _createClass(ActionToggleOverlay, [{
    key: 'created',
    value: function created() {}
  }, {
    key: 'disabledChanged',
    value: function disabledChanged(newValue, oldValue) {
      if (!this.disabled) return;
      this.checked = false;
    }
  }, {
    key: 'tapAction',
    value: function tapAction(ev) {
      ev.stopPropagation();
      if (this.disabled) return;

      this.checked = !this.checked;
    }
  }, {
    key: 'checkedChanged',
    value: function checkedChanged(newValue, oldValue) {
      if (this.checked) Polymer.dom(this.$.overlay).classList.add('checked');else Polymer.dom(this.$.overlay).classList.remove('checked');
      this.fire('change');
    }
  }, {
    key: 'is',
    get: function () {
      return 'action-toggle-overlay';
    }
  }, {
    key: 'properties',
    get: function () {
      return {
        checked: { type: Boolean, value: false, observer: 'checkedChanged' },
        disabled: { type: Boolean, value: false, observer: 'disabledChanged' }
      };
    }
  }]);

  return ActionToggleOverlay;
})();

new ActionToggleOverlay();
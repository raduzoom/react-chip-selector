import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import React, { useState, useRef, useEffect } from 'react';
import { dzsChipSelectorWebComponent_init } from 'chip-selector/dist/dzsChipSelectorWebComponents';

dzsChipSelectorWebComponent_init();
function ReactChipSelector(props) {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    selectedOptions = _useState2[0],
    setSelectedOptions = _useState2[1];

  /** @var {ChipSelectorItem[]} */
  var suggestedOptions = [];
  var chipSelectorOptions = {};
  if (props.chipSelectorOptions) {
    chipSelectorOptions = Object.assign(chipSelectorOptions, props.chipSelectorOptions);
  }
  if (props.suggestedOptions) {
    suggestedOptions = props.suggestedOptions;
  }
  var myRef = useRef(null);

  /** @type {DzsChipSelector} */
  var $myRef = null;
  var addStyle = function addStyle(url) {
    var style = document.createElement("link");
    style.href = url;
    style.rel = "stylesheet";
    style.async = true;
    $myRef.wrapper.appendChild(style);
  };
  var onUpdate = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(allOptions) {
      var selectedOptions;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            selectedOptions = allOptions.filter(function (el) {
              return el.currentStatus === 'checked';
            });
            setSelectedOptions(selectedOptions);
            if (props.onSelectedOptionsChange) {
              props.onSelectedOptionsChange(selectedOptions); // calling the callback function to update selected options in parent component
            }
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onUpdate(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  useEffect(function () {
    $myRef = myRef.current;
    addStyle('https://unpkg.com/chip-selector/dist/style/skins/skin-default.css');
    $myRef.onUpdate = onUpdate;
    return function cleanup() {
      console.log('clean up ONCE');
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", null, selectedOptions.map(function (option) {
    if (option.currentStatus === 'checked') {
      return "".concat(option.value, " ");
    }
    return null;
  }), /*#__PURE__*/React.createElement("dzs-chip-selector", {
    ref: myRef,
    "data-persistentOptions": JSON.stringify(suggestedOptions),
    "data-chip-selector-options": JSON.stringify(chipSelectorOptions)
  }, /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    "data-lazy-href": "dzs-chip-selector/style/skins/skin-default.css"
  })));
}

export { ReactChipSelector };
//# sourceMappingURL=index.js.map

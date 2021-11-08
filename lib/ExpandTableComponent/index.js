"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = () => ({
  iconPadding: {
    padding: 0
  }
});

function ExpandTableComponent(props) {
  const {
    tableData,
    tableAttr,
    filterArray,
    paddingLevel
  } = props;
  const [isExpand, setExpand] = (0, _react.useState)({});
  return tableData.map((row, index) => /*#__PURE__*/_react.default.createElement(_react.Fragment, {
    key: row.id || "TableRow".concat(index)
  }, /*#__PURE__*/_react.default.createElement(_core.TableRow, null, tableAttr.map(_ref => {
    let {
      customTd,
      value,
      classNameTd
    } = _ref;
    return filterArray.includes(value) && /*#__PURE__*/_react.default.createElement(_core.TableCell, {
      className: (0, _classnames.default)(classNameTd),
      key: "tableBody".concat(value),
      style: value === 'name' ? {
        textIndent: "".concat(paddingLevel * 24, "px")
      } : {}
    }, row.children && row.children.length > 0 && value === 'name' && /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      onClick: () => {
        setExpand(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
          [index]: !prevState[index]
        }));
      },
      "aria-label": "Expand",
      style: {
        padding: 0,
        marginRight: 4
      }
    }, !isExpand[index] ? /*#__PURE__*/_react.default.createElement(_icons.Add, null) : /*#__PURE__*/_react.default.createElement(_icons.Remove, null)), customTd ? customTd(row, index) : /*#__PURE__*/_react.default.createElement("span", {
      style: {
        verticalAlign: 'middle'
      }
    }, row[value]));
  })), isExpand[index] && row.children && row.children.length > 0 && /*#__PURE__*/_react.default.createElement(ExpandTableComponent, {
    tableData: row.children,
    tableAttr: tableAttr,
    filterArray: filterArray,
    paddingLevel: paddingLevel + 1
  })));
}

ExpandTableComponent.propTypes = {
  tableData: _propTypes.default.array,
  tableAttr: _propTypes.default.array,
  filterArray: _propTypes.default.array,
  paddingLevel: _propTypes.default.number
};
ExpandTableComponent.defaultProps = {
  tableData: [],
  tableAttr: [],
  filterArray: [],
  paddingLevel: 0
};

var _default = (0, _styles.withStyles)(styles)(ExpandTableComponent);

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = () => ({
  paper: {// margin: `${theme.spacing(2)}px ${theme.spacing(0.25)}px`,
  },
  transition: {
    transition: '.3s'
  },
  noHeight: {
    height: 0,
    transition: '.3s'
  },
  noPadding: {
    padding: 0,
    border: 'none',
    transition: '.3s'
  }
});

class NestedTableComponent extends _react.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      openSubComponent: false
    });

    _defineProperty(this, "toggleShowSubComponent", () => {
      this.setState(prevState => ({
        openSubComponent: !prevState.openSubComponent
      }));
    });
  }

  render() {
    const {
      openSubComponent
    } = this.state;
    const {
      children,
      subComponent,
      data,
      classes,
      colSpan,
      leftOffset
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children(this.toggleShowSubComponent), /*#__PURE__*/_react.default.createElement(_core.TableRow, {
      classes: {
        root: openSubComponent ? classes.transition : classes.noHeight
      }
    }, /*#__PURE__*/_react.default.createElement("td", {
      colSpan: leftOffset
    }), /*#__PURE__*/_react.default.createElement(_core.TableCell, {
      colSpan: colSpan,
      classes: {
        root: openSubComponent ? classes.transition : classes.noPadding
      }
    }, /*#__PURE__*/_react.default.createElement(_core.Collapse, {
      in: openSubComponent
    }, /*#__PURE__*/_react.default.createElement(_core.Paper, {
      elevation: 1,
      className: classes.paper
    }, subComponent(data))))));
  }

}

NestedTableComponent.propTypes = {
  subComponent: _propTypes.default.func.isRequired,
  data: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]).isRequired,
  classes: _propTypes.default.object.isRequired,
  children: _propTypes.default.func.isRequired,
  colSpan: _propTypes.default.number.isRequired,
  leftOffset: _propTypes.default.number.isRequired
};

var _default = (0, _styles.withStyles)(styles)(NestedTableComponent);

exports.default = _default;
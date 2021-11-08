"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _styles = require("@material-ui/core/styles");

var _SearchComponent = _interopRequireDefault(require("../SearchComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { promptMsg } from 'appUtils' // 待移植
const styles = theme => ({
  root: {
    whiteSpace: 'nowrap',
    fontSize: 12,
    top: theme.spacing(6),
    right: 0,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    boxShadow: theme.shadows['2'],
    borderRadius: theme.shape.borderRadius,
    display: 'none',
    zIndex: 3,
    maxHeight: 400,
    minWidth: 200,
    overflowY: 'auto',
    paddingTop: theme.spacing(1)
  },
  show: {
    display: 'block'
  },
  button: {
    margin: theme.spacing(1)
  },
  checkbox: {
    padding: 0
  }
});

const MIN_SELECT_NUM = 3;

function TableColFilterComponent(props) {
  const {
    classes,
    data,
    checked,
    onChange
  } = props;
  const [open, setOpen] = (0, _react.useState)(false);
  const [filterData, setFilterData] = (0, _react.useState)([]);
  const listEl = (0, _react.useRef)(null);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else if (newChecked.length > MIN_SELECT_NUM) {
      newChecked.splice(currentIndex, 1);
    } else {// promptMsg({ variant: 'warning', msg: `至少需要勾选${MIN_SELECT_NUM}个显示项` })
    }

    onChange(newChecked);
  };

  const handleAllToggle = () => {
    if (checked.length === filterData.length) {
      onChange(filterData.slice(0, MIN_SELECT_NUM).map(_ref => {
        let {
          value
        } = _ref;
        return value;
      }));
    } else {
      onChange(filterData.map(_ref2 => {
        let {
          value
        } = _ref2;
        return value;
      }));
    }
  };

  (0, _react.useEffect)(() => {
    setFilterData(data);
  }, [data]);

  const mouseEnter = () => {
    setOpen(true);
    setTimeout(() => {
      listEl.current.scrollTop = 0;
    }, 0);
  };

  return /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    disableRipple: true,
    color: "secondary",
    onMouseEnter: () => mouseEnter(),
    onMouseLeave: () => setOpen(false)
  }, /*#__PURE__*/_react.default.createElement(_icons.FilterList, null), /*#__PURE__*/_react.default.createElement("div", {
    ref: listEl,
    className: (0, _classnames.default)(classes.root, open ? classes.show : '')
  }, /*#__PURE__*/_react.default.createElement(_SearchComponent.default, {
    data: data,
    onChange: value => setFilterData(value)
  }), /*#__PURE__*/_react.default.createElement(_core.Grow, {
    in: open
  }, /*#__PURE__*/_react.default.createElement(_core.List, null, /*#__PURE__*/_react.default.createElement(_core.ListItem, {
    button: true,
    dense: true,
    onClick: handleAllToggle
  }, /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
    checked: checked.length === filterData.length,
    disableRipple: true,
    className: classes.checkbox
  }), /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
    primary: "\u5168\u9009",
    className: classes.signOutText
  })), filterData.map(_ref3 => {
    let {
      title,
      value
    } = _ref3;
    return /*#__PURE__*/_react.default.createElement(_core.ListItem, {
      key: value,
      button: true,
      dense: true,
      onClick: handleToggle(value)
    }, /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
      checked: checked.includes(value),
      disableRipple: true,
      className: classes.checkbox
    }), /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
      primary: title,
      className: classes.signOutText
    }));
  })))));
}

TableColFilterComponent.propTypes = {
  classes: _propTypes.default.object.isRequired,
  data: _propTypes.default.array,
  checked: _propTypes.default.array,
  onChange: _propTypes.default.func.isRequired
};
TableColFilterComponent.defaultProps = {
  data: [],
  checked: []
};

var _default = (0, _styles.withStyles)(styles)(TableColFilterComponent);

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: (0, _colorManipulator.fade)(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(4),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  }
});

function SearchComponent(props) {
  const {
    classes,
    data,
    onChange
  } = props;

  const filter = value => data.filter(_ref => {
    let {
      title
    } = _ref;
    return title.includes(value);
  });

  const searchChange = _ref2 => {
    let {
      target: {
        value
      }
    } = _ref2;
    onChange(filter(value));
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.search
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.searchIcon
  }, /*#__PURE__*/_react.default.createElement(_icons.Search, null)), /*#__PURE__*/_react.default.createElement(_core.InputBase, {
    onChange: searchChange,
    placeholder: "Search\u2026",
    classes: {
      root: classes.inputRoot,
      input: classes.inputInput
    }
  }));
}

SearchComponent.propTypes = {
  classes: _propTypes.default.object.isRequired,
  data: _propTypes.default.array,
  onChange: _propTypes.default.func.isRequired
};
SearchComponent.defaultProps = {
  data: []
};

var _default = (0, _styles.withStyles)(styles)(SearchComponent);

exports.default = _default;
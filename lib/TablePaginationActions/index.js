"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _FirstPage = _interopRequireDefault(require("@material-ui/icons/FirstPage"));

var _KeyboardArrowLeft = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowRight"));

var _LastPage = _interopRequireDefault(require("@material-ui/icons/LastPage"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const style = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  },
  page: {
    border: "solid 1px ".concat(theme.palette.grey.A100),
    height: theme.spacing(2.5),
    borderRadius: theme.spacing(0.5),
    width: theme.spacing(6),
    '&>input': {
      textAlign: 'center',
      fontSize: theme.spacing(1.5)
    }
  },
  split: {
    margin: "0 ".concat(theme.spacing(1), "px")
  },
  textBtn: {
    fontSize: '0.8rem' // verticalAlign: `${theme.spacing(-0.125)}px`,

  }
});

class TablePaginationActions extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      editPage: 0,
      pageValue: 0
    });

    _defineProperty(this, "handleFirstPageButtonClick", event => {
      const {
        onChangePage
      } = this.props;
      onChangePage(event, 0);
    });

    _defineProperty(this, "handleBackButtonClick", event => {
      const {
        onChangePage,
        page
      } = this.props;
      onChangePage(event, page - 1);
    });

    _defineProperty(this, "handleNextButtonClick", event => {
      const {
        onChangePage,
        page
      } = this.props;
      onChangePage(event, page + 1);
    });

    _defineProperty(this, "handleLastPageButtonClick", event => {
      const {
        onChangePage,
        count,
        rowsPerPage
      } = this.props;
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    });

    _defineProperty(this, "handlePageChange", event => {
      this.setState({
        editPage: event.target.value - 1,
        pageValue: event.target.value
      });
    });

    _defineProperty(this, "handleGoButtonClick", event => {
      const {
        onChangePage
      } = this.props;
      const {
        editPage
      } = this.state;
      onChangePage(event, editPage);
    });
  }

  componentDidMount() {
    const {
      page
    } = this.props;
    this.setState({
      pageValue: page + 1
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      page: newPage
    } = nextProps;
    const {
      page
    } = this.props;

    if (page !== newPage) {
      this.setState({
        pageValue: newPage + 1
      });
    }
  }

  // handleInputValue = () => {
  //   const { page } = this.props
  //   const { editPage } = this.state
  //   this.setState({
  //     editPage: page + 1,
  //   })
  //   return
  // }
  render() {
    const {
      classes,
      count,
      page = 0,
      rowsPerPage,
      theme
    } = this.props; // const pageValue = page + 1

    const {
      editPage,
      pageValue
    } = this.state;
    const totalPage = Math.ceil(count / rowsPerPage);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: classes.root
    }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      onClick: this.handleFirstPageButtonClick,
      disabled: page === 0,
      "aria-label": "First Page"
    }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_LastPage.default, null) : /*#__PURE__*/_react.default.createElement(_FirstPage.default, null)), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      onClick: this.handleBackButtonClick,
      disabled: page === 0,
      "aria-label": "Previous Page"
    }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_KeyboardArrowRight.default, null) : /*#__PURE__*/_react.default.createElement(_KeyboardArrowLeft.default, null)), /*#__PURE__*/_react.default.createElement(_core.Input // defaultValue={pageValue}
    , {
      value: pageValue,
      disableUnderline: true,
      className: classes.page,
      onChange: this.handlePageChange
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: classes.split
    }, "/ ", totalPage), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      className: classes.textBtn,
      disabled: Number.isNaN(editPage) || editPage < 0 || editPage > totalPage - 1,
      onClick: this.handleGoButtonClick
    }, "Go"), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      onClick: this.handleNextButtonClick,
      disabled: page >= totalPage - 1,
      "aria-label": "Next Page"
    }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_KeyboardArrowLeft.default, null) : /*#__PURE__*/_react.default.createElement(_KeyboardArrowRight.default, null)), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      onClick: this.handleLastPageButtonClick,
      disabled: page >= totalPage - 1,
      "aria-label": "Last Page"
    }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_FirstPage.default, null) : /*#__PURE__*/_react.default.createElement(_LastPage.default, null)));
  }

}

var _default = (0, _styles.withStyles)(style, {
  withTheme: true
})(TablePaginationActions);

exports.default = _default;
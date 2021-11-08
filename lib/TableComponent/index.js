"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.json.stringify.js");

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _Skeleton = _interopRequireDefault(require("@material-ui/lab/Skeleton"));

var _TablePaginationActions = _interopRequireDefault(require("../TablePaginationActions"));

var _NestedTableComponent = _interopRequireDefault(require("../NestedTableComponent"));

var _TableColFilterComponent = _interopRequireDefault(require("../TableColFilterComponent"));

var _ExpandTableComponent = _interopRequireDefault(require("../ExpandTableComponent"));

var _components = require("@ccc-toolkit/components");

const _excluded = ["tableData", "classes", "tableAttr", "count", "withoutPagination", "onChangePage", "onChangeRowsPerPage", "rowsPerPage", "page", "tableClassName", "selected", "selectedKey", "tableFrameClassName", "withFilter", "initFilterArray", "onFilterChange", "classNameThAll", "rowsPerPageOptions", "forwardedRef", "isDrag", "dropFunc", "dragFunc", "getChildPayloadFunc", "handleClickSwitch", "idName", "closeOpenMapIds", "isExpandTable", "isNestedDetail", "nestedNodeFunc", "authoredTopNodeIds", "searchItemFatherIds", "emptyHolder", "noAutoScroll", "nestedTableColSpan", "tableBodyRowOnClick", "tableRowSelectedClassName", "loading", "nestedLeftOffset", "withSelect", "objectSpanMethod"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const styles = () => ({
  tableFrame: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
  },
  table: {
    whiteSpace: 'nowrap'
  },
  outer: {
    flex: 1,
    overflowX: 'auto'
  },
  noAutoScrollOuter: {
    flex: 1
  },
  root: {// '& td, th': {
    //   padding: '6px 12px',
    // },
  },
  stickyHeader: {
    zIndex: 2
  },
  selectText: {
    position: 'absolute',
    bottom: 16
  },
  countColor: {
    color: 'blue',
    padding: '0px 4px'
  },
  cellRoot: {
    padding: 10
  }
});

function TableRender(props) {
  const [filterArray, setFilterArray] = (0, _react.useState)([]);

  const {
    tableData,
    classes,
    tableAttr,
    count,
    withoutPagination,
    onChangePage,
    onChangeRowsPerPage,
    rowsPerPage,
    page,
    tableClassName,
    selected,
    selectedKey,
    tableFrameClassName,
    withFilter,
    initFilterArray,
    onFilterChange,
    classNameThAll,
    rowsPerPageOptions,
    forwardedRef,
    isDrag,
    dropFunc,
    dragFunc,
    getChildPayloadFunc,
    handleClickSwitch,
    idName,
    closeOpenMapIds,
    isExpandTable,
    isNestedDetail,
    nestedNodeFunc,
    authoredTopNodeIds,
    searchItemFatherIds,
    emptyHolder,
    noAutoScroll,
    nestedTableColSpan,
    tableBodyRowOnClick,
    tableRowSelectedClassName,
    loading,
    nestedLeftOffset,
    withSelect,
    objectSpanMethod
  } = props,
        restProps = _objectWithoutProperties(props, _excluded);

  const filterChange = array => {
    setFilterArray(array);
    onFilterChange(array);
  };

  (0, _react.useEffect)(() => {
    if (initFilterArray.length) {
      setFilterArray(initFilterArray);
    } else {
      setFilterArray(tableAttr.map(_ref => {
        let {
          value
        } = _ref;
        return value;
      }));
    }
  }, [initFilterArray, tableAttr]);
  /**
   * table head&body 参数说明
   * customCompletedTh @param {string} '' 控制整行表头样式
   * customTh @param {func} 自定义头部内容
   * customTd @param {func} 自定义body内容
   */

  const loadingSet = [1, 2, 3, 4, 5];
  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    className: (0, _classnames.default)(classes.tableFrame, tableFrameClassName),
    style: {
      height: '100%',
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      flexDirection: 'column'
    }
  }, withFilter && /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justify: "flex-end"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_TableColFilterComponent.default, {
    data: tableAttr,
    checked: filterArray,
    onChange: array => filterChange(array)
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(noAutoScroll ? classes.noAutoScrollOuter : classes.outer),
    style: {
      flex: '1',
      overflowX: 'auto'
    },
    ref: forwardedRef
  }, /*#__PURE__*/_react.default.createElement(_core.Table, _extends({
    className: (0, _classnames.default)(classes.table, tableClassName),
    classes: {
      root: classes.root
    },
    style: {
      whiteSpace: 'nowrap'
    },
    stickyHeader: true,
    padding: "default"
  }, restProps), /*#__PURE__*/_react.default.createElement(_core.TableHead, null, /*#__PURE__*/_react.default.createElement(_core.TableRow, null, tableAttr && tableAttr.map((_ref2, index) => {
    let {
      title,
      value,
      classNameTh,
      customTh,
      customCompletedTh,
      hide = false,
      rowSpanTh,
      colSpanTh,
      align
    } = _ref2;
    return customCompletedTh ? /*#__PURE__*/_react.default.createElement(_react.Fragment, {
      key: value
    }, customCompletedTh(value, index)) : filterArray.includes(value) && !hide && /*#__PURE__*/_react.default.createElement(_core.TableCell, {
      align: align,
      rowSpan: rowSpanTh,
      colSpan: colSpanTh,
      key: "tableHead".concat(value).concat(index) // eslint-disable-line
      ,
      className: (0, _classnames.default)(classNameThAll, classNameTh, classes.stickyHeader),
      classes: {
        root: classes.cellRoot
      },
      size: "small"
    }, customTh ? customTh() : title);
  }))), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, tableData.length > 0 && !loading && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !isDrag && /*#__PURE__*/_react.default.createElement(_core.TableBody, null, tableData && tableData.map((row, index) => /*#__PURE__*/_react.default.createElement(_react.Fragment, {
    key: row.id || "TableRow".concat(index)
  }, isNestedDetail && /*#__PURE__*/_react.default.createElement(_NestedTableComponent.default, {
    data: row,
    colSpan: nestedTableColSpan,
    leftOffset: nestedLeftOffset,
    subComponent: tempRow => nestedNodeFunc(tempRow)
  }, toggleShowSubComponent => /*#__PURE__*/_react.default.createElement(_core.TableRow, {
    selected: selected.includes(row[selectedKey]),
    hover: true
  }, tableAttr.map(_ref3 => {
    let {
      customTd,
      value,
      classNameTd,
      hide = false
    } = _ref3;
    return filterArray.includes(value) && !hide && /*#__PURE__*/_react.default.createElement(_core.TableCell, {
      key: value,
      className: (0, _classnames.default)(classNameTd),
      size: "small",
      classes: {
        root: classes.cellRoot
      }
    }, customTd ? customTd(row, index, toggleShowSubComponent) : row[value]);
  }))), !isNestedDetail && !isExpandTable && /*#__PURE__*/_react.default.createElement(_core.TableRow, {
    hover: true,
    selected: selected.includes(row[selectedKey]),
    key: row.id || "TableRow".concat(index),
    classes: {
      selected: tableRowSelectedClassName
    },
    onClick: function onClick() {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return tableBodyRowOnClick(...rest, row, index);
    }
  }, tableAttr.map((_ref4, i) => {
    var _objectSpanMethod, _objectSpanMethod2, _objectSpanMethod3;

    let {
      customTd,
      value,
      classNameTd,
      rowSpanTd,
      colSpanTd
    } = _ref4;
    return filterArray.includes(value) && (!objectSpanMethod || objectSpanMethod && ((_objectSpanMethod = objectSpanMethod({
      row,
      rowIndex: index,
      columnIndex: i
    })) === null || _objectSpanMethod === void 0 ? void 0 : _objectSpanMethod.rowSpan) !== 0) && /*#__PURE__*/_react.default.createElement(_core.TableCell, {
      rowSpan: objectSpanMethod ? (_objectSpanMethod2 = objectSpanMethod({
        row,
        rowIndex: index,
        columnIndex: i
      })) === null || _objectSpanMethod2 === void 0 ? void 0 : _objectSpanMethod2.rowSpan : rowSpanTd,
      colSpan: objectSpanMethod ? (_objectSpanMethod3 = objectSpanMethod({
        row,
        rowIndex: index,
        columnIndex: i
      })) === null || _objectSpanMethod3 === void 0 ? void 0 : _objectSpanMethod3.colSpan : colSpanTd,
      className: (0, _classnames.default)(classNameTd) // eslint-disable-next-line
      ,
      key: "tableBody".concat(value).concat(i),
      classes: {
        root: classes.cellRoot
      },
      style: {
        position: index === tableAttr.length - 1 ? 'sticky' : 'none'
      }
    }, customTd ? customTd(row, index) : ['string', 'number'].includes(typeof row[value]) && row[value] || emptyHolder);
  })))), isExpandTable && /*#__PURE__*/_react.default.createElement(_ExpandTableComponent.default, {
    tableData: tableData,
    tableAttr: tableAttr,
    filterArray: filterArray,
    paddingLevel: 0
  }))))), loading ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      flex: 1
    }
  }, loadingSet.map(v =>
  /*#__PURE__*/
  // <Skeleton style={{ height: '100%' }} key={v}>
  _react.default.createElement("div", {
    key: "key_".concat(v),
    style: {
      margin: '20px 0',
      height: '40px'
    }
  }, /*#__PURE__*/_react.default.createElement(_Skeleton.default, {
    height: "300",
    variant: "rect"
  })))) : !tableData.length && /*#__PURE__*/_react.default.createElement(_components.NoData, {
    useImg: true
  })), withSelect && /*#__PURE__*/_react.default.createElement("span", {
    className: classes.selectText
  }, "\u5DF2\u9009\u62E9", /*#__PURE__*/_react.default.createElement("span", {
    className: classes.countColor
  }, selected.length), "\u9879"), !withoutPagination && /*#__PURE__*/_react.default.createElement(_core.TablePagination, {
    component: "div",
    count: count,
    rowsPerPage: rowsPerPage,
    page: page,
    backIconButtonProps: {
      'aria-label': 'Previous Page'
    },
    nextIconButtonProps: {
      'aria-label': 'Next Page'
    },
    onChangePage: onChangePage,
    onChangeRowsPerPage: onChangeRowsPerPage,
    ActionsComponent: _TablePaginationActions.default,
    rowsPerPageOptions: rowsPerPageOptions,
    style: {
      overflow: 'visible'
    }
  }));
}

TableRender.propTypes = {
  classes: _propTypes.default.object.isRequired,
  tableClassName: _propTypes.default.string,
  tableFrameClassName: _propTypes.default.string,
  tableData: _propTypes.default.array.isRequired,
  // 表格的数据
  tableAttr: _propTypes.default.array.isRequired,
  // 表格的th和td
  onChangePage: _propTypes.default.func,
  onChangeRowsPerPage: _propTypes.default.func,
  count: _propTypes.default.number,
  page: _propTypes.default.number,
  rowsPerPage: _propTypes.default.number,
  withoutPagination: _propTypes.default.bool,
  // 不需要分页
  selected: _propTypes.default.array,
  // 高光选择
  selectedKey: _propTypes.default.string,
  // 高光选择
  withFilter: _propTypes.default.bool,
  // 搭配可选择显示列
  initFilterArray: _propTypes.default.array,
  // 搭配可选择默认显示列
  rowsPerPageOptions: _propTypes.default.array,
  // 页码选择数组
  onFilterChange: _propTypes.default.func,
  // 监听filterdata的变化
  classNameThAll: _propTypes.default.string,
  // 头部统一样式
  forwardedRef: _propTypes.default.object,
  isDrag: _propTypes.default.bool,
  dropFunc: _propTypes.default.func,
  dragFunc: _propTypes.default.func,
  getChildPayloadFunc: _propTypes.default.func,
  handleClickSwitch: _propTypes.default.func,
  idName: _propTypes.default.string,
  isNestedDetail: _propTypes.default.bool,
  nestedNodeFunc: _propTypes.default.func,
  isExpandTable: _propTypes.default.bool,
  emptyHolder: _propTypes.default.string,
  noAutoScroll: _propTypes.default.bool,
  authoredTopNodeIds: _propTypes.default.array,
  searchItemFatherIds: _propTypes.default.array,
  closeOpenMapIds: _propTypes.default.array,
  nestedTableColSpan: _propTypes.default.number,
  nestedLeftOffset: _propTypes.default.number,
  // 嵌套表格左边空出多少span
  tableBodyRowOnClick: _propTypes.default.func,
  objectSpanMethod: _propTypes.default.func,
  // 设置tableCell rowSpan和colSpan的函数
  tableRowSelectedClassName: _propTypes.default.string,
  withSelect: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  dep: _propTypes.default.object // 是否缓存需要的字段，（tableData和loading 是默认字段）

};
TableRender.defaultProps = {
  count: 0,
  page: 0,
  nestedTableColSpan: 4,
  nestedLeftOffset: 0,
  rowsPerPage: 10,
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  withoutPagination: false,
  tableClassName: '',
  tableFrameClassName: '',
  selected: [],
  selectedKey: '',
  withFilter: false,
  initFilterArray: [],
  rowsPerPageOptions: [5, 10, 25],
  onFilterChange: () => {},
  classNameThAll: '',
  forwardedRef: null,
  isDrag: false,
  dropFunc: () => {},
  dragFunc: () => {},
  getChildPayloadFunc: () => {},
  handleClickSwitch: () => {},
  idName: 'id',
  isNestedDetail: false,
  nestedNodeFunc: () => {},
  isExpandTable: false,
  emptyHolder: '',
  noAutoScroll: false,
  authoredTopNodeIds: [],
  searchItemFatherIds: [],
  closeOpenMapIds: [],
  tableBodyRowOnClick: () => {},
  objectSpanMethod: undefined,
  tableRowSelectedClassName: '',
  withSelect: false,
  loading: false,
  dep: {}
}; // const TableWithStyles = withStyles(styles)(TableRender)

const TableWithStyles = (0, _styles.withStyles)(styles)( /*#__PURE__*/_react.default.memo(TableRender, (prevProps, nextProps) => {
  const flag = JSON.stringify(prevProps.tableData) === JSON.stringify(nextProps.tableData) && prevProps.loading === nextProps.loading && JSON.stringify(prevProps.dep) === JSON.stringify(nextProps.dep);
  return flag;
}));
/*
  问题记录：
    微前端模块切换回来时，styles没有传入到TableRender中，导致样式莫名闪动，体验不好
    因为使用 const TableWithStyles = withStyles(styles)(TableRender) 时，并没有出现上述情况。
    所以猜测与withStyles和React.memo的不兼容性有关。
    - shi 2021 11 03
*/

function TableComponent(props, ref) {
  return /*#__PURE__*/_react.default.createElement(TableWithStyles, _extends({}, props, {
    forwardedRef: ref
  }));
}

var _default = /*#__PURE__*/(0, _react.forwardRef)(TableComponent);

exports.default = _default;
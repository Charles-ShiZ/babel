import React, {
  useState, useEffect,
  forwardRef,
  Fragment,
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Grid,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
// import { Container } from 'react-smooth-dnd'
import TablePaginationActions from '../TablePaginationActions'
import NestedTableComponent from '../NestedTableComponent'
// import NoData from 'appSrc/app/common/NoData'
import TableColFilterComponent from '../TableColFilterComponent'
// import TableRowComponent from './TableRowComponent'
import ExpandTableComponents from '../ExpandTableComponent'
import { NoData } from '@ccc-toolkit/components'

const styles = () => ({
  tableFrame: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  table: {
    whiteSpace: 'nowrap',
  },
  outer: {
    flex: 1,
    overflowX: 'auto',
  },
  noAutoScrollOuter: {
    flex: 1,
  },
  root: {
    // '& td, th': {
    //   padding: '6px 12px',
    // },
  },
  stickyHeader: {
    zIndex: 2,
  },
  selectText: {
    position: 'absolute',
    bottom: 16,
  },
  countColor: {
    color: 'blue',
    padding: '0px 4px',
  },
  cellRoot: {
    padding: 10,
  },
})

function TableRender(props) {
  const [filterArray, setFilterArray] = useState([])
  const {
    tableData, classes, tableAttr, count, withoutPagination,
    onChangePage, onChangeRowsPerPage, rowsPerPage, page, tableClassName,
    selected, selectedKey, tableFrameClassName, withFilter, initFilterArray,
    onFilterChange, classNameThAll, rowsPerPageOptions, forwardedRef, isDrag,
    dropFunc, dragFunc, getChildPayloadFunc, handleClickSwitch, idName, closeOpenMapIds,
    isExpandTable, isNestedDetail, nestedNodeFunc, authoredTopNodeIds, searchItemFatherIds,
    emptyHolder, noAutoScroll, nestedTableColSpan, tableBodyRowOnClick, tableRowSelectedClassName, loading,
    nestedLeftOffset, withSelect, objectSpanMethod, ...restProps
  } = props
  const filterChange = (array) => {
    setFilterArray(array)
    onFilterChange(array)
  }

  useEffect(() => {
    if (initFilterArray.length) {
      setFilterArray(initFilterArray)
    } else {
      setFilterArray(tableAttr.map(({ value }) => value))
    }
  }, [initFilterArray, tableAttr])

  /**
   * table head&body 参数说明
   * customCompletedTh @param {string} '' 控制整行表头样式
   * customTh @param {func} 自定义头部内容
   * customTd @param {func} 自定义body内容
   */

  const loadingSet = [1, 2, 3, 4, 5]
  return (
    <Grid
      className={classNames(classes.tableFrame, tableFrameClassName)}
      style={{
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        flexDirection: 'column',
      }}
    >
      {withFilter && (
        <Grid container justify='flex-end'>
          <Grid item>
            <TableColFilterComponent
              data={tableAttr}
              checked={filterArray}
              onChange={array => filterChange(array)}
            />
          </Grid>
        </Grid>
      )}
      <div
        className={classNames(noAutoScroll ? classes.noAutoScrollOuter : classes.outer)}
        style={{
          flex: '1',
          overflowX: 'auto',
        }}
        ref={forwardedRef}
      >
        <Table
          className={classNames(classes.table, tableClassName)}
          classes={{
            root: classes.root,
          }}
          style={{
            whiteSpace: 'nowrap',
          }}
          stickyHeader
          padding='default'
          {...restProps}
        >
          <TableHead>
            <TableRow>
              {tableAttr && tableAttr.map(({
                title, value, classNameTh, customTh, customCompletedTh, hide = false,
                rowSpanTh, colSpanTh, align,
              }, index) => (customCompletedTh ? (
                <Fragment key={value}>
                  {customCompletedTh(value, index)}
                </Fragment>
              ) : (filterArray.includes(value) && !hide && (
                <TableCell
                  align={align}
                  rowSpan={rowSpanTh}
                  colSpan={colSpanTh}
                  key={`tableHead${value}${index}`} // eslint-disable-line
                  className={classNames(
                    classNameThAll, classNameTh, classes.stickyHeader,
                  )}
                  classes={{
                    root: classes.cellRoot,
                  }}
                  size='small'
                >
                  {customTh ? customTh() : title}
                </TableCell>
              ))))}
            </TableRow>
          </TableHead>
          <>
            {
              tableData.length > 0 && !loading && (
                <>
                  {/* {isDrag && (
                    <Container
                      style={{
                        display: 'table',
                        width: '100%',
                        borderCollapse: 'collapse',
                      }}
                      lockAxis='y'
                      nonDragAreaSelector='.no-drag-selector'
                      onDrop={dropFunc}
                      onDragStart={dragFunc}
                      getChildPayload={getChildPayloadFunc}
                      render={ref => (
                        <TableBody ref={ref}>
                          <TableRowComponent
                            tableData={tableData}
                            tableAttr={tableAttr}
                            filterArray={filterArray}
                            selected={selected}
                            selectedKey={selectedKey}
                            handleClickSwitch={handleClickSwitch}
                            spacing={0}
                            isOpen
                            idName={idName}
                            authoredTopNodeIds={authoredTopNodeIds}
                            searchItemFatherIds={searchItemFatherIds}
                            closeOpenMapIds={closeOpenMapIds}
                          />
                        </TableBody>)}
                    />
                  )} */}
                  {!isDrag && (
                    <TableBody>
                      {tableData && tableData.map((row, index) => (
                        <Fragment key={row.id || `TableRow${index}`}>
                          {isNestedDetail && (
                            <NestedTableComponent
                              data={row}
                              colSpan={nestedTableColSpan}
                              leftOffset={nestedLeftOffset}
                              subComponent={tempRow => nestedNodeFunc(tempRow)}
                            >
                              {toggleShowSubComponent => (
                                <TableRow selected={selected.includes(row[selectedKey])} hover>
                                  {tableAttr.map(({
                                    customTd, value, classNameTd, hide = false,
                                  }) => (filterArray.includes(value) && !hide && (
                                    <TableCell
                                      key={value}
                                      className={classNames(classNameTd)}
                                      size='small'
                                      classes={{
                                        root: classes.cellRoot,
                                      }}
                                    >
                                      {customTd ? customTd(row, index, toggleShowSubComponent) : row[value]}
                                    </TableCell>
                                  )))}
                                </TableRow>
                              )}
                            </NestedTableComponent>
                          )}
                          {!isNestedDetail && !isExpandTable && (
                            <TableRow
                              hover
                              selected={selected.includes(row[selectedKey])}
                              key={row.id || `TableRow${index}`}
                              classes={{ selected: tableRowSelectedClassName }}
                              onClick={(...rest) => tableBodyRowOnClick(...rest, row, index)}
                            >
                              {tableAttr.map(({
                                customTd, value, classNameTd, rowSpanTd, colSpanTd,
                              }, i) => (filterArray.includes(value) && (!objectSpanMethod || objectSpanMethod
                                && objectSpanMethod({ row, rowIndex: index, columnIndex: i })?.rowSpan !== 0) && (
                                  <TableCell
                                    rowSpan={objectSpanMethod ? objectSpanMethod({ row, rowIndex: index, columnIndex: i })?.rowSpan : rowSpanTd}
                                    colSpan={objectSpanMethod ? objectSpanMethod({ row, rowIndex: index, columnIndex: i })?.colSpan : colSpanTd}
                                    className={classNames(classNameTd)}
                                    // eslint-disable-next-line
                                    key={`tableBody${value}${i}`}
                                    classes={{
                                      root: classes.cellRoot,
                                    }}
                                    style={{
                                      position: (index === tableAttr.length - 1) ? 'sticky' : 'none',
                                    }}
                                  >
                                    {customTd
                                      ? customTd(row, index)
                                      : ((['string', 'number'].includes(typeof (row[value])) && row[value])) || emptyHolder}
                                  </TableCell>)
                              ))}
                            </TableRow>
                          )}
                        </Fragment>))}
                      {isExpandTable && (
                        <ExpandTableComponents
                          tableData={tableData}
                          tableAttr={tableAttr}
                          filterArray={filterArray}
                          paddingLevel={0}
                        />
                      )}
                    </TableBody>
                  )}
                </>
              )
            }
          </>
        </Table>
        {
          loading ? (
            <div style={{ flex: 1 }}>
              {
                loadingSet.map((v) => (
                  // <Skeleton style={{ height: '100%' }} key={v}>
                  <div key={`key_${v}`} style={{ margin: '20px 0', height: '40px' }}>
                    <Skeleton height='300' variant='rect' />
                  </div>
                ))
              }
            </div>
          ) : (!tableData.length && (
            <NoData
              useImg
            />
          ))
        }
      </div>
      {withSelect && (
        <span className={classes.selectText}>已选择<span className={classes.countColor}>{selected.length}</span>项</span>
      )}
      {!withoutPagination && (
        <TablePagination
          component='div'
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          rowsPerPageOptions={rowsPerPageOptions}
          style={{ overflow: 'visible' }}
        />
      )}
    </Grid>
  )
}

TableRender.propTypes = {
  classes: PropTypes.object.isRequired,
  tableClassName: PropTypes.string,
  tableFrameClassName: PropTypes.string,
  tableData: PropTypes.array.isRequired, // 表格的数据
  tableAttr: PropTypes.array.isRequired, // 表格的th和td
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  withoutPagination: PropTypes.bool, // 不需要分页
  selected: PropTypes.array, // 高光选择
  selectedKey: PropTypes.string, // 高光选择
  withFilter: PropTypes.bool, // 搭配可选择显示列
  initFilterArray: PropTypes.array, // 搭配可选择默认显示列
  rowsPerPageOptions: PropTypes.array, // 页码选择数组
  onFilterChange: PropTypes.func, // 监听filterdata的变化
  classNameThAll: PropTypes.string, // 头部统一样式
  forwardedRef: PropTypes.object,
  isDrag: PropTypes.bool,
  dropFunc: PropTypes.func,
  dragFunc: PropTypes.func,
  getChildPayloadFunc: PropTypes.func,
  handleClickSwitch: PropTypes.func,
  idName: PropTypes.string,
  isNestedDetail: PropTypes.bool,
  nestedNodeFunc: PropTypes.func,
  isExpandTable: PropTypes.bool,
  emptyHolder: PropTypes.string,
  noAutoScroll: PropTypes.bool,
  authoredTopNodeIds: PropTypes.array,
  searchItemFatherIds: PropTypes.array,
  closeOpenMapIds: PropTypes.array,
  nestedTableColSpan: PropTypes.number,
  nestedLeftOffset: PropTypes.number, // 嵌套表格左边空出多少span
  tableBodyRowOnClick: PropTypes.func,
  objectSpanMethod: PropTypes.func, // 设置tableCell rowSpan和colSpan的函数
  tableRowSelectedClassName: PropTypes.string,
  withSelect: PropTypes.bool,
  loading: PropTypes.bool,
  dep: PropTypes.object, // 是否缓存需要的字段，（tableData和loading 是默认字段）
}

TableRender.defaultProps = {
  count: 0,
  page: 0,
  nestedTableColSpan: 4,
  nestedLeftOffset: 0,
  rowsPerPage: 10,
  onChangePage: () => { },
  onChangeRowsPerPage: () => { },
  withoutPagination: false,
  tableClassName: '',
  tableFrameClassName: '',
  selected: [],
  selectedKey: '',
  withFilter: false,
  initFilterArray: [],
  rowsPerPageOptions: [5, 10, 25],
  onFilterChange: () => { },
  classNameThAll: '',
  forwardedRef: null,
  isDrag: false,
  dropFunc: () => { },
  dragFunc: () => { },
  getChildPayloadFunc: () => { },
  handleClickSwitch: () => { },
  idName: 'id',
  isNestedDetail: false,
  nestedNodeFunc: () => { },
  isExpandTable: false,
  emptyHolder: '',
  noAutoScroll: false,
  authoredTopNodeIds: [],
  searchItemFatherIds: [],
  closeOpenMapIds: [],
  tableBodyRowOnClick: () => { },
  objectSpanMethod: undefined,
  tableRowSelectedClassName: '',
  withSelect: false,
  loading: false,
  dep: {},
}

// const TableWithStyles = withStyles(styles)(TableRender)
const TableWithStyles = withStyles(styles)(React.memo(TableRender, (prevProps, nextProps) => {
  const flag = JSON.stringify(prevProps.tableData) === JSON.stringify(nextProps.tableData)
    && prevProps.loading === nextProps.loading
    && JSON.stringify(prevProps.dep) === JSON.stringify(nextProps.dep)
  return flag
}))
/*
  问题记录：
    微前端模块切换回来时，styles没有传入到TableRender中，导致样式莫名闪动，体验不好
    因为使用 const TableWithStyles = withStyles(styles)(TableRender) 时，并没有出现上述情况。
    所以猜测与withStyles和React.memo的不兼容性有关。
    - shi 2021 11 03
*/

function TableComponent(props, ref) {
  return <TableWithStyles {...props} forwardedRef={ref} />
}

export default forwardRef(TableComponent)

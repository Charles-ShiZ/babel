import React, { Fragment, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  TableRow,
  TableCell,
  IconButton,
} from '@material-ui/core'
import {
  Add, Remove,
} from '@material-ui/icons'

const styles = () => ({
  iconPadding: {
    padding: 0,
  },
})

function ExpandTableComponent(props) {
  const {
    tableData, tableAttr, filterArray, paddingLevel,
  } = props
  const [isExpand, setExpand] = useState({})
  return (
    tableData.map((row, index) => (
      <Fragment key={row.id || `TableRow${index}`}>
        <TableRow>
          {
            tableAttr.map(({ customTd, value, classNameTd }) => (
              filterArray.includes(value) && (
                <TableCell
                  className={classNames(
                    classNameTd,
                  )}
                  key={`tableBody${value}`}
                  style={value === 'name' ? { textIndent: `${paddingLevel * 24}px` } : {}}
                >
                  {
                    row.children
                    && row.children.length > 0
                    && value === 'name' && (
                      <IconButton
                        onClick={() => {
                          setExpand(prevState => ({
                            ...prevState,
                            [index]: !prevState[index],
                          }))
                        }}
                        aria-label='Expand'
                        style={{ padding: 0, marginRight: 4 }}
                      >
                        {!isExpand[index] ? <Add /> : <Remove />}
                      </IconButton>
                    )
                  }
                  {customTd ? customTd(row, index) : <span style={{ verticalAlign: 'middle' }}>{row[value]}</span>}
                </TableCell>
              )
            ))
          }
        </TableRow>
        {
          isExpand[index] && row.children && row.children.length > 0
          && (
            <ExpandTableComponent
              tableData={row.children}
              tableAttr={tableAttr}
              filterArray={filterArray}
              paddingLevel={paddingLevel + 1}
            />
          )
        }
      </Fragment>
    ))
  )
}

ExpandTableComponent.propTypes = {
  tableData: PropTypes.array,
  tableAttr: PropTypes.array,
  filterArray: PropTypes.array,
  paddingLevel: PropTypes.number,
}

ExpandTableComponent.defaultProps = {
  tableData: [],
  tableAttr: [],
  filterArray: [],
  paddingLevel: 0,
}

export default withStyles(styles)(ExpandTableComponent)

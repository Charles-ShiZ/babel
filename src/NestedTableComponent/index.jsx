import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  TableRow, TableCell, Paper, Collapse,
} from '@material-ui/core'

const styles = () => ({
  paper: {
    // margin: `${theme.spacing(2)}px ${theme.spacing(0.25)}px`,
  },
  transition: {
    transition: '.3s',
  },
  noHeight: {
    height: 0,
    transition: '.3s',
  },
  noPadding: {
    padding: 0,
    border: 'none',
    transition: '.3s',
  },
})
class NestedTableComponent extends Component {
  state = {
    openSubComponent: false,
  }

  toggleShowSubComponent = () => {
    this.setState(prevState => ({
      openSubComponent: !prevState.openSubComponent,
    }))
  }

  render() {
    const { openSubComponent } = this.state
    const {
      children, subComponent, data, classes, colSpan, leftOffset,
    } = this.props
    return (
      <>
        {children(this.toggleShowSubComponent)}
        <TableRow
          classes={{
            root: openSubComponent ? classes.transition : classes.noHeight,
          }}
        >
          <td colSpan={leftOffset} />
          <TableCell
            colSpan={colSpan}
            classes={{
              root: openSubComponent ? classes.transition : classes.noPadding,
            }}
          >
            <Collapse in={openSubComponent}>
              <Paper elevation={1} className={classes.paper}>
                {subComponent(data)}
              </Paper>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }
}

NestedTableComponent.propTypes = {
  subComponent: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  colSpan: PropTypes.number.isRequired,
  leftOffset: PropTypes.number.isRequired,
}

export default withStyles(styles)(NestedTableComponent)

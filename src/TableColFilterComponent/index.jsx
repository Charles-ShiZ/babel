import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  IconButton,
  Grow,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from '@material-ui/core'
import {
  FilterList as FilterListIcon,
} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
// import { promptMsg } from 'appUtils' // 待移植
import SearchComponent from '../SearchComponent'

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
    paddingTop: theme.spacing(1),
  },
  show: {
    display: 'block',
  },
  button: {
    margin: theme.spacing(1),
  },
  checkbox: {
    padding: 0,
  },
})

const MIN_SELECT_NUM = 3

function TableColFilterComponent(props) {
  const {
    classes, data, checked, onChange,
  } = props
  const [open, setOpen] = useState(false)
  const [filterData, setFilterData] = useState([])

  const listEl = useRef(null)

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else if (newChecked.length > MIN_SELECT_NUM) {
      newChecked.splice(currentIndex, 1)
    } else {
      // promptMsg({ variant: 'warning', msg: `至少需要勾选${MIN_SELECT_NUM}个显示项` })
    }
    onChange(newChecked)
  }

  const handleAllToggle = () => {
    if (checked.length === filterData.length) {
      onChange(filterData.slice(0, MIN_SELECT_NUM).map(({ value }) => value))
    } else {
      onChange(filterData.map(({ value }) => value))
    }
  }

  useEffect(() => {
    setFilterData(data)
  }, [data])

  const mouseEnter = () => {
    setOpen(true)
    setTimeout(() => { listEl.current.scrollTop = 0 }, 0)
  }

  return (
    <IconButton
      disableRipple
      color='secondary'
      onMouseEnter={() => mouseEnter()}
      onMouseLeave={() => setOpen(false)}
    >
      <FilterListIcon />
      <div ref={listEl} className={classNames(classes.root, open ? classes.show : '')}>
        <SearchComponent data={data} onChange={value => setFilterData(value)} />
        <Grow in={open}>
          <List>
            <ListItem button dense onClick={handleAllToggle}>
              <Checkbox
                checked={checked.length === filterData.length}
                disableRipple
                className={classes.checkbox}
              />
              <ListItemText primary='全选' className={classes.signOutText} />
            </ListItem>
            {filterData.map(({ title, value }) => (
              <ListItem key={value} button dense onClick={handleToggle(value)}>
                <Checkbox
                  checked={checked.includes(value)}
                  disableRipple
                  className={classes.checkbox}
                />
                <ListItemText primary={title} className={classes.signOutText} />
              </ListItem>
            ))}
          </List>
        </Grow>
      </div>
    </IconButton>
  )
}

TableColFilterComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  checked: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

TableColFilterComponent.defaultProps = {
  data: [],
  checked: [],
}

export default withStyles(styles)(TableColFilterComponent)

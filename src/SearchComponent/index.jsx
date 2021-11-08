import React from 'react'
import PropTypes from 'prop-types'
import { InputBase } from '@material-ui/core'
import {
  Search as SearchIcon,
} from '@material-ui/icons'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(4),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
})

function SearchComponent(props) {
  const {
    classes, data, onChange,
  } = props

  const filter = value => (
    data.filter(({ title }) => title.includes(value))
  )

  const searchChange = ({ target: { value } }) => {
    onChange(filter(value))
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={searchChange}
        placeholder='Search…'
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  )
}

SearchComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

SearchComponent.defaultProps = {
  data: [],
}

export default withStyles(styles)(SearchComponent)

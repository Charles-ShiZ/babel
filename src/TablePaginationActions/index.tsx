import React from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { IconButton, Input } from '@material-ui/core'

const style = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
  page: {
    border: `solid 1px ${theme.palette.grey.A100}`,
    height: theme.spacing(2.5),
    borderRadius: theme.spacing(0.5),
    width: theme.spacing(6),
    '&>input': {
      textAlign: 'center',
      fontSize: theme.spacing(1.5),
    },
  },
  split: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  textBtn: {
    fontSize: '0.8rem',
    // verticalAlign: `${theme.spacing(-0.125)}px`,
  },
})

interface IProps{
  classes: any,
  count: number,
  onChangePage: Function,
  page: number,
  rowsPerPage: number,
  theme: any,
}

class TablePaginationActions extends React.Component <IProps, {}> {
  state= {
    editPage: 0,
    pageValue: 0,
  }

  componentDidMount() {
    const { page } = this.props
    this.setState({
      pageValue: page + 1,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { page: newPage } = nextProps
    const { page } = this.props
    if (page !== newPage) {
      this.setState({
        pageValue: newPage + 1,
      })
    }
  }

  handleFirstPageButtonClick = (event) => {
    const { onChangePage } = this.props
    onChangePage(event, 0)
  }

  handleBackButtonClick = (event) => {
    const { onChangePage, page } = this.props
    onChangePage(event, page - 1)
  }

  handleNextButtonClick = (event) => {
    const { onChangePage, page } = this.props
    onChangePage(event, page + 1)
  }

  handleLastPageButtonClick = (event) => {
    const { onChangePage, count, rowsPerPage } = this.props
    onChangePage(
      event,
      Math.max(0, Math.ceil(count / rowsPerPage) - 1),
    )
  }

  handlePageChange = (event) => {
    this.setState({
      editPage: event.target.value - 1,
      pageValue: event.target.value,
    })
  }

  handleGoButtonClick = (event) => {
    const { onChangePage } = this.props
    const { editPage } = this.state
    onChangePage(event, editPage)
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
      classes, count, page = 0, rowsPerPage, theme,
    } = this.props
    // const pageValue = page + 1
    const { editPage, pageValue } = this.state
    const totalPage = Math.ceil(count / rowsPerPage)
    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='First Page'
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label='Previous Page'
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <Input
          // defaultValue={pageValue}
          value={pageValue}
          disableUnderline
          className={classes.page}
          onChange={this.handlePageChange}
        />
        <span className={classes.split}>/ {totalPage}</span>
        <IconButton
          className={classes.textBtn}
          disabled={Number.isNaN(editPage) || editPage < 0 || editPage > totalPage - 1}
          onClick={this.handleGoButtonClick}
        >
          Go
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= totalPage - 1}
          aria-label='Next Page'
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= totalPage - 1}
          aria-label='Last Page'
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    )
  }
}

export default withStyles(style, { withTheme: true })(TablePaginationActions)

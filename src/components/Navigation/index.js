import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import NavDrawer from './NavDrawer'

const style = {
  width: 280,
  scrollbarWidth: 'none',
  overflow: '-moz-scrollbars-none',
  '&::-webkit-scrollbar': { display: 'none' },
}

const StyledNav = withStyles({
  root: style,
  paper: style,
})(NavDrawer)

export default function Header() {
  return <StyledNav variant="persistent" anchor="left" open={true} />
}

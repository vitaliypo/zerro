import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { syncData } from 'logic/sync'
import { getChangedNum } from 'store/localData'
import { getPendingState } from 'store/isPending'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BottomNavigationAction } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import DoneIcon from '@material-ui/icons/Done'
import WarningIcon from '@material-ui/icons/Warning'
import BackupIcon from '@material-ui/icons/Backup'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import { withStyles, useTheme } from '@material-ui/core/styles'
import { Tooltip } from 'components/Tooltip'
import { getLastSyncInfo } from 'store/lastSync'

const StyledBadge = withStyles({ badge: { top: '50%', right: 4 } })(Badge)

export default function RefreshButton({ isMobile, ...rest }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const handleClick = useCallback(() => dispatch(syncData()), [dispatch])
  const changedNum = useSelector(getChangedNum)
  const isPending = useSelector(getPendingState)
  const { isSuccessful, finishedAt } = useSelector(getLastSyncInfo)

  let buttonState = 'idle'
  if (!!changedNum) buttonState = 'hasDataToSync'
  if (isPending) buttonState = 'pending'

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (!finishedAt) return
    setNotification(isSuccessful ? 'success' : 'fail')
    let timer1 = setTimeout(() => setNotification(null), 2500)
    return () => clearTimeout(timer1)
  }, [isSuccessful, finishedAt])

  const state = notification || buttonState

  const components = {
    idle: <RefreshIcon />,
    hasDataToSync: <BackupIcon />,
    pending: <CircularProgress size={24} />,
    success: <DoneIcon htmlColor={theme.palette.success.main} />,
    fail: <WarningIcon color="error" />,
  }

  const colors = {
    idle: 'default',
    hasDataToSync: 'primary',
    pending: 'default',
    success: 'default',
    fail: 'default',
  }

  return isMobile ? (
    <BottomNavigationAction
      label="Обновить"
      value="refresh"
      icon={
        <StyledBadge badgeContent={changedNum}>{components[state]}</StyledBadge>
      }
      onClick={handleClick}
      {...rest}
    />
  ) : (
    <Tooltip title="Обновить данные">
      <StyledBadge badgeContent={changedNum}>
        <IconButton onClick={handleClick} color={colors[state]} {...rest}>
          {components[state]}
        </IconButton>
      </StyledBadge>
    </Tooltip>
  )
}

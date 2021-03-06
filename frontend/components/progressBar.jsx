/* eslint-disable no-param-reassign */
import React from 'react'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'

const BarBackground = styled.section`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blueDianne};
  height: 2.5rem;
  border-radius: 0.8rem;
  margin-bottom: -1rem;
  box-shadow: 0px 0px 10px #888888;
  z-index: 2;
  width: 95%;
`

const ProgressLine = styled(LinearProgress)`
  background-color: ${({ theme }) => theme.colors.brandyPunch};
  height: 0.3rem;
  border-radius: 0.2rem;
  height: 0.3rem;
  width: 90%;
  margin-left: 5%;

  .MuiLinearProgress-barColorPrimary {
    background-color:#FFD700;
  }
`

/*
  USAGE:
  - show progress: insert id and total props
  - bar component without progress (non-survey pages): leave props undefined
*/

export const ProgressBar = ({ answered, total }) => {
  const answeredCount = answered || 0
  const totalCount = total || 100
  const progress = (answeredCount / totalCount) * 100
  return (
    <>
      <BarBackground>
          <ProgressLine
            variant="determinate"
            color="primary"
            value={progress}
            title="Survey progress"
          />
      </BarBackground>
    </>
  )
}

export default ProgressBar

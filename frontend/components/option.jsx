import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const NotSelectedOption = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gold};
  border-radius: 3px;
  border-width: 0px;
  font-size: 15px;
  font-family: Montserrat;
  font-weight: bold;
  padding: 10px 15px;
  text-transform: capitalize;
  &:hover {
    background-color: ${({ theme }) => theme.colors.amber};
  }
`

const SelectedOption = styled(Button)`
  background-color: ${({ theme }) => theme.colors.brandyPunch};
  border-radius: 3px;
  border-width: 0px;
  font-size: 15px;
  font-family: Montserrat;
  font-weight: bold;
  padding: 10px 15px;
  text-transform: capitalize;
`

const Option = ({ id, label, selected, onClick }) => {
  if (selected) {
    return (
      <SelectedOption id={id} onClick={onClick}>
        {label}
      </SelectedOption>
    )
  }

  return (
    <NotSelectedOption id={id} onClick={onClick}>
      {label}
    </NotSelectedOption>
  )
}

export default Option

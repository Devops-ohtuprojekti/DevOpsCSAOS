import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const StyledOption = styled(Button)`
  background-color: ${({ theme, selected }) =>
    selected ? 'white' : 'white' };
  border-style: solid;
  border-radius: 3px;
  border-width: ${({ theme, selected }) =>
  selected ? '1.5px': '1px'};
  border-color: ${({ theme, selected }) =>
  selected ? theme.colors.green : theme.colors.whiteSmoke};
  font-size: 15px;
  font-family: Montserrat;
  font-weight: bold;
  padding: 8px 10px;
  text-transform: capitalize;
  transform: ${({ theme, selected }) =>
  selected ? 'scale(1.1)' : 'scale(1)'};
  &:hover {
    background-color: ${({ theme, selected }) =>
      selected ? 'white' : theme.colors.whiteSmoke};
  }
`

const Option = ({ id, label, selected, onClick }) => (
  <StyledOption id={id} onClick={onClick} selected={selected}>
    {label}
  </StyledOption>
)

export default Option

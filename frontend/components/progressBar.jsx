import React from 'react'
import styled from 'styled-components'

const BarBackground = styled.div`
  background-color: ${({theme}) => theme.colors.blueDianne};
  height: 2.5rem;
  border-radius: 0.8rem;
  margin-top: auto;
  margin: auto;
  position: absolute;
  width: 105%;
  display: flex;
  align-items: center;
  top: -5%;
  left: -2.5%;
  box-shadow: 0px 0px 10px #888888;
`

const ProgressLine = styled.div`
  background-color: ${({theme}) => theme.colors.brandyPunch};
  height: 0.3rem;
  border-radius: 0.2rem;
  width: 90%;
  margin-left: 5%;
`

const ProgressBar = ({ point, total }) => (
  <BarBackground>
    <ProgressLine/>
  </BarBackground>
)

export default ProgressBar
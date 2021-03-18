import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import Link from 'next/link'

/**
 * Shared Link styles
 */
const StyledBaseLink = styled.a`
  font-family: Montserrat;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
  margin: 10px;
  min-width: 120px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  border-radius: 5px;
  border-width: 0px;
  margin: 50px 25px 15px 25px;
  padding: 0 20px;
  cursor: pointer;
`

/**
 * Variants of our generic styled Link component
 *  */
const StyledPrimaryLink = styled(StyledBaseLink)`
  background-color: ${({ theme }) => theme.colors.blueDianne};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }
`

const StyledSecondaryLink = styled(StyledBaseLink)`
  background-color: ${({ theme }) => theme.colors.cararra};
  color: ${({ theme }) => theme.colors.nevada};

  &:hover {
    background-color: ${({ theme }) => theme.colors.silver};
  }
`

const StyledLink = ({ children, type, href }) => {
  if (type === 'primary') {
    return (
      <Link href={href} passHref>
        <StyledPrimaryLink>{children}</StyledPrimaryLink>
        </Link>
    )
  }

  if (type === 'secondary') {
    return (
      <Link href={href} passHref>
        <StyledSecondaryLink>{children}</StyledSecondaryLink>
      </Link>
    )
  }

  console.warn('custom link only has primary and secondary types')

  return <Link href={href}>{children}</Link>
}

export default StyledLink

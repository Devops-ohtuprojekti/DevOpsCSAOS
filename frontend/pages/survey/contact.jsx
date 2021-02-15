import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { ContentWrapper } from '../../components/shared/ContentWrapper'
import Button from '../../components/button'
import { useStore } from '../../store'

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne}
`

const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne}
`

const DetailsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DetailsInput = styled.input`
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  font-family: inherit;
  padding: 10px 20px;
  border-radius: 10px;
  border-width: 0px;
  margin: 10px;
`

const ContactForm = () => {
  const [emailInput, setEmailInput] = useState('')
  const router = useRouter()
  const store = useStore()
  const firstQuestionHref = '/survey/questions/1'

  const handleEmailChange = (event) => {
    event.preventDefault()
    setEmailInput(event.target.value)
  }

  const updateEmail = (event) => {
    event.preventDefault()
    store.setEmail(emailInput)
    router.push(firstQuestionHref)
  }

  return (
    <ContentWrapper>
      <Heading>DevOps Assessment Tool</Heading>
      <FormTitle>Add your contact details to get started</FormTitle>
      <DetailsForm id="email-input-field" onSubmit={updateEmail}>
        <DetailsInput type="email" id="email" name="email" value={emailInput} onChange={handleEmailChange} required />
        <Button id="submit-email-button" type="submit">Begin</Button>
      </DetailsForm>
    </ContentWrapper>
  )
}

export default ContactForm

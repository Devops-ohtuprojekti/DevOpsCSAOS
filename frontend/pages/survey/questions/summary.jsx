import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStore } from '../../../store'
import Head from 'next/head'

import InnerContentWrapper from '../../../components/shared/InnerContentWrapper'
import ProgressBar from '../../../components/progressBar'
import Button from '../../../components/button'
import { sendResult } from '../../../services/results'
import { sendAnswers } from '../../../services/answers'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0 0 0;
  width: 100%;
  position: absolute;
  top: 15px;
  padding-bottom: 30px;
  background-color: white;
  border-radius: 0.5rem;
`

const QuestionAnswerWrapper = styled.article`
  margin: 1rem 0;
  font-family: Montserrat;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.blueDianne};
  span {
    display: inline-block;
    margin: 0.4rem 0;
    font-family:Merriweather;
    font-weight: normal;
    font-size: 16px;
    color black;
  }
`
const Title = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
`

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}

const Summary = () => {
  const selections = useStore((state) => state.selections)
  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)
  const questions = useStore((state) => state.questions)

  const store = useStore()
  const router = useRouter()

  const checkAllQuestionsAnswered = () => {
    let allAnswered = true
    store.selections.forEach((selection) => {
      if (selection === -1) {
        allAnswered = false
      }
    })

    return allAnswered
  }

  const handleSubmit = async () => {
    const allAnswered = checkAllQuestionsAnswered()

    if (!allAnswered) {
      alert('please answer all questions to proceed')
      return
    }

    const answersForBackend = questions.map((question, index) => ({
      questionId: question.id,
      value: store.selections[index],
    }))

    const email = store.email === '' ? undefined : store.email

    const { results } = await sendAnswers(email, answersForBackend)

    store.setResultsPerCategory(results)

    const userResult = results
      .map((score) => score.userResult)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    store.setUserResult(userResult)

    const maxResult = results
      .map((score) => score.maxCategoryResult)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    store.setMaxResult(maxResult)

    const { resultText } = await sendResult(userResult)

    store.setResultText(resultText)

    router.push('/survey/result')
  }

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar />
      <InnerContentWrapper>
        <Content>
          <Title>Here are your current answers</Title>
            {/* we're assuming that questions are always available */}
            {questions.map((question, index) => {
              let answerToQuestion = getKeyByValue(
                optionsToPointsMap,
                selections[index]
              )?.toLowerCase()

              if (!answerToQuestion) {
                answerToQuestion = "haven't answered this question."
              }

              if (answerToQuestion === 'neutral') {
                answerToQuestion = 'feel neutral'
              }

              const QuestionText = `${question.text}`
              const AnswerText = `You ${answerToQuestion}`

              return (
                <QuestionAnswerWrapper key={question.id}>
                  {QuestionText}
                  <br />
                  <span>{AnswerText}</span>
                </QuestionAnswerWrapper>
                )
              })}
          <Button type="submit" onClick={handleSubmit}>
            Go to your results!
          </Button>
        </Content>
      </InnerContentWrapper>
    </>
  )}

export default Summary

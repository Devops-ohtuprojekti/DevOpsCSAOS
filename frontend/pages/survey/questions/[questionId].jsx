import React, {useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useStore } from '../../../store'


import { ContentWrapper } from '../../../components/shared/ContentWrapper'
import Button from '../../../components/button'
import Option from '../../../components/option'
import { getAll } from '../../../services/questions'
import { sendAnswers } from '../../../services/answers'
import NavigationButtons from '../../../components/navigationButtons'
import ProgressBar from '../../../components/progressBar'

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 60px 60px;
  column-gap: 10px;
  row-gap: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
`

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
`

const Question = ({ questions }) => {
  const router = useRouter()
  const store = useStore()

  const questionId = Number(router.query.questionId)
  const isFinalQuestion = questionId === questions.length

  const resultsPageHref = '/survey/result'

  const checkAllQuestionsAnswered = () => {
    let allAnswered = true
    store.selections.forEach(selection => {
      
      if (selection === -1) {
        allAnswered = false
      }
    })

    return allAnswered
  }
  const handleSubmit = async () => {
    const allAnswered = checkAllQuestionsAnswered()

    if (!allAnswered) {
      return
    }
    const answersForBackend = questions.map((question, index) => {
      return {
        questionId: question.id,
        value: store.selections[index]
      }
    })

    const email = store.email === '' ? undefined : store.email

    const { results } = await sendAnswers(email, answersForBackend)
    
    store.setResultsPerCategory(results)
    router.push(resultsPageHref)
  }
  const updateSelections = (value) => {
    const newSelections = [...store.selections]
    newSelections[questionId - 1] = value
    store.setSelections(newSelections)
  }

  useEffect(() => {
    store.setQuestions(questions)
  }, [])

  return (
    <ContentWrapper>
      <ProgressBar id={questionId} total={questions.length}/>
      <Heading>DevOps Assessment Tool</Heading>
      <span>
        {' '}
        Question {questionId}
        /
        {questions.length}
        {' '}
      </span>
      <QuestionTitle>{questions[questionId - 1].text}</QuestionTitle>
      <OptionsWrapper>
        <Option
          label="Strongly agree"
          selected={store.selections[questionId - 1] === 4}
          onClick={() => updateSelections(4)}
        />
        <Option
          label="Agree"
          selected={store.selections[questionId - 1] === 3}
          onClick={() => updateSelections(3)}
        />
        <Option
          label="Neutral"
          selected={store.selections[questionId - 1] === 2}
          onClick={() => updateSelections(2)}
        />
        <Option
          label="Disagree"
          selected={store.selections[questionId - 1] === 1}
          onClick={() => updateSelections(1)}
        />
        <Option
          label="Strongly disagree"
          selected={store.selections[questionId - 1] === 0}
          onClick={() => updateSelections(0)}
        />
      </OptionsWrapper>
      <NavigationButtons currentQuestionId={questionId} surveyLength={questions.length}/>
      {isFinalQuestion &&
        <Button type="submit" onClick={() => handleSubmit()}>
          Get results!
        </Button>
      }
    </ContentWrapper>
  )
}

export async function getStaticProps() {
  // fetch all pre-defined questions
  const questions = await getAll()
  return {
    props: { questions },
  }
}

export async function getStaticPaths() {
  const questions = await getAll()
  const ids = questions.map((_, index) => index + 1)

  const paths = ids.map((id) => ({
    params: {
      questionId: String(id),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Question

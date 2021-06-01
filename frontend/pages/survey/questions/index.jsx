/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect } from 'react'
import Head from 'next/head'
import { useStore } from '../../../store'
import { ContentAnimationWrapper } from '../../../components/contentAnimationWrapper'
import { QuestionPageContentWrapper } from '../../../components/shared/QuestionPageContentWrapper'
import { RowContentWrapper } from '../../../components/shared/RowContentWrapper'
import QuestionGrouper from '../../../components/questionGrouper'
import { ProgressBar } from '../../../components/progressBar'
import { getAllQuestions } from '../../../services/routes'
import { useRouter, withRouter } from '../../../components/staticRouting'
import StyledLink from '../../../components/link'
import NavigationGroup from '../../../components/navigationGroup'
import { allQuestionsAnswered, countOfAnsweredQuestions } from '../../../utils'
import Heading from '../../../components/heading'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Image from 'next/image'

const SurveyPage = () => {
  const router = useRouter()
  const store = useStore()

  const pageId = Number(router.query.id)
  const questionsToRender = store.questionGroups[pageId - 1]

  const nextPageHref = `/survey/questions/?id=${pageId + 1}`
  const previousPageHref = `/survey/questions/?id=${pageId - 1}`
  const summaryPageHref = '/survey/questions/summary'

  const isFinalPage = pageId === store.questionGroups.length
  const isFirstPage = pageId === 1
  const storeHasQuestions = store.questions.length > 0
  const { visitedSummary } = store

  useEffect(() => {
    (async () => {
      if (store.questions.length === 0) {
        try {
          const surveyId = 1
          const response = await getAllQuestions(surveyId)

          store.setQuestions(response, store.featureToggleSwitch)
        } catch (error) {
          console.error(error)
        }
      }
    })()
  }, [])

  const updateSelectionsInStore = (questionId, answerId) => {
    const prevSelections = [...store.selections]
    const newSelections = prevSelections.map((selection) => {
      if (selection.questionId === questionId) {
        return { questionId: selection.questionId, answerId }
      }
      return selection
    })

    store.setSelections(newSelections)
    return newSelections
  }

  const redirectToNextPageIfCurrentPageCompleted = (newSelections) => {
    const selectionsOfRenderedQuestions = newSelections.filter((s) => questionsToRender.map((q) =>
      q.id).includes(s.questionId))

    if (allQuestionsAnswered(selectionsOfRenderedQuestions)) {
      const urlToTransistionTo = isFinalPage ? summaryPageHref : nextPageHref
      router.push(urlToTransistionTo, null, {
        shallow: true,
      })
    }
  }

  const onOptionClick = (questionId, answerId) => {
    const newSelections = updateSelectionsInStore(questionId, answerId)
    /*
      after summary has been visited and the user refines/modifies answers,
      auto-redirect would be weird
    */
    if (!store.visitedSummary) {
      redirectToNextPageIfCurrentPageCompleted(newSelections)
    }
  }

  if (!storeHasQuestions) {
    return <div>Loading questions...</div>
  }

  const answeredQuestionsCount = countOfAnsweredQuestions(store.selections)

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <Heading component="h1" variant="h5">
          DevOps Self Assessment
          
        </Heading>
        <p> At the end you will receive a primary assessment
            of your current DevOps capabilities.  You will also see how your results
            compare to your industry and group peers.</p>
            <RowContentWrapper >
            <Image src='/leftside.png' 
        alt='left side image'
        width={80}
        height={240}/>
      <QuestionPageContentWrapper>
        
       
        <ContentAnimationWrapper>
          <QuestionGrouper
            answered={answeredQuestionsCount}
            total={store.questions.length}
            questions={questionsToRender}
            onOptionClick={onOptionClick}
          />
        </ContentAnimationWrapper>

        <NavigationGroup>
          {!isFirstPage ? (
            <StyledLink href={previousPageHref} passHref type="secondary">
              <ChevronLeftIcon /> Previous
            </StyledLink>
          ) : null}

          {(visitedSummary && !isFinalPage) ? (
            <StyledLink href={summaryPageHref} passHref type="tertiary">
              To summary <DoubleArrowIcon fontSize='8'/>
            </StyledLink>
          ) : (<></>)}
          {!isFinalPage ? (
            <StyledLink href={nextPageHref} passHref type="primary">
              Next <ChevronRightIcon />
            </StyledLink>
          ) : (
            <StyledLink href={summaryPageHref} passHref type="primary">
              Review
            </StyledLink>
          )}
          
        </NavigationGroup>
       
      </QuestionPageContentWrapper>
      <Image src='/rightside.png' 
        alt='right side image'
        width={80}
        height={240}
        quality={80}/>
      </RowContentWrapper>
      <Image src='/logo.png' 
        alt='logo image'
        width={100}
        height={100}/>
    </>
  )
}

export default withRouter(SurveyPage)

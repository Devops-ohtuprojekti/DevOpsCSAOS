/* eslint-disable no-undef */
import create from 'zustand'
import { persist } from 'zustand/middleware'
import chunk from 'lodash/chunk'

const initialDetailedResults = undefined

const initialQuestions = []
const initialSelections = []
const initialEmail = ''
const optionsToPointsMap = {
  'Strongly agree': 4,
  Agree: 3,
  Neutral: 2,
  Disagree: 1,
  'Strongly disagree': 0,
}
const initialResults = undefined
const initialQuestionGroups = []
const initialVisitedSummary = false
const initialFeatureToggleSwitch = 'A'
const initialGroupId = ''
const initialToken = ''
const initialIndustries = []

export const divideQuestions = (questions, featureToggleSwitch) => {
  const initialSelectionsWithQuestionIds = []
  questions.forEach((q) => {
    initialSelectionsWithQuestionIds.push({
      questionId: q.id,
      answerId: undefined,
    })
  })

  let chunkedQuestions = []

  if (featureToggleSwitch === 'A') {
    // All questions divided to 2 pages, if uneven number of questions, first page gets +1 questions
    chunkedQuestions =
      questions.length % 2 === 0
        ? chunk(questions, questions.length / 2)
        : chunk(questions, questions.length / 2 + 1)
  } else if (featureToggleSwitch === 'B') {
    // 1 question per page
    chunkedQuestions = chunk(questions, 1)
  }

  return { initialSelectionsWithQuestionIds, chunkedQuestions }
}

const store = (set) => ({
  questions: initialQuestions,
  email: initialEmail,
  selections: initialSelections,
  questionGroups: initialQuestionGroups,
  optionsToPointsMap,
  results: initialResults,
  detailedResults: initialDetailedResults,
  visitedSummary: initialVisitedSummary,
  featureToggleSwitch: initialFeatureToggleSwitch,
  groupId: initialGroupId,
  userToken: initialToken,
  industries: initialIndustries,
  setEmail: (email) => set(() => ({ email })),
  setSelections: (selections) => set(() => ({ selections })),
  setQuestions: (questions, featureToggleSwitch) => {
    const {
      initialSelectionsWithQuestionIds,
      chunkedQuestions,
    } = divideQuestions(questions, featureToggleSwitch)

    set(() => ({
      questions,
      selections: initialSelectionsWithQuestionIds,
      questionGroups: chunkedQuestions,
    }))
  },
  clear: () =>
    set(() => ({
      questions: [],
      email: '',
      selections: [],
      resultsPerCategory: [],
      resultText: '',
      visitedSummary: false,
      featureToggleSwitch: 'A',
      groupId: '',
      industries: [],
    })),
  resetVersion: () =>
    set(() => ({
      featureToggleSwitch: 'A',
      questions: [],
      questionGroups: [],
      visitedSummary: false,
      groupId: '',
    })),
  setResults: (results) => set(() => ({ results })),
  setDetailedResults: (detailedResults) => set(() => ({ detailedResults })),
  setVisitedSummary: (value) => set(() => ({ visitedSummary: value })),
  setFeatureToggleSwitch: (value) =>
    set(() => ({ featureToggleSwitch: value })),
  setGroupId: (value) => set(() => ({ groupId: value })),
  setUserToken: (value) => set(() => ({ userToken: value })),
  setIndustries: (industries) => set(() => ({ industries })),
})

export const useStore = create(
  persist(store, {
    name: 'devops assessment tool store',
    getStorage: () => sessionStorage,
  })
)

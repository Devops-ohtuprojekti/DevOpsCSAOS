import create from 'zustand'

const initialQuestions = []
const initialSelections = []
const initialEmail = ''
const initalResultsPerCategory = []
const optionsToPointsMap = {
  'Strongly agree': 5,
  Agree: 4,
  Neutral: 3,
  Disagree: 2,
  'Strongly disagree': 1,
}

/*
 * get: access state within actions
 */
const store = (set, get) => ({
  questions: initialQuestions,
  email: initialEmail,
  selections: initialSelections,
  resultsPerCategory: initalResultsPerCategory,
  optionsToPointsMap,
  setEmail: (email) => set(() => ({ email })),
  setSelections: (selections) => set(() => ({ selections })),
  setQuestions: (questions) => {
    set(() => ({
      questions,
    }))
  },
  clear: () => set(() => ({
    questions: [], email: '', selections: [], resultsPerCategory: [],
  })),
  setResultsPerCategory: (results) => set(() => ({ resultsPerCategory: results })),
})

export const useStore = create(store)

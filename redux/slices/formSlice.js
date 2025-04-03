import { createSlice, current } from '@reduxjs/toolkit'
const initialState = {
  newSurvey : true, // based on whether we are in an already existing survey or not
  currentSurveyId : 0, // id of the survey that's currently going on
  currentForm : [],
  currentStepIndex : 0,
  currentTitle : '',
  surveyType : '',
  formJson : {},
  formValues : {},
  formLength :0,
  logoVisible : true,
  currentUser: null,
  deviceId : null,
  offline : false
}
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSurveyType : (state,action) => {
        state.surveyType = action.payload // the string matching exactly with the name of our .json file
    },
    setFormJson : (state, action) => {
        state.formJson = action.payload // the json of the form we needed to be filled
        state.formLength = Object.keys(action.payload[state.surveyType]).length
    },
    setFormValues : (state,action) => {
        state.formValues = {...state.formValues, ...action.payload} // object containing the form title and the values that were inserted against it
    },
    setCurrentStepIndex : (state,action) =>{
        state.currentStepIndex = action.payload
        let formObjArray = Object.keys(state.formJson[state.surveyType])
        let key = formObjArray[action.payload]
        // set current form on every update
        state.currentForm = state.formJson[state.surveyType][key]
        state.currentTitle = key
    },
    setCurrentForm : (state, action) => {
        state.currentForm = action.payload
    },
    setCurrentTitle : (state, action) => {
        state.currentTitle = action.payload
    },
    setNewSurvey : (state,action) => {
      state.newSurvey = action.payload
    },
    setCurrentSurveyId : (state,action) => {
      state.currentSurveyId = action.payload
    },
    resetState : (state) => {
      return {...initialState}
    },
    setLogoVisible : (state, action)=>{
        state.logoVisible = action.payload
    },
    setCurrentUser : (state,action) => {
      state.currentUser = action.payload
    },
    setDeviceId : (state,action) => {
      state.deviceId = action.payload
    },
    setOffline : (state,action) => {
        state.offline = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOffline, resetState, setSurveyType, setFormJson, setFormValues, setCurrentStepIndex,setCurrentForm, setCurrentTitle ,setNewSurvey, setCurrentSurveyId,setLogoVisible, setCurrentUser, setDeviceId } = formSlice.actions

export default formSlice.reducer
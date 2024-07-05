import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {},
  userAccountDetails: {},
  userRole: '',
  onBoarding: false,
  servicePermission: [],
}

export const userDataSlice = createSlice({
  name: 'userDataReducer',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setUserAccountDetails: (state, action) => {
      state.userAccountDetails = action.payload
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload
    },
    setOnBoarding: (state, action) => {
      state.onBoarding = action.payload
    },
    setServicePermission: (state, action) => {
      state.servicePermission = action.payload
    },
  },
})


// Action creators are generated for each case reducer function
export const { setUserData, setUserAccountDetails, setUserRole, setOnBoarding, setServicePermission } = userDataSlice.actions

export default userDataSlice.reducer


import { createSlice } from '@reduxjs/toolkit'

export const stateInputSlice = createSlice({
    name:'Wavefunction',
    initialState: {
        numTerms: 0,
        terms: {}
    }, 
    reducers: {
        addTerm: state => {
            state.numTerms += 1
            state.terms["term" + (state.numTerms)] = {harmonic: "", coeff: ""}
        },

        updateHarmonic: (state, action) => {
            state.terms[action.payload.row].harmonic = action.payload.value;
        },

        updateCoeff: (state, action) => {
            state.terms[action.payload.row].coeff = action.payload.value;
        },

        clearTerms: state => {
            state.numTerms = 0
            state.terms = {}
        }
    }
})

export const { addTerm, updateHarmonic, updateCoeff, clearTerms } = stateInputSlice.actions

export default stateInputSlice.reducer
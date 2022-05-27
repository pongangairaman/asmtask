import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchStudentDetails = createAsyncThunk('store/fetchStudentDetails', async () => {
    console.log('inside fetch details action')
    const response = await axios.get('http://localhost:5000/studentdetail/getall')
    console.log(response.data.data)
    const res = response.data.data
    return res
})

export const addStudentDetail = createAsyncThunk('store/addStudentDetail', async (data, { dispatch }) => {
    console.log('inside add details action')
    const response = await axios.post('http://localhost:5000/studentdetail', data)
    console.log(response)
    dispatch(fetchStudentDetails())
    return response
})

export const updateStudentDetail = createAsyncThunk('store/updateStudentDetail', async (data, { dispatch }) => {
    console.log('inside update details action')
    const usn = data.usn
    const response = await axios.put(`http://localhost:5000/studentdetail/${usn}`, data)
    console.log(response)
    dispatch(fetchStudentDetails())
    return response
})

export const deleteStudentDetail = createAsyncThunk('store/deleteStudentDetail', async (data, { dispatch }) => {
    console.log('inside delete details action')
    const usn = data
    const response = await axios.delete(`http://localhost:5000/studentdetail/${usn}`)
    console.log(response)
    dispatch(fetchStudentDetails())
    return response
})

const initialState = {
    studentDetailList: [],
    selectedStudentDetail: null
}

export const studentDetailSlice = createSlice({
    name: 'studentDetail',
    initialState,
    reducers: {
        selectStudent: (state, action) => {
            state.selectedStudentDetail = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchStudentDetails.fulfilled, (state, action) => {
                const arr = action.payload
                const newArr = arr.map((element) => {
                    return (
                        {
                            usn: element.usn,
                            firstName: element.firstname,
                            lastName: element.lastname,
                            address: element.address,
                            mobileNumber: element.mobilenumber,
                            age: element.age
                        }
                    )
                });
                state.studentDetailList = newArr
            })
    }
})

// Action creators are generated for each case reducer function
export const { selectStudent } = studentDetailSlice.actions

export default studentDetailSlice.reducer
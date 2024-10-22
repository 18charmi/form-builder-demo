import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formDetails } from "../types/form";
import { ACTION_TYPES, DUMMY_FORM_LISTS } from "../util/constants";
import { delay, isObjectEmpty } from "../util/common";

export interface FormState {
    activeForm: formDetails;
    list: formDetails[];
    loadingPage: boolean;
    actionType: string;
}

const initialState: FormState = {
    activeForm: {
        id: "",
        title: "",
        description: "",
        field: []
    },
    list: [],
    loadingPage: true,
    actionType: ACTION_TYPES.NONE
};

export const getFormList = createAsyncThunk('form/getList', async () => {
    // TODO: add api call & add logic for pagination
    await delay();
    const response = localStorage.getItem("forms")
    return !!response ? JSON.parse(response) : [];
});

export const saveForm = createAsyncThunk('form/saveForm', async (request: formDetails) => {
    // TODO: add api call
    await delay();

    const response = localStorage.getItem("forms")
    const rs = !!response ? JSON.parse(response).concat(request) : [request];
    // console.log({ saveForm: { request, rs } });
    return rs;
});

export const deleteForm = createAsyncThunk('form/deleteForm', async (requestId: string) => {
    // TODO: add api call
    await delay();

    const response: formDetails[] = (localStorage.getItem("forms") ? JSON.parse(localStorage.getItem("forms")!) : [])

    const Index = response.findIndex(f => f.id === requestId)
    // console.log(`index`, Index);
    const rs = Index !== -1 ? [...response.slice(0, Index), ...response.slice(Index + 1)] : response;
    return rs;
});

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {

        // saving dummy forms from local storage
        saveFormToList: () => {

            let existingForms = localStorage.getItem("forms");

            let updatedList = [];
            if (!!existingForms) {

                updatedList = JSON.parse(existingForms);

            } else {
                updatedList = [DUMMY_FORM_LISTS[0], DUMMY_FORM_LISTS[1]];
            }

            localStorage.setItem(
                "forms",
                JSON.stringify(updatedList)
            )

        },
        updateActiveFormDetail: (state, action) => {
            // TODO: add loading state 
            // console.log({ update: action, initialState })
            state.activeForm = isObjectEmpty(action.payload) ? initialState.activeForm : action.payload
        },
        updateActionType: (state, action) => {
            state.actionType = action.payload;
        },
        updateLoading: (state, action) => {
            state.loadingPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFormList.pending, (state) => {
            state.loadingPage = true;
        }).addCase(getFormList.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loadingPage = false;
        });

        builder.addCase(saveForm.pending, (state) => {
            state.actionType = ACTION_TYPES.SAVE_REQ;
        }).addCase(saveForm.fulfilled, (state, action) => {
            // let updatedList = [...state.list, action.payload]
            let updatedList = [...action.payload]

            localStorage.setItem(
                "forms",
                JSON.stringify(updatedList)
            );
            state.actionType = ACTION_TYPES.SAVE_SUCC;
        });

        builder.addCase(deleteForm.pending, (state) => {
            state.actionType = ACTION_TYPES.DELETE_REQ;
        })
            .addCase(deleteForm.fulfilled, (state, action) => {
                // let updatedList = [...state.list, action.payload]
                let updatedList = [...action.payload]

                state.list = updatedList;
                localStorage.setItem(
                    "forms",
                    JSON.stringify(updatedList)
                );
                state.actionType = ACTION_TYPES.DELETE_SUCC;
            })
    }
});

// Action creators are generated for each case reducer function
export const { saveFormToList, updateActiveFormDetail, updateActionType, updateLoading } = formSlice.actions;

export default formSlice.reducer;
import React, { useReducer } from "react";

const defaultState = {
    formData: {
        
    }
}

const formReducer = (state, action) => {
    switch (action.type) {
        case 'FIELD_CHANGED':
            return { formData: action.payload }
        default: 
            return state
      }  
}

export const FormContext = React.createContext();

export const FormProvider = ({children}) => {
    const [formState, dispatch] = useReducer(formReducer, defaultState)

    return (
        <FormContext.Provider value={{ formState: formState, dispatch: dispatch }}>
            {children}
        </FormContext.Provider>
    )
}
import { Route } from "react-router-dom";

const initialState = [
    {
        id: 0,
        name: "Jimmy Ranny",
        number: 12345678,
        email: "jr@gmail.com"
    },
    {
        id: 1,
        name: "Elizabeth Ranny",
        number: 87654321,
        email: "er@gmail.com"
    },

];

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            state = [...state, action.payload];
            return state;
        case "UPDATE_CONTACT":
            const updateState = state.map((contact) =>
                contact.id === action.payload.id ? action.payload : contact
            );
            state = updateState;
            return state;
        case "DELETE_CONTACT":
            const filterContacts = state.filter((contact) =>
                contact.id !== action.payload ? contact : null
            );
            state = filterContacts;
            return state;
        default:
            return state;
    }
};

export default contactReducer;
 

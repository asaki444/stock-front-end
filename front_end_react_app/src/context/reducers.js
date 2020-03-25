import axios from "axios";

function Register(state, credentials) {
    const [name, email, password, password_confirmation] = credentials
    axios.post('http://localhost:3001/registrations', {
        user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }
    }, {
        withCredentials: true
    }).then(
        res => console.log(res)
    ).catch(error => console.log("registration error", error))

  
}


export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state, loggedIn: true
            }
        case 'LOGOUT':
            return {
             ...state, loggedIn: false
            }
        case 'REGISTER':
           return Register(action.credentials, state)
        case 'PURCHASE_STOCK':
             return state;
        default:
            return state;
    }
};
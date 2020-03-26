export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return{...state, user_id: action.user_id, loggedIn: true}
        case 'LOGOUT':
            return {
                ...state, loggedIn: false
            }
        case 'REGISTER':
                return{...state, user_id: action.user_id, loggedIn: true, account_balance: action.account_balance}
        case 'PURCHASE_STOCK':
                return  {...state };
        default:
             return state;
    }
};
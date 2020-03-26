export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user_id: action.user_id,
                loggedIn: true,
                account_balance: action.balance,
                transactions: action.transactions,
                stocks: action.stocks
            }
        case 'LOGOUT':
            return {
                ...state, loggedIn: false
            }
        case 'REGISTER':
                return {
                    ...state,
                    user_id: action.user_id,
                    loggedIn: true,
                    account_balance: action.account_balance
                }
        case 'PURCHASE_STOCK':
                return {
                    ...state,
                    account_balance: action.account_balance,
                    transactions: [...state.transactions, action.transaction],
                    stocks: [...state.stocks, action.stock]
                };
        default:
             return state;
    }
};
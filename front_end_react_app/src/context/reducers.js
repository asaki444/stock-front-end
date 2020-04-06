export const UserReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user	        : action.user_id,
				loggedIn        : true,
				account_balance : action.account_balance,
				transactions    : action.transactions,
				stocks          : action.stocks
			};
		case 'REGISTER':
			return {
				...state,
				user	        : action.user,
				loggedIn        : true,
				account_balance : action.account_balance
			};
		case 'PURCHASE_STOCK':
			return {
				...state,
				account_balance : action.account_balance,
				transactions    : action.transactions,
				stocks          : action.stocks
			};
		default:
			return state;
	}
};

export function handleChange (e) {
        let value = e.target.value.trim()
        this.setState({
            [e.target.id]: value
        })
}

export function  checkValidation (state) {
    const{
        password,
        password_confirmation
    } = state;

    for(let key in state){
        if(state[key] === ''){
            return false;
        }
    }

    if(password_confirmation && password !== password_confirmation){
        return false;
    }
   return true;
}
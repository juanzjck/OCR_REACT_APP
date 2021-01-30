function persistLogin(state={phonePersist:undefined, tokenPersist:undefined},action){
    switch(action.type){
            case 'SET_PHONE_persist':{
                //const token='JWT '+action.payload.token;
                //console.log(`LOGIN -- ${token}`)
                return {
                    ...state,
                    phonePersist:action.payload.phoneUser,
                    //token:token
                }
            }
            case 'SET_TOKEN_persist':{
                //console.log('SET_TOKEN'+action.payload)
                //const token='JWT '+action.payload.token;
                return {
                    ...state,
                    tokenPersist:action.payload.tokenPersist
                }
            }
            case 'CLEAR_persist':{
                return {
                    ...state,
                    phonePersist:'',
                    tokenPersist: undefined,
                }
            }
            default:{
                return {...state}
            }           
     }
}
export default persistLogin;


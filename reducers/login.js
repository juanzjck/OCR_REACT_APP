function login(state={signIn:false, token:undefined, tokenPersist: undefined, modalPin: false},action){
    switch(action.type){
            case 'LOGIN':{
                const token='JWT '+action.payload.token;
                console.log(`LOGIN -- ${token}`)
                return {
                    ...state,
                    signIn:action.payload.signIn,
                    token:token
                }
            }
            case 'LOGIN_PERSIST':{
                const token=''+action.payload.token;
                console.log(`LOGIN2 -- ${token}`)
                return {
                    ...state,
                    signIn:action.payload.signIn,
                    token:token
                }
            }
            case 'LOGOUT':{
                
              
                return {
                    ...state,
                    phone:'',
                    token:undefined,
                    pass:'',
                    signIn:false
                }
            }
            case 'SET_TOKEN':{
                console.log('SET_TOKEN'+action.payload)
                const token='JWT '+action.payload.token;
                return {
                    ...state,
                    token:action.payload
                }
            }
            case 'SET_PHONE':{
                console.log('set_phone'+action.payload)
                return {
                    ...state,
                    phone:action.payload
                }
            }

            case 'CLEAR':{
              
                return {
                    ...state,
                    phone:'',
                    token:undefined,
                    pass:''
                }
            }

            case 'SET_PASSWORD':{
                console.log('set_pass'+action.payload)
                return {
                    ...state,
                    pass:action.payload
                }
            }

            case 'SET_MODAL_PIN':{
                return {
                    ...state,
                    modalPin: action.payload
                }
            }

            default:{
                return {...state}
            }           
     }
}
export default login;
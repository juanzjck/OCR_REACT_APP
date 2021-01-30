function screen(state={loading:false, modalVisible:false, buttonHidden:false},action){
    switch(action.type){
            case 'LOADING':{
                console.log('loading. '+action.payload)
                return {
                    ...state,
                   loading:action.payload
                }
            }
            case 'BLOCKED':{
                console.log('loading '+action.payload)
                return {
                    ...state,
                   blokend:action.payload
                }
            }
            case 'LOADED':{
              
                return {
                    ...state,
                    loading:action.payload
                }
            }
            case 'FETCHING_ME':{
              console.log('FETCHING_ME')
                return {
                    ...state,
                    fetchingMe:action.payload
                }
            }
            case 'ERROR':{
                console.log(action.payload)
                return {
                    ...state,
                    error:action.payload
                }
            }
            case 'CLEAR_ERROR':{
                return {
                    ...state,
                    error:undefined
                }
            }

            case 'MODAL_VISIBLE':{
                console.log(action.payload)
                return {
                    ...state,
                    modalVisible:action.payload
                }
            }
            case 'BUTTON_HIDDEN':{
                console.log(action.payload)
                return {
                    ...state,
                    buttonHidden:action.payload
                }
            }
            case 'ENABLE_PULL_ME':{
              
                return {
                    ...state,
                    enablePullMe:action.payload
                }
            }
            default:{
                return {...state}
            }           
     }
}
export default screen;
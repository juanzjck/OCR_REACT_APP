function signUp(state={},action){
    switch(action.type){
            case 'PHONE_SAVE':{
                console.log("PHONE_SAVE "+action.payload)
                return {
                    ...state,
                    phoneNewUser:action.payload
                }
            }
            case 'ID_SMS':{
                console.log("ID_SMS "+action.payload)
                return {
                    ...state,
                    id_sms:action.payload
                }
            }
            case 'PEROSONAL_INFO_SAVE':{
                let loquemeenvio= Object.entries(action.payload);
                console.log(`Esto esta en redux ${typeof  loquemeenvio}`)
                loquemeenvio.forEach(([key,value])=> {
                    console.log(`${key}:${value}`);
                });
                return {
                    ...state,
                    newUserInfo:action.payload
                }
            }
            default:{
                return {...state}
            }           
     }
}
export default signUp;
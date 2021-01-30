function wallet(state={purchaseAmount:'',purchasePhone:"",balance:0,balance_YAPA:0,refillInfo:{name:'',dni:''},refillAmount:0,ingresado:0,transactions:[],dateFrom:'', dateTo: '', item:'', user:user,new_transfer_info:{phone_number:"",balance:''}, profilePicture: '', DNIFront: '', DNIBack: ''},action){
    switch(action.type){
            case 'GET_ME':{
                if(action.payload===undefined){
                    return {...state}
                }
                return {
                    ...state,
                    user:action.payload
                }
            }
            case 'SET_TRANSACTIONS': {
                return {
                    ...state,
                    transactions: action.payload
                }
            }

            case 'SET_INTERVAL':{
                return {
                    ...state,
                    interval:action.payload
                }
            }
            case 'CLEAR_DATES': {
                return {
                    ...state,
                    dateFrom: '',
                    dateTo: ''
                }
            }
            case 'DATE_FROM': {
                return {
                    ...state,
                    dateFrom: action.payload
                }
            }
            case 'DATE_TO': {
                return {
                    ...state,
                    dateTo: action.payload
                }
            }
            case 'SET_TRANSACTION_ITEM': {
                return {
                    ...state,
                    item: action.payload
                }
            }
            case 'TRANSFER_RESULT':{
                return {
                    ...state,
                    transferResult:action.payload
                }
            }
            case 'TRANSFER_INFO_PHONE':{
                 
                let newPhone=`${action.payload}`;
                return{
                    ...state,
                    new_transfer_info:{...state.new_transfer_info,phone_number:newPhone}
                }
            }
            case 'TRANSFER_INFO_BALANCE':{
                // let newBalance=Number(action.payload).toFixed(2);
                return{
                    ...state,
                    new_transfer_info:{...state.new_transfer_info,balance:action.payload}
                }
            }
            case 'CLEAN_TRANSFER_INFO_BALANCE':{
             
                let newBalance=Number(action.payload).toFixed(2);
                return{
                    ...state,
                    new_transfer_info:{phone_number:"",balance:0}
                }
            }
            case 'CHANGE_PROFILE_INFO':{
                return{
                    ...state,
                    user:action.payload
                }
            }
            case 'REFILL_MOUNT':{
                
                if(action.payload==""){
                    return{
                        ...state,
                        refillAmount:0
                    }
                }
                return{
                    ...state,
                    refillAmount:action.payload
                }
            }
            case 'REFILL_INFO':{
                console.log(action.payload)
                return{
                    ...state,
                    refillInfo:action.payload
                }
            }
            case 'PURCHASE_PHONE':{

                console.log(`algo ${action.payload.replace(/ /g, "")}`)
              
                return{
                    ...state,
                    purchasePhone:action.payload.replace(/ /g, "").replace(/^(\+593)/g,"0")
                }
            }
            case 'PURCHASE_AMOUNT':{
              
                return{
                    ...state,
                    purchaseAmount:action.payload
                }
            }
            case 'LOGOUT':{
        
                return{
                    ...state,
                    balance:0,
                    balance_YAPA:0,
                    refillInfo:{name:'',dni:''},
                    refillAmount:0,
                    ingresado:0,
                    transactions:[],
                    user:user,
                    new_transfer_info:{phone_number:"",balance:0}       
                } 
            }


            case 'PURCHASE_CLEAN':{
                return {
                    ...state,
                    purchasePhone:'',
                    purchaseAmount:''
                }
            }
            case 'UPDATE_DNI_FRONT': {
                return {
                    ...state,
                    DNIFront: action.payload
                }
            }
            case 'UPDATE_DNI_BACK': {
                return {
                    ...state,
                    DNIBack: action.payload
                }
            }
            case 'UPDATE_PROFILE_PICTURE': {
                return {
                    ...state,
                    profilePicture: action.payload
                }
            }
            default:{
                return {...state}
            }           
     }
}
const user={
    first_name:'',
    last_name:'',
    Nick_name:'',
    DNI:'',
    phone_number: ''
};

export default wallet;
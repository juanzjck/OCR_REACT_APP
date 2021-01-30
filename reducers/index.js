import { combineReducers } from 'redux'
import signUp from './signUp';
import login from './login';
import wihdraw from './wihdraw';
import screen from './screen';
import wallet from './wallet';
export default combineReducers({
    signUp:signUp,
    login:login,
    wihdraw:wihdraw,
    screen:screen,
    wallet:wallet
})
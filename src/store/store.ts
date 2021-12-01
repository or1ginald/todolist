import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./reducers/tasksReducer";
import {todDoListsReducer} from "./reducers/todolistsReducer";
import thunk from "redux-thunk";
import {AppReducer} from "./reducers/appReducer";
import {authReducer} from "./reducers/authReducer";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: todDoListsReducer,
    app:AppReducer,
    auth: authReducer
})

 export type rootReducerType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))


// @ts-ignore
window.store = store
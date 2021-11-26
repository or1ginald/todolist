import React, {useCallback, useEffect} from 'react';

import {InputPlusButton} from "./InputPlusButton/InputPlusButton";
import Paper from "@mui/material/Paper/Paper";
import {ToDoList} from "./To-DoList.tsx/To-DoList";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../state/store";
import {addToDoListTC, setTodosTC} from "../state/todolists-reducer";
import Grid from '@mui/material/Grid';


export const ToDoLists = () => {
    const dispatch = useDispatch()

    // const app = useSelector<rootReducerType, AppReducerInitialStateType>(store => store.AppReducer)
    const {toDoLists, tasks} = useSelector<rootReducerType, rootReducerType>(store => store)


    useEffect(() => {
        dispatch(setTodosTC)
    }, [dispatch])


    const handleAddTodolistClick = useCallback((title: string) => {
        dispatch(addToDoListTC(title))
    }, [dispatch])


    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <InputPlusButton addCallBack={handleAddTodolistClick} label={"Add Todolist"} disabled={false}/>
            </Grid>
            <Grid container spacing={3}>
                {toDoLists.map(todolist => {
                        return <Grid item key={todolist.id}>
                            <Paper style={{padding: "10px"}}>
                                <ToDoList
                                    key={todolist.id}
                                    toDoListId={todolist.id}
                                    title={todolist.title}
                                    filter={todolist.filter}
                                    tasks={tasks[todolist.id]}
                                    entityStatus={todolist.entityStatus}
                                />
                            </Paper>
                        </Grid>
                    }
                )}
            </Grid>
        </>
    );
};
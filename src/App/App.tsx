import React, {useCallback, useEffect} from 'react';

import './App.css';
import {ToDoList} from "../components/ToDoList/ToDoList";
import {InputPlusButton} from "../components/InputPlusButton/InputPlusButton";
import {
    addToDoListTC, setTodosTC,
} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../state/store";

import {ErrorSnackBar} from "../components/ErrorSnackBar";
import Box from '@mui/material/Box/Box';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {Grid} from "@mui/material";
import Container from '@mui/material/Container/Container';
import Paper from '@mui/material/Paper/Paper';


export const App = React.memo(() => {
    const dispatch = useDispatch()

    // const app = useSelector<rootReducerType, AppReducerInitialStateType>(store => store.AppReducer)
    const {toDoLists, tasks, app} = useSelector<rootReducerType, rootReducerType>(store => store)


    useEffect(() => {
        dispatch(setTodosTC)
    }, [dispatch])


    const handleAddTodolistClick = useCallback((title: string) => {
        dispatch(addToDoListTC(title))
    }, [dispatch])


    /*-------Component--------*/
    return (
        <div className="App">
            {/*<AppBar position="static">*/}
            {/*    <Toolbar>*/}
            {/*        <IconButton edge="start" color="inherit" aria-label="menu">*/}
            {/*            <Menu/>*/}
            {/*        </IconButton>*/}
            {/*        <Typography variant="h6">*/}
            {/*            News*/}
            {/*        </Typography>*/}
            {/*        <Button color="inherit">Login</Button>*/}
            {/*    </Toolbar>*/}
            {/*    <LinearProgress/>*/}
            {/*</AppBar>*/}
            <Box height={5}>
                {app.status === "loading" && <LinearProgress/>}
            </Box>
            <ErrorSnackBar/>

            <Container fixed>
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
            </Container>
        </div>
    );
})

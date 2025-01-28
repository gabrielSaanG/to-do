import React, {useEffect, useState} from 'react'
import {Task} from "../components/Task";
import {TaskDialog} from "../components/TaskDialog/TaskDialog";
import { FaCirclePlus } from "react-icons/fa6";
import {editTaskServices, getAllTasks, insertTask} from "../../services/TaskServices";
export function Main(){


    const [isFetched, setIsFetched] = useState(true)
    const [task, setTask] = useState([])
    const [completedTask, setCompletedTask] = useState([])


    const [isVisible, setIsVisible] = useState(false)
    const [visibilityEditingScreen, setVisibilityEditingScreen] = useState(false)
    const [taskToBeEdited, setTaskToBeEdited] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const response = await getAllTasks()

            if (response === undefined) return null;


            const newTasks = response.data.filter(item => {
                return !task.some(existingTask => existingTask.token === item.token)
            })

            if (newTasks.length > 0) {
                newTasks.forEach(item => {
                    if (item.completed === "COMPLETED")
                        setCompletedTask(prev => [...prev, item])
                    else setTask(prev => [...prev, item])
                })
            }
        }
        setIsLoading(false)
        setIsFetched(false)
        fetchData()
    }, []);


    function creationTask(taskDataProvider) {
        setTask((prevTasks) => [...prevTasks, taskDataProvider])
        setIsSubmitting(!isSubmitting)
    }

    function trashCan(taskDataProvider){


        switch(taskDataProvider.completed){
            case "COMPLETED":
                setCompletedTask(completedTask.filter((task) => task.token !== taskDataProvider.token))
                break
            case "INCOMPLETE":
                setTask(task.filter((task) => task.token !== taskDataProvider.token))
                break
            default:
                break;
        }

    }

    function editIcon(taskDataProvider){
        const task = {
            "id": taskDataProvider.id,
            "title": taskDataProvider.title,
            "description": taskDataProvider.description,
            "token": taskDataProvider.token
        }
        setVisibilityEditingScreen(!visibilityEditingScreen)
        setTaskToBeEdited(task)

    }

    function updateTask(taskDataProvider){
        const taskToBeUpdated = {
            "id": taskDataProvider.id,
            "title": taskDataProvider.title,
            "description": taskDataProvider.description,
            "token": taskDataProvider.token
        }

        const index = task.findIndex(obj => obj.token === taskToBeUpdated.token);
        setTask(task.map((m, k) => {
            if (k !== index) return m
            else return {...m, title: taskToBeUpdated.title, description: taskToBeUpdated.description}
        }))
    }

    function completeIcon(taskDataProvider){
        setTask(task.filter((task) => task.token !== taskDataProvider.token))
        setCompletedTask((prevTasks) => [...prevTasks, taskDataProvider])
        console.log(completedTask)
    }



    return <div className={`transition-opacity duration-700 ${isLoading ? `opacity-0` : `opacity-100`}`}>
        <div className="h-20 w-20">
            <button onClick={() => {
                setIsVisible(!isVisible)
            }}><FaCirclePlus className="text-6xl text-emerald-700 hover:text-emerald-800 cursor-pointer p-2"/></button>
        </div>
        {visibilityEditingScreen ? <TaskDialog isVisible={visibilityEditingScreen} setIsVisible={setVisibilityEditingScreen} task={taskToBeEdited} backEndTask={editTaskServices} frontTaskUpdate={updateTask}/> : null}
        {isVisible ? <TaskDialog isVisible={isVisible} setIsVisible={setIsVisible} frontTaskUpdate={creationTask} backEndTask={insertTask} task={taskToBeEdited}/> : null}
        <div className="flex max-w-screen-xl  scroll-auto justify-left">
            {task.map(item => {
                return item && (
                <div className={`w-80 h-fit break-words min-w-80 transition-opacity duration-1000`}>
                    <Task task={item} completed={item.completed}
                          trashCan={trashCan} editIcon={editIcon} completeIcon={completeIcon} isCompleted={completedTask}/>
                </div>
            )})}
        </div>


        <div>
            <div className="border-b-2">
                <h1 className="text-emerald-700 mt-10 ml-4 text-2xl mb-3">Tasks Completadas</h1>
            </div>

            <div className="flex max-w-screen-xl  scroll-auto justify-left">
                {completedTask.map(item  => {
                    return item && (
                        <div className={`w-80 h-fit break-words min-w-80 transition-opacity duration-1000`}>
                            <Task task={item} trashCan={trashCan} editIcon={editIcon} completeIcon={completeIcon}/>
                        </div>
                    )
                })}
            </div>

        </div>
    </div>
}


export default Main;
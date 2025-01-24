import axios from 'axios'

export async function getAllTasks(){
    try{
        return await axios.get('http://localhost:8100/api/tasks/get', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (e){
        console.log("Couldn't get array of tasks")
    }
}
export async function getTask(taskObject){
    try{
        const response = await axios.post('http://localhost:8100/api/tasks/get_task', taskObject, {
            headers: {
                'Content-Type': 'application/json',
            }
        })


        if (response.status === 200 ){
            return response
        }
    } catch (e) {
        console.log("creation failed", e.status)
    }
}

export async function insertTask(title, description){
    const taskData = {
        title: title,
        description: description,
    }

    try{
        const response = await axios.post('http://localhost:8100/api/tasks/insert', taskData, {
            'Content-Type': 'application/json'
        })

        if (response.status === 201 ){
            console.log("task created")
            return response
        }
    } catch (e) {
        console.log("creation failed", e.status)
    }
}

export async function editTask(taskDataProvider){

    try{
        const response = await axios.post('http://localhost:8100/api/tasks/get_task', taskDataProvider, {
            'Content-Type': 'application/json'
        })

        if (response.status === 200){
            console.log("Edit successful")
            return response
        }
        else console.log("Could not edit task")
    } catch (e){
        console.log("EditTask function failed", e)
    }
}

export async function deleteTasks(taskObject){


    try{
        const response = await axios.delete('http://localhost:8100/api/tasks/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                token: taskObject.token,
                title: taskObject.title,
                description: taskObject.description,
            }
        })

        if (response.status === 200){
            return response
        }
    } catch (e){
        console.log("deletion failed", e.status)
    }
}

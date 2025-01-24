package org.example.api.services;

import org.example.controllers.TaskImpl;
import org.example.dtos.TaskDTO;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;

@Path("/tasks")
public class TaskServices extends BaseServices {

    TaskImpl taskImpl = new TaskImpl(datastore);

    @POST
    @Path("/insert")
    @Consumes("application/json; charset=UTF-8")
    public Response insertTask(TaskDTO task) {

        if (task == null){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        try{
            taskImpl.insertTask(task);
            return Response.status(Response.Status.CREATED).entity(task).build();
        } catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    //ToDo - criar timestamp nas Tasks para realizar pesquisa e buscar id no banco de dados através dela.
    //ToDo - apos busca retornar objeto Task criado do banco, para que nao seja necessário atualiar pagina.

    @GET
    @Path("/get")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response getAllTasks(TaskDTO task) {
        List<TaskDTO> tasks;
        try{
            Query<TaskDTO> query = datastore.createQuery(TaskDTO.class);
            tasks = query.asList();
            if(tasks.isEmpty()){
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            return Response.status(Response.Status.OK).entity(tasks).build();
        } catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Path("/get_task")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response getTask(TaskDTO task) {
     try{
           Query<TaskDTO> query = datastore.createQuery(TaskDTO.class).field("token").equal(task.getToken());
           UpdateOperations<TaskDTO> updateOperations = datastore.createUpdateOperations(TaskDTO.class).set("title", task.getTitle()).set("description", task.getDescription());
           TaskDTO editedTask = datastore.findAndModify(query, updateOperations);
           return Response.status(Response.Status.OK).entity(editedTask).build();
        } catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DELETE
    @Path("/delete")
    @Consumes("application/json; charset=UTF")
    public Response deleteTask(TaskDTO task) {
        try{
            TaskDTO taskDeleted = datastore.findAndDelete(datastore.createQuery(TaskDTO.class).field("token").equal(task.getToken()));
            System.out.println(taskDeleted.getTitle());
            return Response.status(Response.Status.OK).build();

        } catch (Exception e){
//            System.out.println(task);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}

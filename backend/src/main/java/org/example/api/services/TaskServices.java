package org.example.api.services;

import javafx.concurrent.Task;
import org.bson.types.ObjectId;
import org.example.controllers.TaskImpl;
import org.example.dtos.TaskDTO;
import org.mongodb.morphia.query.Query;

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
    @Path("/delete")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response deleteTask(Object id) {
        try{
            Query<TaskDTO> query = datastore.createQuery(TaskDTO.class).field("id").equal(id);
            TaskDTO taskToDelete = query.asList().get(0);
            if (taskToDelete == null){
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            taskImpl.deleteTask(taskToDelete);
            return Response.status(Response.Status.OK).build();
        } catch (Exception e){
            System.out.println(id);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}

package org.example.api.services;

import org.example.controllers.TaskImpl;
import org.example.dtos.TaskDTO;
import org.mongodb.morphia.query.Query;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;

@Path("/tasks")
public class TaskServices extends BaseServices {

    @POST
    @Path("/insert")
    @Consumes("application/json; charset=UTF-8")
    public Response insertTask(TaskDTO task) {
        TaskImpl taskImpl = new TaskImpl(datastore);
        if (task == null){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        try{
            taskImpl.insertTask(task);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/get")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response getTasks() {
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
}

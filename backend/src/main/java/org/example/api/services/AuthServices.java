package org.example.api.services;
import org.example.controllers.UserImpl;
import org.example.dtos.LoginDTO;
import org.example.dtos.UserDTO;
import org.mongodb.morphia.query.Query;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("/auth")
public class AuthServices extends BaseServices {

    @POST
    @Path("/login")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response login(UserDTO newUser){
        if (newUser.getPassword() == null || newUser.getPassword().equals("") || newUser.getUsername() == null || newUser.getUsername().equals("")){
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid username or password").build();
        }

        Query<UserDTO> queryUser = datastore.createQuery(UserDTO.class).field("username").equal(newUser.getUsername());
        UserDTO user = queryUser.get();
        if (user == null){
            return Response.status(Response.Status.UNAUTHORIZED).entity("User not found!").build();
        }
        return Response.ok(user).build();
    }

    @POST
    @Path("/register")
    @Consumes ("application/json; charset=UTF-8")
    @Produces ("application/json; charset=UTF-8")
    public Response register(UserDTO newUser){
        if (newUser.getUsername() == null || newUser.getPassword() == null){
            return  Response.status(Response.Status.UNAUTHORIZED).build();
        }
        try {
            UserImpl userImpl = new UserImpl(datastore);
            userImpl.insertUser(newUser);
            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

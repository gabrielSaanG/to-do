package org.example.controllers;

import org.example.dtos.TesteDTO;
import org.example.dtos.UserDTO;
import org.mongodb.morphia.Datastore;

import java.util.List;

public class UserImpl implements Users {

    public final Datastore datastore;


    public UserImpl(Datastore datastore) {
        this.datastore = datastore;

    }


    @Override
    public void insertUser(UserDTO user) {
        if (user != null) {
            System.out.printf("Inserted user");

            datastore.save(user);
        } else {
            System.out.println("Inserted user failed");
        }
    }
}

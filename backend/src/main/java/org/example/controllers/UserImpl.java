package org.example.controllers;

import org.example.dtos.TesteDTO;
import org.example.dtos.UserDTO;
import org.mongodb.morphia.Datastore;

import java.util.List;

public class UserImpl implements Users {

    public final Datastore datastore;


    public UserImpl(Datastore datastore) {
        this.datastore = datastore;


        List<TesteDTO> testes = datastore.createQuery(TesteDTO.class).asList();
    }

//    public User() throws Exception{
//        TesteDTO teste = new TesteDTO("159", "Ola");
//        datastore.save(teste);
//
//        List<TesteDTO> testes = datastore.createQuery(TesteDTO.class).asList();
//
//    }

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

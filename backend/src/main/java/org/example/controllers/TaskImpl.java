package org.example.controllers;

import org.example.dtos.TaskDTO;
import org.mongodb.morphia.Datastore;

public class TaskImpl implements Tasks {

    public final Datastore datastore;

    public TaskImpl(Datastore datastore) {
        this.datastore = datastore;
    }

    @Override
    public void insertTask(TaskDTO task) {
        if (task != null){
            System.out.println("Inserted Task");
            datastore.save(task);
        } else {
            System.out.println("Task is null");
        }
    }

    @Override
    public void deleteTask(TaskDTO task) {

    }

    @Override
    public void updateTask(TaskDTO task) {

    }
}

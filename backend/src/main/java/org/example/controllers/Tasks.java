package org.example.controllers;

import org.example.dtos.TaskDTO;

public interface Tasks {
    void insertTask(TaskDTO task);
    void deleteTask(TaskDTO task);
    void updateTask(TaskDTO task);
}

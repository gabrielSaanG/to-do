package org.example.dtos;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.Random;

@Entity("Tasks")
public class TaskDTO {

    Random rand = new Random();

    @Id
    private ObjectId id;
    private int token = rand.nextInt() * 10;
    private String title;
    private String description;
    private String completion = "INCOMPLETE";

    public TaskDTO(){

    }

    public TaskDTO(ObjectId id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public String getCompletion() {
        return completion;
    }

    public void setCompletion(String completion) {
        this.completion = completion;
    }

    public ObjectId getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getToken() {
        return token;
    }

    public void setToken(int token) {
        this.token = token;
    }
}

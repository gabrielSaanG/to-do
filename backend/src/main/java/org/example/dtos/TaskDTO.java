package org.example.dtos;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity("Tasks")
public class TaskDTO {

    @Id
    private ObjectId id;
    private String title;
    private String description;

    public TaskDTO(){

    }

    public TaskDTO(ObjectId id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
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
}

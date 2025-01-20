package org.example.api.services;

import org.mongodb.morphia.Datastore;

public class BaseServices {

    protected static Datastore datastore = new MorphiaConfig("To-dooiuy").getDatastore();

    BaseServices() {}

    public BaseServices(Datastore datastore) {
        BaseServices.datastore = datastore;
    }
}

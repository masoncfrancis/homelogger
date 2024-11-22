package database

import (
    "context"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "log"
    "os"
)

const MongoDBName = "homelogger"

func ConnectMongo() (*mongo.Client, error) {
    mongoUrl := os.Getenv("MONGODB_URI")
    if mongoUrl == "" {
        log.Fatal("Set your 'MONGODB_URI' environment variable. " +
            "See: usage-examples/#environment-variable")
    }
    ctx := context.TODO()
    client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoUrl))
    if err != nil {
        log.Fatal(err)
    }

    defer func() {
        if err := client.Disconnect(ctx); err != nil {
            log.Fatal(err)
        }
    }()
    return client, nil
}
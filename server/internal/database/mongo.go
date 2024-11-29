package database

import (
    "context"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"

    "go.mongodb.org/mongo-driver/bson"
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

    return client, nil
}

func GetTodo(client *mongo.Client) ([]bson.M, error) {
    collection := client.Database(MongoDBName).Collection("todo")
    userid := 1

    cursor, err := collection.Find(context.Background(), bson.M{"userid": userid})
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.Background())

    var results []bson.M
    for cursor.Next(context.Background()) {
        var result bson.M
        if err := cursor.Decode(&result); err != nil {
            return nil, err
        }
        results = append(results, result)
    }

    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return results, err
}


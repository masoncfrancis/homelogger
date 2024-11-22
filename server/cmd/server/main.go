package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/masoncfrancis/homelogger/server/internal/database"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World")
	})

	app.Get("/todo", func(c *fiber.Ctx) error {
		// Function works as follows:
		// 1. Connect to mongodb
		// 2. Get all todos

		// Connect to mongodb
		mongoClient, err := database.ConnectMongo()
		if err != nil {
			return c.SendString("Error connecting to MongoDB")
		} else {
			// return database connection successful message
			return c.SendString("Connected to MongoDB database: " + mongoClient.Database("homelogger").Name())
		}

		
	})

	app.Listen(":8080")
}
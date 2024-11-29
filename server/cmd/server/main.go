package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/masoncfrancis/homelogger/server/internal/database"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		panic("Error loading")
	}

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
		} 

		// Get all todos
        todos, err := database.GetTodo(mongoClient)
        if err != nil {
            return c.SendString("Error fetching todos:" + err.Error())
        }

        return c.JSON(todos)

		
	})

	app.Listen(":8080")


}
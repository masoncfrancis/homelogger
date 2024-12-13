package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	// Use CORS middleware
    app.Use(cors.New(cors.Config{
        AllowOrigins: "*", // Allow all origins
        AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
        AllowHeaders: "Content-Type,Authorization",
    }))

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

	app.Put("/todo/update/:id", func(c *fiber.Ctx) error {
		// Function works as follows:
		// 1. Connect to mongodb
		// 2. Update todo

		// Connect to mongodb
		mongoClient, err := database.ConnectMongo()
		if err != nil {
			return c.SendString("Error connecting to MongoDB")
		}

		// Update todo
		var todo map[string]interface{}
		if err := c.BodyParser(&todo); err != nil {
			return c.SendString("Error parsing body:" + err.Error())
		}
		todo["_id"] = c.Params("id")

		err = database.UpdateTodo(mongoClient, todo)
		if err != nil {
			return c.SendString("Error updating todo:" + err.Error())
		}

		return c.SendString("Todo updated")
	})

	app.Listen(":8083")


}

package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/masoncfrancis/homelogger/server/internal/database"
	"github.com/masoncfrancis/homelogger/server/internal/models"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		panic("Error loading")
	}

	// Connect to GORM
	db, err := database.ConnectGorm()
	if err != nil {
		panic("Error connecting to GORM")
	}

	// Migrate GORM
	err = database.MigrateGorm(db)
	if err != nil {
		panic("Error migrating GORM")
	}

	// Preload some test data
	db.Create(&models.Todo{Label: "Test todo", UserID: "1"})
	db.Create(&models.Todo{Label: "Test todo 2", UserID: "1", Checked: true})

	// TODO: change from mongo to gorm for todo list

	// Create new fiber app
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
		// 1. Connect to gorm
		// 2. Get all todos

		// Connect to gorm
		db, err := database.ConnectGorm()
		if err != nil {
			return c.SendString("Error connecting to GORM")
		}

		// Get all todos
		todos, err := database.GetTodos(db)
		if err != nil {
			return c.SendString("Error getting todos:" + err.Error())
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

package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/masoncfrancis/homelogger/server/internal/database"
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"strconv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		panic("Error loading environment variables. Check if .env file exists")
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

	// Create new fiber server
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
		// 1. Connect to gorm
		// 2. Get the id from the URL
		// 3. Get the checked status from the body
		// 4. Change the checked status of the todo

		// Connect to gorm
		db, err := database.ConnectGorm()
		if err != nil {
			return c.SendString("Error connecting to GORM")
		}

		// Get the id from the URL
		id := c.Params("id")

		// Get the checked status from the body
		var body struct {
			Checked bool `json:"checked"`
		}
		err = c.BodyParser(&body)
		if err != nil {
			return c.SendString("Error parsing body")
		}

		// Convert id to uint
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.SendString("Invalid ID format")
		}

		// Change the checked status of the todo
		err = database.ChangeTodoChecked(db, uint(idUint), body.Checked)
		if err != nil {
			return c.SendString("Error changing todo checked status:" + err.Error())
		}

		return c.SendString("Todo updated")
	})

	app.Post("/todo/add", func(c *fiber.Ctx) error {
		// Connect to gorm
		db, err := database.ConnectGorm()
		if err != nil {
			return c.SendString("Error connecting to GORM")
		}

		// Get the label, checked status, and userid from the body
		var body struct {
			Label   string `json:"label"`
			Checked bool   `json:"checked"`
			UserID  string `json:"userid"`
		}
		err = c.BodyParser(&body)
		if err != nil {
			return c.SendString("Error parsing body")
		}

		// Add a todo
		todo, err := database.AddTodo(db, body.Label, body.Checked, body.UserID)
		if err != nil {
			return c.SendString("Error adding todo:" + err.Error())
		}

		return c.JSON(todo)
	})

	app.Listen(":8083")

}

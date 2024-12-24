package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/masoncfrancis/homelogger/server/internal/database"
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"strconv"
)

func main() {
	// Connect to GORM
	db, err := database.ConnectGorm()
	if err != nil {
		panic("Error connecting GORM to db")
	}

	// Migrate GORM
	err = database.MigrateGorm(db)
	if err != nil {
		panic("Error migrating GORM")
	}

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
		// Connect to gorm
		db, err := database.ConnectGorm()
		if err != nil {
			return c.SendString("Error connecting GORM to db")
		}

		// Get all todos
		todos, err := database.GetTodos(db)
		if err != nil {
			return c.SendString("Error getting todos:" + err.Error())
		}

		return c.JSON(todos)
	})

	app.Put("/todo/update/:id", func(c *fiber.Ctx) error {
		// Connect to gorm
		db, err := database.ConnectGorm()
		if err != nil {
			return c.SendString("Error connecting GORM to db")
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
			return c.SendString("Error connecting GORM to db")
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

	app.Delete("/todo/delete/:id", func(c *fiber.Ctx) error {
		// Connect to gorm
		db, err := database.ConnectGorm()
		if err != nil {
			return c.SendString("Error connecting GORM to db")
		}

		// Get the id from the URL
		id := c.Params("id")

		// Convert id to uint
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.SendString("Invalid ID format")
		}

		// Delete the todo
		err = database.DeleteTodo(db, uint(idUint))
		if err != nil {
			return c.SendString("Error deleting todo:" + err.Error())
		}

		return c.SendString("Todo deleted")
	})

	// Get all appliances
	app.Get("/appliances", func(c *fiber.Ctx) error {
		// Connect to gorm
		db, err := database.ConnectGorm()
		if err != nil {
			return c.SendString("Error connecting GORM to db")
		}

		// Get all appliances
		appliances, err := database.GetAppliances(db)
		if err != nil {
			return c.SendString("Error getting appliances:" + err.Error())
		}

		return c.JSON(appliances)
	})

	// Create a new appliance
	app.Post("/appliances/add", func(c *fiber.Ctx) error {
		// Connect to gorm
		db, err := database.ConnectGorm()
		if err != nil {
			return c.SendString("Error connecting GORM to db")
		}

		// Get the makeModel, yearPurchased, purchasePrice, location, and type from the body
		var body struct {
			MakeModel     string `json:"makeModel"`
			YearPurchased string `json:"yearPurchased"`
			PurchasePrice string `json:"purchasePrice"`
			Location      string `json:"location"`
			Type          string `json:"type"`
		}
		err = c.BodyParser(&body)
		if err != nil {
			return c.SendString("Error parsing body")
		}

		// Add an appliance
		appliance, err := database.AddAppliance(db, &models.Appliance{
			MakeModel:     body.MakeModel,
			YearPurchased: body.YearPurchased,
			PurchasePrice: body.PurchasePrice,
			Location:      body.Location,
			Type:          body.Type,
		})
		if err != nil {
			return c.SendString("Error adding appliance:" + err.Error())
		}

		return c.JSON(appliance)
	})

	app.Listen(":8083")
}

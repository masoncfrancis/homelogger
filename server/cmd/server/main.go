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

		// Get the appliance details from the body
		var body struct {
			ApplianceName string `json:"applianceName"`
			Manufacturer  string `json:"manufacturer"`
			ModelNumber   string `json:"modelNumber"`
			SerialNumber  string `json:"serialNumber"`
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
			ApplianceName: body.ApplianceName,
			Manufacturer:  body.Manufacturer,
			ModelNumber:   body.ModelNumber,
			SerialNumber:  body.SerialNumber,
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

	// Update an appliance
	app.Put("/appliances/update/:id", func(c *fiber.Ctx) error {
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

		// Get the appliance details from the body
		var body struct {
			ApplianceName string `json:"applianceName"`
			Manufacturer  string `json:"manufacturer"`
			ModelNumber   string `json:"modelNumber"`
			SerialNumber  string `json:"serialNumber"`
			YearPurchased string `json:"yearPurchased"`
			PurchasePrice string `json:"purchasePrice"`
			Location      string `json:"location"`
			Type          string `json:"type"`
		}
		err = c.BodyParser(&body)
		if err != nil {
			return c.SendString("Error parsing body")
		}

		// Get the existing appliance
		appliance, err := database.GetAppliance(db, uint(idUint))
		if err != nil {
			return c.SendString("Error getting appliance:" + err.Error())
		}

		// Update the appliance details
		appliance.ApplianceName = body.ApplianceName
		appliance.Manufacturer = body.Manufacturer
		appliance.ModelNumber = body.ModelNumber
		appliance.SerialNumber = body.SerialNumber
		appliance.YearPurchased = body.YearPurchased
		appliance.PurchasePrice = body.PurchasePrice
		appliance.Location = body.Location
		appliance.Type = body.Type

		// Save the updated appliance
		updatedAppliance, err := database.UpdateAppliance(db, appliance)
		if err != nil {
			return c.SendString("Error updating appliance:" + err.Error())
		}

		return c.JSON(updatedAppliance)
	})

	app.Get("/appliances/:id", func(c *fiber.Ctx) error {
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

		// Get the appliance
		appliance, err := database.GetAppliance(db, uint(idUint))
		if err != nil {
			return c.SendString("Error getting appliance:" + err.Error())
		}

		return c.JSON(appliance)
	})

	app.Delete("/appliances/delete/:id", func(c *fiber.Ctx) error {
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

		// Delete the appliance
		err = database.DeleteAppliance(db, uint(idUint))
		if err != nil {
			return c.SendString("Error deleting appliance:" + err.Error())
		}

		return c.SendString("Appliance deleted")
	})

	// Maintenance endpoints
	app.Get("/maintenance", func(c *fiber.Ctx) error {
		applianceId := c.Query("applianceId")
		referenceType := c.Query("referenceType")
		spaceType := c.Query("spaceType")

		if applianceId == "" || referenceType == "" || spaceType == "" {
			return c.Status(fiber.StatusBadRequest).SendString("Missing required query parameters")
		}

		applianceIdUint, err := strconv.ParseUint(applianceId, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid applianceId format")
		}

		maintenances, err := database.GetMaintenances(db, uint(applianceIdUint), referenceType, spaceType)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error getting maintenance records: " + err.Error())
		}
		return c.JSON(maintenances)
	})

	app.Post("/maintenance/add", func(c *fiber.Ctx) error {
		var maintenance models.Maintenance
		if err := c.BodyParser(&maintenance); err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error parsing body: " + err.Error())
		}
		newMaintenance, err := database.AddMaintenance(db, &maintenance)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error adding maintenance record: " + err.Error())
		}
		return c.Status(fiber.StatusCreated).JSON(newMaintenance)
	})

	app.Get("/maintenance/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}
		maintenance, err := database.GetMaintenance(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusNotFound).SendString("Maintenance record not found: " + err.Error())
		}
		return c.JSON(maintenance)
	})

	app.Delete("/maintenance/delete/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}
		if err := database.DeleteMaintenance(db, uint(idUint)); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error deleting maintenance record: " + err.Error())
		}
		return c.SendStatus(fiber.StatusNoContent)
	})

	// Repair endpoints
	app.Get("/repair", func(c *fiber.Ctx) error {
		applianceId := c.Query("applianceId")
		referenceType := c.Query("referenceType")
		spaceType := c.Query("spaceType")

		if applianceId == "" || referenceType == "" || spaceType == "" {
			return c.Status(fiber.StatusBadRequest).SendString("Missing required query parameters")
		}

		applianceIdUint, err := strconv.ParseUint(applianceId, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid applianceId format")
		}

		repairs, err := database.GetRepairs(db, uint(applianceIdUint), referenceType, spaceType)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error getting repair records: " + err.Error())
		}
		return c.JSON(repairs)
	})

	app.Post("/repair/add", func(c *fiber.Ctx) error {
		var repair models.Repair
		if err := c.BodyParser(&repair); err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error parsing body: " + err.Error())
		}
		newRepair, err := database.AddRepair(db, &repair)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error adding repair record: " + err.Error())
		}
		return c.Status(fiber.StatusCreated).JSON(newRepair)
	})

	app.Get("/repair/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}
		repair, err := database.GetRepair(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusNotFound).SendString("Repair record not found: " + err.Error())
		}
		return c.JSON(repair)
	})

	app.Delete("/repair/delete/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}
		if err := database.DeleteRepair(db, uint(idUint)); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error deleting repair record: " + err.Error())
		}
		return c.SendStatus(fiber.StatusNoContent)
	})

	app.Listen(":8083")
}

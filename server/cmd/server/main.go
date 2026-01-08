package main

import (
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/masoncfrancis/homelogger/server/internal/database"
	"github.com/masoncfrancis/homelogger/server/internal/models"
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
		// Expect maintenance fields plus optional attachmentIds array
		var body struct {
			models.Maintenance
			AttachmentIDs []uint `json:"attachmentIds"`
		}
		if err := c.BodyParser(&body); err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error parsing body: " + err.Error())
		}
		// Create maintenance record
		newMaintenance, err := database.AddMaintenance(db, &body.Maintenance)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error adding maintenance record: " + err.Error())
		}

		// Attach files if any
		for _, fid := range body.AttachmentIDs {
			_ = database.AttachFileToMaintenance(db, fid, newMaintenance.ID)
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
		var body struct {
			models.Repair
			AttachmentIDs []uint `json:"attachmentIds"`
		}
		if err := c.BodyParser(&body); err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error parsing body: " + err.Error())
		}
		newRepair, err := database.AddRepair(db, &body.Repair)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error adding repair record: " + err.Error())
		}

		for _, fid := range body.AttachmentIDs {
			_ = database.AttachFileToRepair(db, fid, newRepair.ID)
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

	// Task endpoints
	app.Post("/tasks/add", func(c *fiber.Ctx) error {
		var body struct {
			Title          string `json:"title"`
			Notes          string `json:"notes"`
			RecurrenceRule string `json:"recurrenceRule"`
			ApplianceID    uint   `json:"applianceId"`
			Area           string `json:"area"`
		}
		if err := c.BodyParser(&body); err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error parsing body: " + err.Error())
		}
		task := &models.Task{
			Title:          body.Title,
			Notes:          body.Notes,
			RecurrenceRule: body.RecurrenceRule,
			Area:           body.Area,
		}
		if body.ApplianceID != 0 {
			task.ApplianceID = &body.ApplianceID
		}
		newTask, err := database.AddTask(db, task)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error adding task: " + err.Error())
		}
		return c.Status(fiber.StatusCreated).JSON(newTask)
	})

	app.Get("/tasks", func(c *fiber.Ctx) error {
		tasks, err := database.ListTasks(db)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error listing tasks: " + err.Error())
		}
		return c.JSON(tasks)
	})

	// Occurrence endpoints
	app.Get("/occurrences", func(c *fiber.Ctx) error {
		startStr := c.Query("start")
		endStr := c.Query("end")
		if startStr == "" || endStr == "" {
			return c.Status(fiber.StatusBadRequest).SendString("Missing start or end query parameters (ISO8601)")
		}
		start, err := time.Parse(time.RFC3339, startStr)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid start format: " + err.Error())
		}
		end, err := time.Parse(time.RFC3339, endStr)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid end format: " + err.Error())
		}
		occs, err := database.ListOccurrencesByRange(db, start, end)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error listing occurrences: " + err.Error())
		}
		return c.JSON(occs)
	})

	// List occurrences for an appliance
	app.Get("/occurrences/appliance/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}
		startStr := c.Query("start")
		endStr := c.Query("end")
		var start time.Time = time.Now().UTC()
		var end time.Time = time.Now().UTC().AddDate(0, 3, 0) // default 3 months
		if startStr != "" {
			if s, err := time.Parse(time.RFC3339, startStr); err == nil {
				start = s
			}
		}
		if endStr != "" {
			if e, err := time.Parse(time.RFC3339, endStr); err == nil {
				end = e
			}
		}

		occs, err := database.ListOccurrencesByAppliance(db, uint(idUint), start, end)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error listing occurrences for appliance: " + err.Error())
		}
		return c.JSON(occs)
	})

	app.Post("/occurrences/:id/complete", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}
		occ, err := database.MarkOccurrenceComplete(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error marking occurrence complete: " + err.Error())
		}
		return c.JSON(occ)
	})

	// Upload a new file
	app.Post("/files/upload", func(c *fiber.Ctx) error {
		// Parse the multipart form
		form, err := c.MultipartForm()
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error parsing multipart form: " + err.Error())
		}

		// Get the file and userID from the form
		files := form.File["file"]
		userID := form.Value["userID"][0]

		if len(files) == 0 || userID == "" {
			return c.Status(fiber.StatusBadRequest).SendString("Missing file or userID")
		}

		// Create a new SavedFile object without setting the ID
		file := files[0]
		savedFile := &models.SavedFile{
			OriginalName: file.Filename,
			UserID:       userID,
		}

		// Save the file information to the database
		newFile, err := database.UploadFile(db, savedFile)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error saving file information: " + err.Error())
		}

		// Save the file to the server with the id as the file name
		filePath := "./data/uploads/" + strconv.FormatUint(uint64(newFile.ID), 10)
		if err := c.SaveFile(file, filePath); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error saving file: " + err.Error())
		}

		// Update the file path in the database
		newFile.Path = filePath
		if _, err := database.UpdateFilePath(db, newFile); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error updating file path: " + err.Error())
		}

		// Return the id, originalName, and userID
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"id":           newFile.ID,
			"originalName": newFile.OriginalName,
			"userID":       newFile.UserID,
		})
	})

	// Get file information by ID
	app.Get("/files/info/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}

		fileInfo, err := database.GetFileInfo(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusNotFound).SendString("File not found: " + err.Error())
		}

		return c.JSON(fileInfo)
	})

	// List files attached to a maintenance record
	app.Get("/files/maintenance/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}

		files, err := database.GetFilesByMaintenance(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error getting files: " + err.Error())
		}
		return c.JSON(files)
	})

	// List files attached to a repair record
	app.Get("/files/repair/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}

		files, err := database.GetFilesByRepair(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error getting files: " + err.Error())
		}
		return c.JSON(files)
	})

	// List files attached to an appliance
	app.Get("/files/appliance/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}

		files, err := database.GetFilesByAppliance(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error getting files: " + err.Error())
		}
		return c.JSON(files)
	})

	app.Get("/files/download/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}

		// Fetch the file information
		fileInfo, err := database.GetFileInfo(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusNotFound).SendString("File not found: " + err.Error())
		}

		// Fetch the file path using the GetFilePath function
		filePath, err := database.GetFilePath(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusNotFound).SendString("File path not found: " + err.Error())
		}

		// Set the Content-Disposition header to specify the original file name
		c.Set("Content-Disposition", "attachment; filename="+fileInfo.OriginalName)

		return c.SendFile(filePath)
	})

	// Associate an existing uploaded file with a maintenance or repair record
	app.Post("/files/attach", func(c *fiber.Ctx) error {
		var body struct {
			FileID        uint `json:"fileId"`
			MaintenanceID uint `json:"maintenanceId"`
			RepairID      uint `json:"repairId"`
			ApplianceID   uint `json:"applianceId"`
		}
		if err := c.BodyParser(&body); err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error parsing body: " + err.Error())
		}

		if body.MaintenanceID != 0 {
			if err := database.AttachFileToMaintenance(db, body.FileID, body.MaintenanceID); err != nil {
				return c.Status(fiber.StatusInternalServerError).SendString("Error attaching file: " + err.Error())
			}
		}
		if body.RepairID != 0 {
			if err := database.AttachFileToRepair(db, body.FileID, body.RepairID); err != nil {
				return c.Status(fiber.StatusInternalServerError).SendString("Error attaching file: " + err.Error())
			}
		}
		if body.ApplianceID != 0 {
			if err := database.AttachFileToAppliance(db, body.FileID, body.ApplianceID); err != nil {
				return c.Status(fiber.StatusInternalServerError).SendString("Error attaching file: " + err.Error())
			}
		}

		return c.SendStatus(fiber.StatusNoContent)
	})

	// Delete a file (record + stored file)
	app.Delete("/files/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
		}

		// Get file path
		filePath, err := database.GetFilePath(db, uint(idUint))
		if err != nil {
			return c.Status(fiber.StatusNotFound).SendString("File path not found: " + err.Error())
		}

		// Delete file from disk if exists
		if err := os.Remove(filePath); err != nil {
			// If file doesn't exist, continue to delete DB record
		}

		// Delete DB record
		if err := database.DeleteFile(db, uint(idUint)); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error deleting file record: " + err.Error())
		}

		return c.SendStatus(fiber.StatusNoContent)
	})

	app.Listen(":8083")
}

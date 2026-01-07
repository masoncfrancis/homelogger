package database

import (
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// ConnectGorm connects to the database
func ConnectGorm() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("./data/db/homelogger.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}

// MigrateGorm migrates the database
func MigrateGorm(db *gorm.DB) error {
	err := db.AutoMigrate(&models.Todo{}, &models.Appliance{}, &models.Maintenance{}, &models.Repair{}, &models.SavedFile{}, &models.Task{}, &models.Occurrence{})
	if err != nil {
		return err
	}

	return nil
}

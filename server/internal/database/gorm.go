package database

import (
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// ConnectGorm connects to the database
func ConnectGorm() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("./db-data/sqlite/homelogger.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}

// MigrateGorm migrates the database
func MigrateGorm(db *gorm.DB) error {
	err := db.AutoMigrate(&models.Todo{}, &models.Appliance{})
	if err != nil {
		return err
	}

	return nil
}

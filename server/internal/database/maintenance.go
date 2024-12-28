package database

import (
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/gorm"
)

// GetMaintenances gets all maintenance records
func GetMaintenances(db *gorm.DB) ([]models.Maintenance, error) {
	var maintenances []models.Maintenance
	result := db.Find(&maintenances)
	if result.Error != nil {
		return []models.Maintenance{}, result.Error
	}

	return maintenances, nil
}

// AddMaintenance creates a new maintenance record
func AddMaintenance(db *gorm.DB, maintenance *models.Maintenance) (*models.Maintenance, error) {
	result := db.Create(maintenance)
	if result.Error != nil {
		return nil, result.Error
	}

	return maintenance, nil
}

// GetMaintenance gets a maintenance record by ID
func GetMaintenance(db *gorm.DB, id uint) (*models.Maintenance, error) {
	var maintenance models.Maintenance
	result := db.Where("id = ?", id).First(&maintenance)
	if result.Error != nil {
		return nil, result.Error
	}

	return &maintenance, nil
}

// DeleteMaintenance deletes a maintenance record by ID
func DeleteMaintenance(db *gorm.DB, id uint) error {
	result := db.Where("id = ?", id).Delete(&models.Maintenance{})
	if result.Error != nil {
		return result.Error
	}

	return nil
}

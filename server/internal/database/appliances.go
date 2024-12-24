package database

import (
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/gorm"
)

// GetAppliances gets all appliances
func GetAppliances(db *gorm.DB) ([]models.Appliance, error) {
	var appliances []models.Appliance
	result := db.Find(&appliances)
	if result.Error != nil {
		return []models.Appliance{}, result.Error
	}

	return appliances, nil
}

// AddAppliance creates a new appliance
func AddAppliance(db *gorm.DB, appliance *models.Appliance) (*models.Appliance, error) {
	result := db.Create(appliance)
	if result.Error != nil {
		return nil, result.Error
	}

	return appliance, nil
}

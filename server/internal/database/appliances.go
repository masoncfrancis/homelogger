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

// GetAppliance gets an appliance by ID
func GetAppliance(db *gorm.DB, id uint) (*models.Appliance, error) {
	var appliance models.Appliance
	result := db.Where("id = ?", id).First(&appliance)
	if result.Error != nil {
		return nil, result.Error
	}

	return &appliance, nil
}

// DeleteAppliance deletes an appliance by ID
func DeleteAppliance(db *gorm.DB, id uint) error {
	result := db.Where("id = ?", id).Delete(&models.Appliance{})
	if result.Error != nil {
		return result.Error
	}

	return nil
}

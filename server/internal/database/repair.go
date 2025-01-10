package database

import (
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/gorm"
)

// GetRepairs gets repair records filtered by applianceId, referenceType, and spaceType
func GetRepairs(db *gorm.DB, applianceId uint, referenceType, spaceType string) ([]models.Repair, error) {
	var repairs []models.Repair
	if referenceType == "Space" {
		result := db.Where("reference_type = ? AND space_type = ?", referenceType, spaceType).Find(&repairs)
		if result.Error != nil {
			return []models.Repair{}, result.Error
		}

		return repairs, nil
	} else {
		result := db.Where("appliance_id = ? AND reference_type = ?", applianceId, referenceType).Find(&repairs)
		if result.Error != nil {
			return []models.Repair{}, result.Error
		}

		return repairs, nil
	}

}

// AddRepair creates a new repair record
func AddRepair(db *gorm.DB, repair *models.Repair) (*models.Repair, error) {
	result := db.Create(repair)
	if result.Error != nil {
		return nil, result.Error
	}

	return repair, nil
}

// GetRepair gets a repair record by ID
func GetRepair(db *gorm.DB, id uint) (*models.Repair, error) {
	var repair models.Repair
	result := db.Where("id = ?", id).First(&repair)
	if result.Error != nil {
		return nil, result.Error
	}

	return &repair, nil
}

// DeleteRepair deletes a repair record by ID
func DeleteRepair(db *gorm.DB, id uint) error {
	result := db.Where("id = ?", id).Delete(&models.Repair{})
	if result.Error != nil {
		return result.Error
	}

	return nil
}

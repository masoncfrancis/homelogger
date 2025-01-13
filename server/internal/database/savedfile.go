package database

import (
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/gorm"
)

// GetFile gets a file by ID
func GetFileInfo(db *gorm.DB, id uint) (*models.SavedFile, error) {
	var file models.SavedFile
	result := db.Where("id = ?", id).First(&file)
	if result.Error != nil {
		return nil, result.Error
	}

	return &file, nil
}

// UploadFile uploads a new file
func UploadFile(db *gorm.DB, file *models.SavedFile) (*models.SavedFile, error) {
	// Ensure the ID is not manually set
	file.ID = 0
	result := db.Create(file)
	if result.Error != nil {
		return nil, result.Error
	}

	return file, nil
}

// UpdateFilePath updates the file path of an existing file
func UpdateFilePath(db *gorm.DB, file *models.SavedFile) (*models.SavedFile, error) {
	result := db.Model(&models.SavedFile{}).Where("id = ?", file.ID).Update("path", file.Path)
	if result.Error != nil {
		return nil, result.Error
	}

	return file, nil
}

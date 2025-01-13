package database

import (
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/gorm"
)

// FileInfoResponse represents the response structure for file information
type FileInfoResponse struct {
	ID           uint   `json:"id"`
	OriginalName string `json:"originalName"`
	UserID       string `json:"userID"`
}

// GetFileInfo gets a file by ID and returns only id, originalName, and userID
func GetFileInfo(db *gorm.DB, id uint) (*FileInfoResponse, error) {
	var file models.SavedFile
	result := db.Select("id", "original_name", "user_id").Where("id = ?", id).First(&file)
	if result.Error != nil {
		return nil, result.Error
	}

	return &FileInfoResponse{
		ID:           file.ID,
		OriginalName: file.OriginalName,
		UserID:       file.UserID,
	}, nil
}

// GetFilePath retrieves the file path of a file by its ID
func GetFilePath(db *gorm.DB, id uint) (string, error) {
	var file models.SavedFile
	result := db.Select("path").Where("id = ?", id).First(&file)
	if result.Error != nil {
		return "", result.Error
	}
	return file.Path, nil
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

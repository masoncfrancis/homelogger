package database

import (
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/gorm"
)

// GetTodos returns all todos
func GetTodos(db *gorm.DB) ([]models.Todo, error) {
	var todos []models.Todo
	result := db.Where(&models.Todo{UserID: "1"}).Find(&todos)
	if result.Error != nil {
		return nil, result.Error
	}

	return todos, nil
}

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

// ChangeTodoChecked changes the checked status of a todo
func ChangeTodoChecked(db *gorm.DB, id uint, checked bool) error {
	result := db.Model(&models.Todo{}).Where("id = ?", id).Update("checked", checked)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

// AddTodo adds a todo and returns the created todo
func AddTodo(db *gorm.DB, label string, checked bool, userID string) (models.Todo, error) {
	todo := models.Todo{Label: label, Checked: checked, UserID: userID}
	result := db.Create(&todo)
	if result.Error != nil {
		return models.Todo{}, result.Error
	}

	return todo, nil
}

// DeleteTodo deletes a todo
func DeleteTodo(db *gorm.DB, id uint) error {
	result := db.Where("id = ?", id).Delete(&models.Todo{})
	if result.Error != nil {
		return result.Error
	}

	return nil
}

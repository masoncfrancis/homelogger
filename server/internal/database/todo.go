package database

import (
	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/gorm"
)

// GetTodos returns all todos
// GetTodos returns todos filtered by optional applianceId and spaceType. Pass applianceId=0 and spaceType="" for no filter.
func GetTodos(db *gorm.DB, applianceId uint, spaceType string) ([]models.Todo, error) {
	var todos []models.Todo
	query := db.Model(&models.Todo{}).Where(&models.Todo{UserID: "1"})

	if applianceId != 0 {
		query = query.Where("appliance_id = ?", applianceId)
	}
	if spaceType != "" {
		query = query.Where("space_type = ?", spaceType)
	}

	result := query.Find(&todos)
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
// AddTodo adds a todo with optional applianceId and spaceType
func AddTodo(db *gorm.DB, label string, checked bool, userID string, applianceId uint, spaceType string) (models.Todo, error) {
	todo := models.Todo{Label: label, Checked: checked, UserID: userID}
	if applianceId != 0 {
		todo.ApplianceID = &applianceId
	}
	if spaceType != "" {
		todo.SpaceType = &spaceType
	}

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

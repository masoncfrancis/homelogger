package database

import (
	"time"

	"github.com/masoncfrancis/homelogger/server/internal/models"
	"gorm.io/gorm"
)

// AddTask creates a new Task
func AddTask(db *gorm.DB, t *models.Task) (*models.Task, error) {
	if err := db.Create(t).Error; err != nil {
		return nil, err
	}
	return t, nil
}

// GetTask retrieves a task by ID
func GetTask(db *gorm.DB, id uint) (*models.Task, error) {
	var t models.Task
	if err := db.First(&t, id).Error; err != nil {
		return nil, err
	}
	return &t, nil
}

// ListTasks returns all tasks
func ListTasks(db *gorm.DB) ([]models.Task, error) {
	var tasks []models.Task
	if err := db.Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}

// FindTasksNeedingMaterialization returns tasks that have a recurrence rule set
func FindTasksNeedingMaterialization(db *gorm.DB) ([]models.Task, error) {
	var tasks []models.Task
	if err := db.Where("recurrence_rule <> ''").Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}

// Helper to ensure occurrences exist for a task up to 'until'
func EnsureOccurrencesForTask(db *gorm.DB, task *models.Task, until time.Time) error {
	return MaterializeOccurrencesForTask(db, task, until)
}

package database

import (
	"fmt"
	"time"

	"github.com/masoncfrancis/homelogger/server/internal/models"
	rrule "github.com/teambition/rrule-go"
	"gorm.io/gorm"
)

// MaterializeOccurrencesForTask generates occurrences for the given task up to the 'until' time.
func MaterializeOccurrencesForTask(db *gorm.DB, task *models.Task, until time.Time) error {
	if task == nil || task.RecurrenceRule == "" {
		return nil
	}

	// Build RRULE string with DTSTART based on task.CreatedAt
	dt := task.CreatedAt.UTC().Format("20060102T150405Z")
	ruleText := fmt.Sprintf("DTSTART:%s\nRRULE:%s", dt, task.RecurrenceRule)

	r, err := rrule.StrToRRule(ruleText)
	if err != nil {
		return err
	}

	// Generate between now (or CreatedAt) and until
	start := time.Now().UTC()
	if task.CreatedAt.After(start) {
		start = task.CreatedAt.UTC()
	}

	times := r.Between(start, until, true)

	for _, t := range times {
		// Check if an occurrence already exists for this task+dueAt
		var occ models.Occurrence
		if err := db.Where("task_id = ? AND due_at = ?", task.ID, t).First(&occ).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				newOcc := &models.Occurrence{
					TaskID: task.ID,
					DueAt:  t,
					Status: "pending",
				}
				if err := db.Create(newOcc).Error; err != nil {
					return err
				}
			} else {
				return err
			}
		}
	}

	return nil
}

// ListOccurrencesByRange returns occurrences between start and end
func ListOccurrencesByRange(db *gorm.DB, start, end time.Time) ([]models.Occurrence, error) {
	var occs []models.Occurrence
	if err := db.Where("due_at >= ? AND due_at <= ?", start, end).Order("due_at asc").Find(&occs).Error; err != nil {
		return nil, err
	}
	return occs, nil
}

// ListOccurrencesByAppliance returns occurrences for tasks attached to a given appliance
func ListOccurrencesByAppliance(db *gorm.DB, applianceID uint, start, end time.Time) ([]models.OccurrenceWithTask, error) {
	var occs []models.Occurrence
	// Join tasks to filter by appliance_id
	if err := db.Joins("JOIN tasks ON tasks.id = occurrences.task_id").Where("tasks.appliance_id = ? AND due_at >= ? AND due_at <= ?", applianceID, start, end).Order("due_at asc").Find(&occs).Error; err != nil {
		return nil, err
	}

	// For each occurrence, load the task
	var result []models.OccurrenceWithTask
	for _, o := range occs {
		var t models.Task
		if err := db.First(&t, o.TaskID).Error; err != nil {
			return nil, err
		}
		result = append(result, models.OccurrenceWithTask{Occurrence: o, Task: t})
	}
	return result, nil
}

// MarkOccurrenceComplete sets the occurrence status to completed and records CompletedAt
func MarkOccurrenceComplete(db *gorm.DB, id uint) (*models.Occurrence, error) {
	var occ models.Occurrence
	if err := db.First(&occ, id).Error; err != nil {
		return nil, err
	}
	now := time.Now().UTC()
	occ.Status = "completed"
	occ.CompletedAt = &now
	if err := db.Save(&occ).Error; err != nil {
		return nil, err
	}
	return &occ, nil
}

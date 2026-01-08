package models

import (
	"time"

	"gorm.io/gorm"
)

type Occurrence struct {
	gorm.Model
	ID          uint       `json:"id" gorm:"primaryKey"`
	TaskID      uint       `json:"taskId" gorm:"index"`
	DueAt       time.Time  `json:"dueAt" gorm:"index"`
	Status      string     `json:"status" gorm:"not null;default:'pending'"` // pending|completed|skipped
	CompletedAt *time.Time `json:"completedAt" gorm:"default:null"`
	Notes       string     `json:"notes" gorm:"not null;default:''"`
}

// Optional preload relation to include Task details in JSON responses
type OccurrenceWithTask struct {
	Occurrence
	Task Task `json:"task,omitempty" gorm:"foreignKey:TaskID"`
}

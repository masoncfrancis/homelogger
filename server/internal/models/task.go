package models

import (
	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	ID             uint   `json:"id" gorm:"primaryKey"`
	Title          string `json:"title" gorm:"not null;default:''"`
	Notes          string `json:"notes" gorm:"not null;default:''"`
	RecurrenceRule string `json:"recurrenceRule" gorm:"not null;default:''"` // RFC5545 RRULE string (without leading "RRULE:")
	ApplianceID    *uint  `json:"applianceId" gorm:"default:null;index"`
	Area           string `json:"area" gorm:"not null;default:''"`
}

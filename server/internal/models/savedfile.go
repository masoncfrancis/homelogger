package models

import (
	"gorm.io/gorm"
)

type SavedFile struct {
	gorm.Model
	ID           uint   `json:"id" gorm:"primaryKey"`
	Path         string `json:"path" gorm:"not null"`
	OriginalName string `json:"checked" gorm:"default:'';not null"`
	UserID       string `json:"userid" gorm:"not null"`
}

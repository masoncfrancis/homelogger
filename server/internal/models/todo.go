package models

import (
	"gorm.io/gorm"
)

// Todo model
type Todo struct {
	gorm.Model
	ID	 uint   `json:"id" gorm:"primaryKey"`
	Label string `json:"label"`
	Checked bool `json:"checked" gorm:"default:false;not null"`
	UserID uint `json:"userid" gorm:"not null"`
}


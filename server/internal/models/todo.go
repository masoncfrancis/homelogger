package models

import (
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	ID          uint    `json:"id" gorm:"primaryKey"`
	Label       string  `json:"label"`
	Checked     bool    `json:"checked" gorm:"default:false;not null"`
	UserID      string  `json:"userid" gorm:"not null"`
	ApplianceID *uint   `json:"applianceId" gorm:"default:null"`
	SpaceType   *string `json:"spaceType" gorm:"default:null"`
}

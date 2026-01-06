package models

import (
	"gorm.io/gorm"
)

type SavedFile struct {
	gorm.Model
	ID            uint   `json:"id" gorm:"primaryKey"`
	Path          string `json:"path" gorm:"not null"`
	OriginalName  string `json:"checked" gorm:"default:'';not null"`
	UserID        string `json:"userid" gorm:"not null"`
	MaintenanceID *uint  `json:"maintenanceId" gorm:"default:null"`
	RepairID      *uint  `json:"repairId" gorm:"default:null"`
	ApplianceID   *uint  `json:"applianceId" gorm:"default:null"`
}

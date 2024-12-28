package models

import (
	"gorm.io/gorm"
)

type Appliance struct {
	gorm.Model
	ID            uint   `json:"id" gorm:"primaryKey"`
	ApplianceName string `json:"applianceName" gorm:"not null"`
	Manufacturer  string `json:"manufacturer" gorm:"not null"`
	ModelNumber   string `json:"modelNumber" gorm:"not null"`
	SerialNumber  string `json:"serialNumber" gorm:"not null"`
	YearPurchased string `json:"yearPurchased" gorm:"not null"`
	PurchasePrice string `json:"purchasePrice" gorm:"not null"`
	Location      string `json:"location" gorm:"not null"`
	Type          string `json:"type" gorm:"not null"`
}

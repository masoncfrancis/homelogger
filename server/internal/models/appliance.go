package models

import (
	"gorm.io/gorm"
)

type Appliance struct {
	gorm.Model
	ID            uint   `json:"id" gorm:"primaryKey"`
	ApplianceName string `json:"applianceName" gorm:"not null"`
	Manufacturer  string `json:"manufacturer"`
	ModelNumber   string `json:"modelNumber"`
	SerialNumber  string `json:"serialNumber"`
	YearPurchased string `json:"yearPurchased"`
	PurchasePrice string `json:"purchasePrice"`
	Location      string `json:"location" gorm:"not null"`
	Type          string `json:"type" gorm:"not null"`
}

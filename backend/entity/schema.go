package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Name      string
	Email     string     `gorm:"uniqueIndex"`
	Password  string     `json:"-"`
	SlipLists []SlipList `gorm:"foreignKey:AdminID"`
}
type Banking struct {
	gorm.Model
	Name      string
	Commerce  string
	Branch    string
	SlipLists []SlipList `gorm:"foreignKey:BankingID"`
}
type PaymentStatus struct {
	gorm.Model
	Name      string
	SlipLists []SlipList `gorm:"foreignKey:PayID"`
}
type StudentList struct {
	gorm.Model
	Report    string
	Status    string
	SaveTime  time.Time
	SlipLists []SlipList `gorm:"foreignKey:StudentListID"`
}
type SlipList struct {
	gorm.Model
	Name     string
	Total    string
	Slipdate time.Time

	AdminID *uint
	Admin   Admin

	BankingID *uint
	Banking   Banking

	PayID *uint
	Pay   PaymentStatus

	StudentListID *uint
	StudentList   StudentList
}

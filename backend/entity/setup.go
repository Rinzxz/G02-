package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}
func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&Admin{},
		&Banking{},
		&PaymentStatus{},
		&StudentList{},
		&SlipList{},
	)
	db = database
	password, err := bcrypt.GenerateFromPassword([]byte("123"), 14)

	db.Model(&Admin{}).Create(&Admin{
		Name:     "khem",
		Email:    "khemkhemsiwa555@gmail.com",
		Password: string(password),
	})

	var khem Admin

	db.Raw("SELECT * FROM admins WHERE email = ?", "khemkhemsiwa555@gmail.com").Scan(&khem)

	// --- PaymentStatus Data
	Status1 := PaymentStatus{
		Name: "successful",
	}
	db.Model(&PaymentStatus{}).Create(&Status1)

	Status2 := PaymentStatus{
		Name: "processing",
	}
	db.Model(&PaymentStatus{}).Create(&Status2)

	Status3 := PaymentStatus{
		Name: "Delay",
	}
	db.Model(&PaymentStatus{}).Create(&Status3)

	// --- Banking Data
	bank1 := Banking{
		Name:     "Ace",
		Commerce: "SCB",
		Branch:   "Korat",
	}
	db.Model(&Banking{}).Create(&bank1)

	bank2 := Banking{
		Name:     "Luffy",
		Commerce: "KBANK",
		Branch:   "Korat",
	}
	db.Model(&Banking{}).Create(&bank2)

	// --- StudentList Data
	s1 := StudentList{
		Report: "201",
		Status: "Pass",
	}
	db.Model(&StudentList{}).Create(&s1)

	s2 := StudentList{
		Report: "202",
		Status: "FAIL",
	}
	db.Model(&StudentList{}).Create(&s2)

	s3 := StudentList{
		Report: "203",
		Status: "WAITING",
	}
	db.Model(&StudentList{}).Create(&s3)
}

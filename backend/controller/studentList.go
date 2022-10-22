package controller

import (
	"net/http"

	"github.com/Ksis123/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /StudentList
func CreateStudentList(c *gin.Context) {
	var StudentList entity.StudentList
	if err := c.ShouldBindJSON(&StudentList); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	if err := entity.DB().Create(&StudentList).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": StudentList})

}

// GET /StudentList/:id
func GetStudentList(c *gin.Context) {

	var admin entity.Admin

	StudentListID := c.Param("StudentListID")

	if err := entity.DB().Raw("SELECT * FROM student_lists WHERE id = ?", StudentListID).Scan(&admin).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": StudentListID})
}

// GET /StudentList
func ListStudentList(c *gin.Context) {

	var StudentList []entity.StudentList

	if err := entity.DB().Raw("SELECT * FROM student_lists").Scan(&StudentList).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": StudentList})
}

// DELETE /StudentList/:id
func DeleteStudentList(c *gin.Context) {

	StudentListID := c.Param("StudentListID")
	if tx := entity.DB().Exec("DELETE FROM student_lists WHERE id = ?", StudentListID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "StudentList not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": StudentListID})
}

// PATCH /StudentList
func UpdateStudentList(c *gin.Context) {

	var StudentList entity.StudentList

	if err := c.ShouldBindJSON(&StudentList); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	if tx := entity.DB().Where("id = ?", StudentList.ID).First(&StudentList); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "SlipList not found"})

		return

	}
	if err := entity.DB().Save(&StudentList).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"StudentList": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": StudentList})
}

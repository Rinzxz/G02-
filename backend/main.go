package main

import (
	"github.com/Ksis123/sa-65-example/controller"
	"github.com/Ksis123/sa-65-example/entity"
	"github.com/Ksis123/sa-65-example/middlewares"

	"github.com/gin-gonic/gin"
)

const PORT = "5000"

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			// Admin Routes
			router.GET("/admin", controller.ListAdmin)
			router.GET("/admin/:id", controller.GetAdmin)
			router.PATCH("/admin", controller.UpdateAdmin)
			router.DELETE("/admin/:id", controller.DeleteAdmin)

			// Banking Routes
			router.GET("/bankings", controller.ListBanking)
			router.GET("/banking/:id", controller.GetBanking)
			router.POST("/bankings", controller.CreateBanking)
			router.PATCH("/bankings", controller.UpdateBanking)
			router.DELETE("/bankings/:id", controller.DeleteBanking)

			// PaymentStatus Routes
			router.GET("/paymentstatus", controller.ListMyPaymentStatus)
			router.GET("/paymentstatus/:id", controller.GetPaymentStatus)
			router.POST("/paymentstatus", controller.CreatePaymentStatus)
			router.PATCH("/paymentstatus", controller.UpdatePaymentStatus)
			router.DELETE("/paymentstatus/:id", controller.DeletePaymentStatus)

			// Sliplist Routes
			router.GET("/Sliplist", controller.SlipList)
			router.GET("/Sliplist/:id", controller.GetSlipList)
			router.POST("/Sliplist", controller.CreateSlipList)
			router.PATCH("/Sliplist", controller.UpdateSlipList)
			router.DELETE("/Sliplist/:id", controller.DeleteSlipList)

			// StudentList Routes
			router.GET("/StudentList", controller.ListStudentList)
			router.GET("/StudentList/:id", controller.GetStudentList)
			router.POST("/StudentList", controller.CreateStudentList)
			router.PATCH("/StudentList", controller.UpdateStudentList)
			router.DELETE("/StudentList/:id", controller.DeleteStudentList)

		}
	}

	// Signup User Route
	r.POST("/signup", controller.CreateAdmins)
	// login User Route
	r.POST("/login", controller.Login)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

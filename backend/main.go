package main

import (
	"log"
	"os"

	"github.com/JagdeepSingh13/go_jwt/middleware"
	"github.com/JagdeepSingh13/go_jwt/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())

	routes.AuthRoutes(router)
	// routes.UserRoutes(router)

	// Protected routes
	protected := router.Group("/")
	protected.Use(middleware.Authenticate())
	routes.UserRoutes(protected)
	routes.QuestionRoutes(protected)

	router.Run(":" + port)
}

package routes

import (
	"github.com/JagdeepSingh13/go_jwt/controllers" // Replace with your actual module path

	"github.com/gin-gonic/gin"
)

func QuestionRoutes(route *gin.RouterGroup) {
	route.POST("/question", controllers.CreateQuestion())
	route.GET("/questions", controllers.GetQuestions())
	route.GET("/questions/:question_id", controllers.GetQuestionByID())
	route.GET("/questions/user/:user_id", controllers.GetQuestionsByUser())
	// mainly to upvote
	route.PUT("/questions/:question_id", controllers.UpdateQuestion())
	route.DELETE("/questions/:question_id", controllers.DeleteQuestion())
}

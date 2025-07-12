package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Answer struct {
	ID          primitive.ObjectID `bson:"_id"`
	Question_id primitive.ObjectID `json:"question_id" bson:"question_id"` // Reference to Question
	Content     *string            `json:"content" validate:"required,min=5,max=200"`
	User_id     string             `json:"user_id"`
	Created_at  time.Time          `json:"created_at"`
	Updated_at  time.Time          `json:"updated_at"`
	Upvote      int32              `json:"upvote"`
}

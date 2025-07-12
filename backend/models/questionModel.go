package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Question struct {
	ID          primitive.ObjectID `bson:"_id"`
	Title       *string            `json:"title" validate:"required"`
	Content     *string            `json:"content" validate:"required"`
	User_id     string             `json:"user_id"`
	Created_at  time.Time          `json:"created_at"`
	Updated_at  time.Time          `json:"updated_at"`
	Upvote      int32              `json:"upvote"`
	Tags        []string           `json:"tags" validate:"required"`
	IsPinned    bool               `json:"is_pinned"`
	Question_id string             `json:"question_id"`
	ImageUrl    *string            `json:"image,omitempty"`
}

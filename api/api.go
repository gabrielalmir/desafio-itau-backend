package api

import (
	"github.com/gabrielalmir/desafio-itau-backend/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/estatistica", controllers.GetStatistics)
	r.POST("/transacao", controllers.CreateTransaction)
	r.DELETE("/transacao", controllers.DeleteTransactions)
}

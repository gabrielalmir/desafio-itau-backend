package controllers

import (
	"net/http"

	"github.com/gabrielalmir/desafio-itau-backend/dtos"
	"github.com/gabrielalmir/desafio-itau-backend/services"
	"github.com/gin-gonic/gin"
)

func GetStatistics(c *gin.Context) {
	searchIntervalString := c.DefaultQuery("intervaloBusca", "60")
	searchInterval, err := services.ParseSearchInterval(searchIntervalString)

	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	stats := services.GetStatistics(searchInterval)
	c.JSON(http.StatusOK, stats)
}

func CreateTransaction(c *gin.Context) {
	var transaction dtos.TransactionRequest

	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	if err := services.ValidateTransaction(transaction); err != nil {
		c.Status(http.StatusUnprocessableEntity)
		return
	}

	services.CreateTransaction(transaction)
	c.Status(http.StatusCreated)
}

func DeleteTransactions(c *gin.Context) {
	services.DeleteTransactions()
	c.Status(http.StatusOK)
}

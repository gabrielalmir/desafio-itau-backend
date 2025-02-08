package controllers

import (
	"net/http"

	"github.com/gabrielalmir/desafio-itau-backend/dtos"
	"github.com/gabrielalmir/desafio-itau-backend/services"
	"github.com/gin-gonic/gin"
)

// GetStatistics retorna estatísticas das transações
// @Summary Retorna estatísticas das transações
// @Description Obtém estatísticas das transações dos últimos 60 segundos
// @Produce json
// @Param intervaloBusca query string false "Intervalo de busca em segundos"
// @Success 200 {object} dtos.StatisticsResponse
// @Router /estatistica [get]
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

// CreateTransaction adiciona uma nova transação
// @Summary Cria uma nova transação
// @Description Registra uma transação, validando os critérios necessários
// @Accept json
// @Produce json
// @Param transaction body dtos.TransactionRequest true "Dados da transação"
// @Success 201 ""
// @Router /transacao [post]
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

// DeleteTransactions remove todas as transações
// @Summary Remove todas as transações
// @Description Apaga todas as transações armazenadas
// @Success 200 ""
// @Router /transacao [delete]
func DeleteTransactions(c *gin.Context) {
	services.DeleteTransactions()
	c.Status(http.StatusOK)
}

package services

import (
	"errors"
	"log"
	"time"

	"github.com/gabrielalmir/desafio-itau-backend/dtos"
)

var transactions []dtos.TransactionRequest
var logger = log.New(log.Writer(), "services: ", log.LstdFlags)

func GetStatistics(searchInterval int) dtos.StatisticsResponse {
	logger.Printf("Getting statistics for the last %d seconds\n", searchInterval)

	cutoffTime := time.Now().UTC().Add(-time.Duration(searchInterval) * time.Second)

	var filtered []dtos.TransactionRequest

	logger.Printf("Current time: %s\n", time.Now())
	logger.Printf("Current location: %s\n", time.Now().Location())

	for _, t := range transactions {
		parsedTime, _ := time.Parse(time.RFC3339, t.DataHora)
		logger.Printf("Comparing %s with %s\n", parsedTime, cutoffTime)

		if parsedTime.After(cutoffTime) {
			filtered = append(filtered, t)
		}
	}

	count := len(filtered)
	if count == 0 {
		return dtos.StatisticsResponse{}
	}

	sum := 0.0
	min := filtered[0].Valor
	max := filtered[0].Valor

	for _, t := range filtered {
		sum += t.Valor
		if t.Valor < min {
			min = t.Valor
		}
		if t.Valor > max {
			max = t.Valor
		}
	}

	return dtos.StatisticsResponse{
		Count: count,
		Sum:   sum,
		Avg:   sum / float64(count),
		Min:   min,
		Max:   max,
	}
}

func CreateTransaction(t dtos.TransactionRequest) {
	logger.Printf("Creating transaction: %+v\n", t)
	transactions = append(transactions, t)
}

func DeleteTransactions() {
	logger.Println("Deleting all transactions")
	transactions = nil
}

func ValidateTransaction(t dtos.TransactionRequest) error {
	logger.Printf("Validating transaction: %+v\n", t)
	parsedTime, err := time.Parse(time.RFC3339, t.DataHora)

	if err != nil {
		return errors.New("dataHora inválida")
	}

	if parsedTime.After(time.Now()) {
		return errors.New("dataHora não pode ser no futuro")
	}

	if t.Valor <= 0 {
		return errors.New("valor inválido")
	}

	return nil
}

func ParseSearchInterval(searchInterval string) (int, error) {
	logger.Printf("Parsing search interval: %s\n", searchInterval)
	interval, err := time.ParseDuration(searchInterval + "s")

	if err != nil {
		return 0, err
	}

	return int(interval.Seconds()), nil
}

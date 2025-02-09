package services_test

import (
	"testing"
	"time"

	"github.com/gabrielalmir/desafio-itau-backend/dtos"
	"github.com/gabrielalmir/desafio-itau-backend/services"
)

func TestGetStatistics(t *testing.T) {
	services.DeleteTransactions()

	transactions := []dtos.TransactionRequest{
		{DataHora: time.Now().Add(-10 * time.Second).Format(time.RFC3339), Valor: 100.0},
		{DataHora: time.Now().Add(-20 * time.Second).Format(time.RFC3339), Valor: 200.0},
		{DataHora: time.Now().Add(-30 * time.Second).Format(time.RFC3339), Valor: 300.0},
	}

	for _, tr := range transactions {
		services.CreateTransaction(tr)
	}

	stats := services.GetStatistics(15)
	if stats.Count != 1 {
		t.Errorf("Expected 1 transaction, got %d", stats.Count)
	}
	if stats.Sum != 100.0 {
		t.Errorf("Expected sum 100.0, got %f", stats.Sum)
	}
	if stats.Avg != 100.0 {
		t.Errorf("Expected avg 100.0, got %f", stats.Avg)
	}
	if stats.Min != 100.0 {
		t.Errorf("Expected min 100.0, got %f", stats.Min)
	}
	if stats.Max != 100.0 {
		t.Errorf("Expected max 100.0, got %f", stats.Max)
	}
}

func TestCreateTransaction(t *testing.T) {
	services.DeleteTransactions()

	transaction := dtos.TransactionRequest{
		DataHora: time.Now().Format(time.RFC3339),
		Valor:    150.0,
	}

	services.CreateTransaction(transaction)
	stats := services.GetStatistics(60)

	if stats.Count != 1 {
		t.Errorf("Expected 1 transaction, got %d", stats.Count)
	}
	if stats.Sum != 150.0 {
		t.Errorf("Expected sum 150.0, got %f", stats.Sum)
	}
	if stats.Avg != 150.0 {
		t.Errorf("Expected avg 150.0, got %f", stats.Avg)
	}
	if stats.Min != 150.0 {
		t.Errorf("Expected min 150.0, got %f", stats.Min)
	}
	if stats.Max != 150.0 {
		t.Errorf("Expected max 150.0, got %f", stats.Max)
	}
}

func TestDeleteTransactions(t *testing.T) {
	services.DeleteTransactions()

	transaction := dtos.TransactionRequest{
		DataHora: time.Now().Format(time.RFC3339),
		Valor:    150.0,
	}

	services.CreateTransaction(transaction)
	services.DeleteTransactions()
	stats := services.GetStatistics(60)

	if stats.Count != 0 {
		t.Errorf("Expected 0 transactions, got %d", stats.Count)
	}
}

func TestValidateTransaction(t *testing.T) {
	validTransaction := dtos.TransactionRequest{
		DataHora: time.Now().Format(time.RFC3339),
		Valor:    100.0,
	}

	err := services.ValidateTransaction(validTransaction)
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	invalidTransaction := dtos.TransactionRequest{
		DataHora: time.Now().Add(10 * time.Second).Format(time.RFC3339),
		Valor:    100.0,
	}

	err = services.ValidateTransaction(invalidTransaction)
	if err == nil {
		t.Errorf("Expected error, got nil")
	}

	invalidTransaction = dtos.TransactionRequest{
		DataHora: time.Now().Format(time.RFC3339),
		Valor:    -100.0,
	}

	err = services.ValidateTransaction(invalidTransaction)
	if err == nil {
		t.Errorf("Expected error, got nil")
	}
}

func TestParseSearchInterval(t *testing.T) {
	interval, err := services.ParseSearchInterval("60")
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if interval != 60 {
		t.Errorf("Expected 60, got %d", interval)
	}

	_, err = services.ParseSearchInterval("invalid")
	if err == nil {
		t.Errorf("Expected error, got nil")
	}
}

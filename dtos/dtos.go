package dtos

type TransactionRequest struct {
	TransactionValue float64 `json:"valor"`
	CreatedAt        string  `json:"dataHora"`
}

type StatisticsResponse struct {
	Count int     `json:"count"`
	Sum   float64 `json:"sum"`
	Avg   float64 `json:"avg"`
	Min   float64 `json:"min"`
	Max   float64 `json:"max"`
}

package main

import (
	"log"
	"os"

	"github.com/gabrielalmir/desafio-itau-backend/api"
	"github.com/gin-gonic/gin"

	_ "github.com/gabrielalmir/desafio-itau-backend/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Desafio Itau Backend API
// @version 1.0
// @description API para gerenciamento de transações e estatísticas.
// @host localhost:8080
// @BasePath /
func main() {
	r := gin.Default()
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	api.RegisterRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Listening on port %s\n", port)
	log.Fatalln(r.Run(":" + port))
}

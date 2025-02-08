package main

import (
	"log"
	"os"

	"github.com/gabrielalmir/desafio-itau-backend/api"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	api.RegisterRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Listening on port %s\n", port)
	log.Fatalln(r.Run(":" + port))
}

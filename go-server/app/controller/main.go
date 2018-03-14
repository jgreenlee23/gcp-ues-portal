package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Hero struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type Heroes []Hero

// null function to avoid "not used" error
func Use(vals ...interface{}) {
	for _, val := range vals {
		_ = val
	}
}

func main() {
	//httpOptions: allows CORS
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	// setup a basic router
	router := mux.NewRouter()
	router.HandleFunc("/", Index).Methods("GET")
	router.HandleFunc("/api/heroes", HeroIndex).Methods("GET")
	router.HandleFunc("/api/heroes", HeroCreate).Methods("POST")
	router.HandleFunc("/api/heroes/{HeroId}", HeroShow).Methods("GET")
	// TOOD: add delete handler

	// serve, else log failure
	// log.Fatal(http.ListenAndServe(":8080", router))
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}

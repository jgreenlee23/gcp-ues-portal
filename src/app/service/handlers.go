package main

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func Index(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintln(w, "Welcome!")
}

func HeroIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(heroes); err != nil {
		panic(err)
	}
}

// GET : return JSON object of Hero Type, given index
func HeroShow(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	requestedId, err := strconv.Atoi(vars["HeroId"])
	if err != nil {
		// TODO: error handling
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(RepoFindHero(requestedId)); err != nil {
		panic(err)
	}
}

// POST : create a Hero object and add to Repo
func HeroCreate(w http.ResponseWriter, r *http.Request) {
	var hero Hero
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		panic(err)
	}
	if err := r.Body.Close(); err != nil {
		panic(err)
	}
	if err := json.Unmarshal(body, &hero); err != nil {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(422) // unprocessable entity
		if err := json.NewEncoder(w).Encode(err); err != nil {
			panic(err)
		}
	}

	t := RepoCreateHero(hero)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(t); err != nil {
		panic(err)
	}
}

package main

import "fmt"

var currentId int
var heroes Heroes

// seed data
func init() {
	RepoCreateHero(Hero{Name: "Mr. Nice"})
	RepoCreateHero(Hero{Name: "Narco"})
	RepoCreateHero(Hero{Name: "Bombasto"})
	RepoCreateHero(Hero{Name: "Celeritas"})
	RepoCreateHero(Hero{Name: "Magneta"})
	RepoCreateHero(Hero{Name: "RubberMan"})
	RepoCreateHero(Hero{Name: "Dynama"})
	RepoCreateHero(Hero{Name: "Dr. IQ"})
	RepoCreateHero(Hero{Name: "Magma"})
	RepoCreateHero(Hero{Name: "Tornado"})
}

func RepoFindHero(id int) Hero {
	for _, t := range heroes {
		if t.Id == id {
			return t
		}
	}
	return Hero{}
}

func RepoCreateHero(t Hero) Hero {
	currentId += 1
	t.Id = currentId
	heroes = append(heroes, t)
	return t
}

func RepoDestroyHero(id int) error {
	for i, t := range heroes {
		if t.Id == id {
			heroes = append(heroes[:i], heroes[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Could not find Hero with id of %d to delete", id)
}

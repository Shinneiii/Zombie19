'use strict';
let population = [];

//Permet de reset la population
function resetPopulation() {
    population = [
        {
            name: "garen",
            isInfected: "",
            age: 35,
            isImmuned: false,
            isDead: false,
            friends: [
                {
                    name: "lux",
                    isInfected: "",
                    age: 20,
                    isImmuned: false,
                    isDead: false,
                    friends: []
                },
                {
                    name: "ezreal",
                    isInfected: "",
                    age: 20,
                    isImmuned: false,
                    isDead: false,
                    friends: [
                        {
                            name: "zoe",
                            isInfected: "",
                            age: 15,
                            isImmuned: false,
                            isDead: false,
                            friends: []
                        }
                    ]
                }
            ]
        },
        {
            name: "yasuo",
            isInfected: "",
            age: 40,
            isImmuned: false,
            isDead: false,
            friends: [
                {
                    name: "yone",
                    isInfected: "",
                    age: 45,
                    isImmuned: false,
                    isDead: false,
                    friends: []
                },
                {
                    name: "riven",
                    isInfected: "",
                    age: 23,
                    isImmuned: false,
                    isDead: false,
                    friends: []
                },
                {
                    name: "sett",
                    isInfected: "",
                    age: 50,
                    isImmuned: false,
                    isDead: false,
                    friends: [
                        {
                            name: "gnar",
                            isInfected: "",
                            age: 5,
                            isImmuned: false,
                            isDead: false,
                            friends: []
                        }
                    ]
                }
            ]
        }
    ]
}

//Méthode d'infection pour le variant A
function zombieA(population, age) {
    for (let i = 0; i < population.length; i++) {
        if (population[i].age >= age && !population[i].isImmuned) {
            population[i].isInfected = age > 0 ? "32" : "A";
        }
        zombieA(population[i].friends, age);
    }
}

//Méthode du lancement de l'infection du variant 32
function plague32(population) {
    plagueB(population, 32);
    plagueA(population, 32);
}

//Méthode du lancement de l'infection du variant A
function plagueA(population, age = 0) {
    if (population.filter(p => p.isInfected).length > 0) {
        zombieA(population, age);
    } else {
        for (let i = 0; i < population.length; i++) {
            if (population[i].friends.length > 0) {
                plagueA(population[i].friends, age);
            }
        }
    }
}

//Méthode du lancement de l'infection du variant B
function plagueB(population, age = 0) {
    var res = false;
    for (let i = 0; i < population.length; i++) {
        if (plagueB(population[i].friends, age) || population[i].isInfected == (age > 0 ? "32" : "B")) {
            res = true;
            for (let y = 0; y < population.length; y++) {
                if (population[y].age >= age && !population[i].isImmuned) {
                    population[y].isInfected = age > 0 ? "32" : "B";
                }
            }
        }
    }
    return res;
}

//Méthode du lancement de l'infection du variant C
function plagueC(population) {
    if (population.filter(p => p.isInfected).length > 0) {
        for (let i = 0; i < population.length; i++) {
            if (i % 2 == 0 && !population[i].isImmuned) {
                population[i].isInfected = "C";
            }
        }
    }
    for (let i = 0; i < population.length; i++) {
        plagueC(population[i].friends);
    }
}


//Méthode du lancement de l'infection du variant ultimate
function plagueUtimate(population, isFirst = false) {
    let res = false;
    for (let i = 0; i < population.length; i++) {
        if (plagueUtimate(population[i].friends)) {
            res = true;
            if (isFirst && !population[i].isImmuned) {
                population[i].isInfected = "U";
            }
        }
    }
    return population.filter(p => p.isInfected == "U").length > 0 || res;
}

//Méthode de lancement du vaccin A1
function healA1(population) {
    for (let i = 0; i < population.length; i++) {
        healA1(population[i].friends);
        if (population[i].age <= 30) {
            if(population[i].isInfected == "32" || population[i].isInfected == "A"){
                population[i].isInfected = "";
            }
            population[i].isImmuned = true;
        }
    }
}

//Méthode de lancement du vaccin B1
function healB1(population) {
    for (let i = 0; i < population.length; i++) {
        healB1(population[i].friends);
        if (i % 2 == 0) {
            population[i].isDead = true;
        }else if(population[i].isInfected == "B" || population[i].isInfected == "C"){
            population[i].isInfected = false;
        }
    }
}

//Méthode de lancement du vaccin Utimate
function healUltime(population) {
    for (let i = 0; i < population.length; i++) {
        healUltime(population[i].friends);
        if(population[i].isInfected == "U"){
            population[i].isInfected = "";
            population[i].isImmuned = true;
        }
    }
}

//Tous le jeu de test

resetPopulation();
plagueA(population);
console.log(JSON.stringify(population));

resetPopulation();
plagueB(population);
console.log(JSON.stringify(population));

resetPopulation();
plague32(population);
console.log(JSON.stringify(population));

resetPopulation();
plagueC(population);
console.log(JSON.stringify(population));

resetPopulation();
plagueUtimate(population, true);
console.log(JSON.stringify(population));

resetPopulation();
healA1(population);
console.log(JSON.stringify(population));

resetPopulation();
healB1(population);
console.log(JSON.stringify(population));

resetPopulation();
healUltime(population);
console.log(JSON.stringify(population));
const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    mealName: {
        type: String,
        required: true
    },
    mealDescription: {
        type: String,
        required: true, 
    },
    mealTime: {
        type: String,
        required: true,
    },
    mealCalories: {
        type: String,
        required: true,
    },
    mealProteins:{
        type: String,
        required: true,
    },
    mealCarbs:{
        type: String,
        required: true,
    },
    mealImage: {
        type: String,
        required: true,
    },
})

const Meal = mongoose.model('meals', mealSchema)
module.exports= Meal;

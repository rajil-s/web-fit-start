const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true
    },
    exerciseTime: {
        type: String,
        required: true,
    },
    exerciseCalories: {
        type: String,
        required: true,
    },
    exerciseLevel: {
        type: String,
        required: true,
    },
    exerciseReps:{
        type: String,
        required: true,
    },
    exerciseSets:{
        type: String,
        required: true,
    },
    exerciseDescription: {
        type: String,
        required: true,
    },
    exerciseInstruction: {
        type: String,
        required: true,
    },
    exerciseThumbnail: {
        type: String,
        required: true,
    },
    exerciseVideo: {
        type: String,
        required: true,
    },
})

const Exercise = mongoose.model('exercises', exerciseSchema)
module.exports= Exercise;


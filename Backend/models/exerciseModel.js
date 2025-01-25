const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true,
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
    exerciseReps: {
        type: String,
        required: true,
    },
    exerciseSets: {
        type: String,
        required: true,
    },
    exerciseDescription: {
        type: String,
        required: true,
    },
    exerciseVideo: {
        type: String,
        required: true,
        // validate: {
        //     validator: function (v) {
        //         const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        //         return youtubeRegex.test(v); // Validate YouTube URL format
        //     },
        //     message: props => `${props.value} is not a valid YouTube URL!`,
        // },
    },
});

const Exercise = mongoose.model('exercises', exerciseSchema);
module.exports = Exercise;

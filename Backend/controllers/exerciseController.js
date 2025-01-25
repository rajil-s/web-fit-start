const Exercise = require('../models/exerciseModel');

const createExercise = async (req, res) => {
    console.log(req.body);
    const {
        exerciseName,
        exerciseTime,
        exerciseCalories,
        exerciseLevel,
        exerciseReps,
        exerciseSets,
        exerciseDescription,
        exerciseVideo, // Now expects a YouTube URL
    } = req.body;

    if (
        !exerciseName ||
        !exerciseTime ||
        !exerciseCalories ||
        !exerciseLevel ||
        !exerciseReps ||
        !exerciseSets ||
        !exerciseDescription ||
        !exerciseVideo
    ) {
        return res.status(400).json({
            success: false,
            message: "Please enter all the fields, including a valid YouTube URL",
        });
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(exerciseVideo)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid YouTube URL",
        });
    }

    try {
        // Save to database
        const newExercise = new Exercise({
            exerciseName,
            exerciseCalories,
            exerciseTime,
            exerciseLevel,
            exerciseReps,
            exerciseSets,
            exerciseDescription,
            exerciseVideo, // Save the YouTube URL directly
        });
        const exercise = await newExercise.save();
        res.status(201).json({
            success: true,
            message: "Exercise created successfully",
            data: exercise,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
};

// Fetch all exercises
const getAllExercises = async (req, res) => {
    try {
        const allExercises = await Exercise.find({});
        res.status(200).json({
            success: true,
            message: "All exercises fetched successfully",
            data: allExercises,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
};

// Fetch single exercise
const getSingleExercise = async (req, res) => {
    const exerciseId = req.params.id;
    try {
        const singleExercise = await Exercise.findById(exerciseId);
        if (!singleExercise) {
            return res.status(400).json({
                success: false,
                message: "Exercise not found",
            });
        }

        res.status(201).json({
            success: true,
            message: "Exercise fetched successfully",
            data: singleExercise,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
};

// Delete exercise
const deleteExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        res.status(201).json({
            success: true,
            message: "Exercise deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
};

const updateExercise = async (req, res) => {
    try {
        const { exerciseVideo } = req.body;

        // Validate YouTube URL if provided
        if (exerciseVideo) {
            const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
            if (!youtubeRegex.test(exerciseVideo)) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide a valid YouTube URL",
                });
            }
        }

        const updatedExercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Exercise updated successfully!",
            product: updatedExercise,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error,
        });
    }
};

const paginationExercises = async (req, res) => {
    const pageNo = parseInt(req.query.page) || 1; // Parse page number as an integer
    const resultPerPage = 4; // Number of results per page

    try {
        const totalExercises = await Exercise.countDocuments(); // Get the total number of exercises
        const allExercises = await Exercise.find({})
            .skip((pageNo - 1) * resultPerPage)
            .limit(resultPerPage);

        if (allExercises.length === 0 && pageNo !== 1) {
            return res.status(400).json({
                success: false,
                message: "No exercises found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Exercises fetched successfully",
            data: allExercises,
            pagination: {
                totalExercises: totalExercises,
                currentPage: pageNo,
                totalPages: Math.ceil(totalExercises / resultPerPage),
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
};

const searchExercise = async (req, res) => {
    const searchQuery = req.query.search || '';

    try {
        const filter = {};

        if (searchQuery) {
            filter.exerciseName = {
                $regex: searchQuery,
                $options: 'i'
            };
        }
        const exercises = await Exercise.find(filter);
        res.status(201).json({
            success: true,
            message: "Exercises fetched successfully",
            data: exercises
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
};

module.exports = {
    createExercise,
    getAllExercises,
    getSingleExercise,
    updateExercise,
    deleteExercise,
    paginationExercises,
    searchExercise,
};

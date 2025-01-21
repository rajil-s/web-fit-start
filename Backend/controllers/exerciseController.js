const Exercise = require('../models/exerciseModel');
const path = require('path');
const fs = require('fs');

const createExercise = async (req, res) => {
    console.log(req.body);
    const { exerciseName, exerciseTime, exerciseCalories, exerciseLevel, exerciseReps, exerciseSets, exerciseDescription} = req.body;

    if (!exerciseName || !exerciseTime || !exerciseCalories || !exerciseLevel || !exerciseReps || !exerciseSets || !exerciseDescription) {
        return res.status(400).json({
            "success": false,
            "message": "Please enter all the fields"
        });
    }

    // validate if there is video
    if (!req.files || !req.files.exerciseVideo) {
        return res.status(400).json({
            "success": false,
            "message": "Please upload a video!!"
        });
    }

    // validate if there is a thumbnail
    if (!req.files || !req.files.exerciseThumbnail) {
        return res.status(400).json({
            "success": false,
            "message": "Please upload a thumbnail!!"
        });
    }

    // validate if there is an instruction
    if (!req.files || !req.files.exerciseInstruction) {
        return res.status(400).json({
            "success": false,
            "message": "Please upload an instruction!!"
        });
    }

    const { exerciseVideo, exerciseThumbnail, exerciseInstruction } = req.files;

    // upload video
    // 1. Generate new video name
    const videoName = `${Date.now()}-${exerciseVideo.name}`;
    // 2. Make an upload path (/path/upload - directory)
    const videoUploadPath = path.join(__dirname, `../public/products/${videoName}`);

    let thumbnailName = null;
    if (exerciseThumbnail) {
        // upload thumbnail
        // 1. Generate new thumbnail name
        thumbnailName = `${Date.now()}-${exerciseThumbnail.name}`;
        // 2. Make an upload path (/path/upload - directory)
        const thumbnailUploadPath = path.join(__dirname, `../public/products/${thumbnailName}`);
        // 3. Move to that directory (await, try-catch)
        await exerciseThumbnail.mv(thumbnailUploadPath);
    }

    let instructionName = null;
    if (exerciseInstruction) {
        instructionName = `${Date.now()}-${exerciseInstruction.name}`;
        // 2. Make an upload path (/path/upload - directory)
        const instructionUploadPath = path.join(__dirname, `../public/products/${instructionName}`);
        // 3. Move to that directory (await, try-catch)
        await exerciseInstruction.mv(instructionUploadPath);
    }

    try {
        await exerciseVideo.mv(videoUploadPath);

        // Save to database
        const newExercise = new Exercise({
            exerciseName,
            exerciseCalories,
            exerciseTime,
            exerciseLevel,
            exerciseReps,
            exerciseSets,
            exerciseDescription,
            exerciseInstruction: instructionName,
            exerciseVideo: videoName,
            exerciseThumbnail: thumbnailName
        });
        const exercise = await newExercise.save();
        res.status(201).json({
            "success": true,
            "message": "Exercise created successfully",
            "data": exercise
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        });
    }
};

// Fetch all exercises
const getAllExercises = async (req, res) => {
    try {
        const allExercises = await Exercise.find({});
        res.status(200).json({
            "success": true,
            "message": "All exercises fetched successfully",
            "data": allExercises
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
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
                "success": false,
                "message": "Exercise not found"
            });
        }

        res.status(201).json({
            "success": true,
            "message": "Exercise fetched successfully",
            "data": singleExercise
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        });
    }
};

// Delete exercise
const deleteExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        if (exercise.exerciseVideo) {
            const videoPath = path.join(__dirname, `../public/products/${exercise.exerciseVideo}`);
            fs.unlinkSync(videoPath);
        }
        if (exercise.exerciseThumbnail) {
            const thumbnailPath = path.join(__dirname, `../public/products/${exercise.exerciseThumbnail}`);
            fs.unlinkSync(thumbnailPath);
        }
        if (exercise.exerciseInstruction) {
            const instructionPath = path.join(__dirname, `../public/products/${exercise.exerciseInstruction}`);
            fs.unlinkSync(instructionPath);
        }
        res.status(201).json({
            "success": true,
            "message": "Exercise deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        });
    }
};

const updateExercise = async (req, res) => {
    try {
        // if there is video
        if (req.files && req.files.exerciseVideo) {
            const { exerciseVideo } = req.files;
            const videoName = `${Date.now()}-${exerciseVideo.name}`;
            const videoUploadPath = path.join(__dirname, `../public/products/${videoName}`);
            await exerciseVideo.mv(videoUploadPath);
            req.body.exerciseVideo = videoName;

            if (req.body.exerciseVideo) {
                const existingExercise = await Exercise.findById(req.params.id);
                const oldVideoPath = path.join(__dirname, `../public/products/${existingExercise.exerciseVideo}`);
                fs.unlinkSync(oldVideoPath);
            }
        }

        // if there is thumbnail
        if (req.files && req.files.exerciseThumbnail) {
            const { exerciseThumbnail } = req.files;
            const thumbnailName = `${Date.now()}-${exerciseThumbnail.name}`;
            const thumbnailUploadPath = path.join(__dirname, `../public/products/${thumbnailName}`);
            await exerciseThumbnail.mv(thumbnailUploadPath);
            req.body.exerciseThumbnail = thumbnailName;

            if (req.body.exerciseThumbnail) {
                const existingExercise = await Exercise.findById(req.params.id);
                const oldThumbnailPath = path.join(__dirname, `../public/products/${existingExercise.exerciseThumbnail}`);
                fs.unlinkSync(oldThumbnailPath);
            }
        }

        // if there is instruction
        if (req.files && req.files.exerciseInstruction) {
            const { exerciseInstruction } = req.files;
            const instructionName = `${Date.now()}-${exerciseInstruction.name}`;
            const instructionUploadPath = path.join(__dirname, `../public/products/${instructionName}`);
            await exerciseInstruction.mv(instructionUploadPath);
            req.body.exerciseInstruction = instructionName;

            if (req.body.exerciseInstruction) {
                const existingExercise = await Exercise.findById(req.params.id);
                const oldInstructionPath = path.join(__dirname, `../public/products/${existingExercise.exerciseInstruction}`);
                fs.unlinkSync(oldInstructionPath);
            }
        }

        const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({
            success: true,
            message: "Exercise updated!",
            product: updatedExercise
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error
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

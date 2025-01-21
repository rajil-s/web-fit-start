const path = require('path');
const fs = require('fs');
const Meal = require('../models/mealModel');

const createMeal = async (req, res) => {    
    console.log(req.body);
    const {mealName, mealDescription, mealTime, mealCalories, mealProteins, mealCarbs} = req.body;

    if (!mealName || !mealDescription || !mealTime || !mealCalories || !mealProteins || !mealCarbs){
        return res.status(400).json({
            "success": false,
            "message": "Please enter all the fields"
        });
    }

    if (!req.files || !req.files.mealImage) {
        return res.status(400).json({
            "success": false,
            "message": "Please upload an image!!"
        });
    }

    const {mealImage} = req.files;

    const imageName = `${Date.now()}-${mealImage.name}`

    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`);

    try {
        await mealImage.mv(imageUploadPath)

        const newMeal = new Meal({
            mealName: mealName,
            mealDescription: mealDescription,
            mealCalories: mealCalories,
            mealProteins: mealProteins,
            mealCarbs: mealCarbs,
            mealTime: mealTime,
            mealImage: imageName
        })
        const meal = await newMeal.save()
        res.status(201).json({
            "success": true,
            "message": "Meal plan created successfully",
            "data": meal
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
}

const getAllMeals = async (req, res) => {
    try {
        const allMeals = await Meal.find({})
        res.status(200).json({
            "success": true,
            "message": "All meals fetched successfully",
            "data": allMeals
        })
    } catch (error) {
            console.log(error)
            res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
}

const getSingleMeal = async (req, res) => {
    const mealId = req.params.id;
    try {
        const singleMeal = await Meal.findById(mealId)
        if (!singleMeal) {
            return res.status(400).json({
                "success": false,
                "message": "Meal not found"
            })
        }

        res.status(201).json({
            "success": true,
            "message": "Meal fetched successfully",
            "data": singleMeal
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
}

const deleteMeal = async (req, res) => {
    try {
        await Meal.findByIdAndDelete(req.params.id)
        res.status(201).json({
            "success": true,
            "message": "Meal deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
}

const updateMeal = async (req, res) => {
    try {
        if (req.files && req.files.mealImage) {
            const { mealImage } = req.files;

            const imageName = `${Date.now()}-${mealImage.name}`

            const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)

            await mealImage.mv(imageUploadPath)

            req.body.mealImage = imageName; 

            if(req.body.mealImage){
                const existingMeal = await Meal.findById(req.params.id)
                const oldImagepath = path.join(__dirname, `../public/products/${existingMeal.mealImage}`)

                fs.unlinkSync(oldImagepath)
            }
        }
        
        const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            success : true,
            message : "Product updated!",
            product :  updatedMeal
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error
        })
    }
}

const paginationMeals = async (req, res) => {
    const pageNo = parseInt(req.query.page) || 1; 
    const resultPerPage = 4; 

    try {
        const totalMeals = await Meal.countDocuments(); 
        const allMeals = await Meal.find({})
            .skip((pageNo - 1) * resultPerPage)
            .limit(resultPerPage);

        // Check if the page number is valid
        if (allMeals.length === 0 && pageNo !== 1) {
            return res.status(400).json({
                success: false,
                message: "No meals found",
            });
        }

        // Send response with pagination data
        res.status(200).json({
            success: true,
            message: "Meals fetched successfully",
            data: allMeals,
            pagination: {
                totalMeals: totalMeals,
                currentPage: pageNo,
                totalPages: Math.ceil(totalMeals / resultPerPage),
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

//Searching Meal
const searchMeal = async (req, res) => {
    const searchQuery = req.query.search || '';
    
    try {
        const filter = {};

        if (searchQuery) {
            filter.mealName = {
                $regex: searchQuery,
                $options: 'i'
            };
        }
        const meals = await Meal.find(filter);
        res.status(201).json({
            success: true,
            message: "Meals fetched successfully",
            data: meals
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
}



module.exports = {
    createMeal,
    getAllMeals,
    getSingleMeal,
    deleteMeal,
    updateMeal,
    paginationMeals,
    searchMeal
}
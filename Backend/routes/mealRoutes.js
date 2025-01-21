const router = require("./exerciseRoutes");
const mealController = require("../controllers/mealController");
const { adminGuard, authGuard } = require("../middleware/authGuard");

//POST request to create meal
router.post('/create_meal', mealController.createMeal);

//GET request to fetch all meals
router.get('/get_all_meals', authGuard, mealController.getAllMeals);

//GET request to fetch single meal
router.get('/get_meal/:id', authGuard, mealController.getSingleMeal);

//PUT request to update meal
router.put('/update_meal/:id', mealController.updateMeal);

//DELETE request to delete meal
router.delete('/delete_meal/:id', mealController.deleteMeal);

//Pagination
router.get('/pagination_meal', mealController.paginationMeals);

//Search
router.get('/search_meal', mealController.searchMeal);

module.exports = router;
import { render, screen, waitFor } from "@testing-library/react";
import Homepage from "./Homepage";
import { getAllExercises } from "../../apis/Api";
import { BrowserRouter } from "react-router-dom";
import exerciseMockData from "../../__mock__/exerciseMockData";
import mealMockData from "../../__mock__/mealMockData";

//Mocking the API js
jest.mock("../../apis/Api");

//Test Case
describe('Testing Homepage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    //Test 1
    it('should display all exercises in homepage', async () => {
        const mock_exercise = exerciseMockData;
        getAllExercises.mockResolvedValue({
            data: {
                products: mock_exercise
            }
        });

        render(
            <BrowserRouter>
                <Homepage />
            </BrowserRouter>
        )

        //configured

        waitFor(() => {
            mock_exercise.forEach((exercise) => {
                expect(screen.getByText(exercise.exerciseName)).toBeInTheDocument();
            })
        })
    })

    //Test 2
    it('should display all meals in homepage', async () => {
        const mock_meal = mealMockData;
        getAllExercises.mockResolvedValue({
            data: {
                products: mock_meal
            }
        });

        render(
            <BrowserRouter>
                <Homepage />
            </BrowserRouter>
        )

        //configured

        waitFor(() => {
            mock_meal.forEach((meal) => {
                expect(screen.getByText(meal.mealName)).toBeInTheDocument();
            })
        })
    })


})


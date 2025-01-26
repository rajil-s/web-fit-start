import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MealUser from './MealUser';
import { getAllMeals } from '../../../apis/Api';
import '@testing-library/jest-dom/extend-expect';
import mealMockData from '../../../__mock__/mealMockData';

jest.mock('../../../apis/Api', () => ({
    getAllMeals: jest.fn(),
}));

describe('MealUser Component', () => {
    beforeEach(() => {
        getAllMeals.mockResolvedValue({
            data: mealMockData
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component and displays meals', async () => {
        render(<MealUser />);

        await waitFor(() => {
            mealMockData.data.forEach(meal => {
                expect(screen.getByText(meal.mealName)).toBeInTheDocument();
            });
        });
    });

    test('filters meals based on search query', async () => {
        render(<MealUser />);

        await waitFor(() => {
            expect(screen.getByText('Garlic Chicken')).toBeInTheDocument();
            expect(screen.getByText('Quinoa Salad')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText('Search meals'), {
            target: { value: 'Garlic' },
        });

        await waitFor(() => {
            expect(screen.getByText('Garlic Chicken')).toBeInTheDocument();
            expect(screen.queryByText('Quinoa Salad')).not.toBeInTheDocument();
        });
    });

    test('displays no meals when search query does not match', async () => {
        render(<MealUser />);

        fireEvent.change(screen.getByPlaceholderText('Search meals'), {
            target: { value: 'Non-Existent Meal' },
        });

        await waitFor(() => {
            mealMockData.data.forEach(meal => {
                expect(screen.queryByText(meal.mealName)).not.toBeInTheDocument();
            });
        });
    });

    test('displays an error message if fetching meals fails', async () => {
        getAllMeals.mockRejectedValue(new Error('Failed to fetch meals'));

        render(<MealUser />);

        await waitFor(() => {
            expect(screen.queryByText('Failed to fetch meals')).toBeInTheDocument();
        });
    });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../Utils/AxiosInstance';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('../Utils/AxiosInstance');

const mockMovies = [
    { id: 1, tittle: 'Movie One', cast: 'Actor A', crew: 'Director A', duration: '2h', language: 'English', poster: 'poster1.jpg', modify: '' },
    { id: 2, tittle: 'Movie Two', cast: 'Actor B', crew: 'Director B', duration: '2h', language: 'Hindi', poster: 'poster2.jpg', modify: '' }
];

describe('SearchBar Component', () => {
    it('renders input field correctly', () => {
        render(
            <BrowserRouter>
                <SearchBar />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText('Search for movies...')).toBeInTheDocument();
    });

    it('fetches and displays search results', async () => {
        (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { data: mockMovies } });
        render(
            <BrowserRouter>
                <SearchBar />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText('Search for movies...');
        fireEvent.change(input, { target: { value: 'Movie' } });

        await waitFor(() => expect(screen.getByText('Movie One (English)')).toBeInTheDocument());
        expect(screen.getByText('Movie Two (Hindi)')).toBeInTheDocument();
    });

    it('navigates to movie details when a suggestion is clicked', async () => {

        (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { data: mockMovies } });
        render(
            <BrowserRouter>
                <SearchBar />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText('Search for movies...');
        fireEvent.change(input, { target: { value: 'Movie One' } });

        await waitFor(() => expect(screen.getByText('Movie One (English)')).toBeInTheDocument());
        fireEvent.click(screen.getByText('Movie One (English)'));

        expect(mockNavigate).toHaveBeenCalledWith('/view/1');
    });

    it('clears suggestions when input is empty', async () => {
        (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { data: mockMovies } });
        render(
            <BrowserRouter>
                <SearchBar />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText('Search for movies...');
        fireEvent.change(input, { target: { value: 'Movie' } });

        await waitFor(() => expect(screen.getByText('Movie One (English)')).toBeInTheDocument());
        fireEvent.change(input, { target: { value: '' } });

        await waitFor(() => expect(screen.queryByText('Movie One (English)')).not.toBeInTheDocument());
    });
});

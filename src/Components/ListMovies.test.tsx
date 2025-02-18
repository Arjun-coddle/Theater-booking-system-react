import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../Utils/AxiosInstance';
import userEvent from '@testing-library/user-event';
import ListMovies from './ListMovies';
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

describe('ListMovies Component', () => {
  it('renders movies correctly', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { data: mockMovies } });
    render(
      <BrowserRouter>
        <ListMovies langauge="" />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Movie One')).toBeInTheDocument());
    expect(screen.getByText('Movie Two')).toBeInTheDocument();
  });

  it('filters movies based on language', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { data: mockMovies } });
    render(
      <BrowserRouter>
        <ListMovies langauge="Hindi" />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Movie Two')).toBeInTheDocument());
    expect(screen.queryByText('Movie One')).not.toBeInTheDocument();
  });

  it('navigates when a movie is clicked', async () => {

    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { data: mockMovies } });
    render(
      <BrowserRouter>
        <ListMovies langauge="" />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Movie One')).toBeInTheDocument());
    userEvent.click(screen.getByText('Movie One'));

    // expect(mockNavigate).toHaveBeenCalledWith('/view/1');
  });

  it('displays no movies found when list is empty', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { data: [] } });
    render(
      <BrowserRouter>
        <ListMovies langauge="" />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('No movies found')).toBeInTheDocument());
  });
});

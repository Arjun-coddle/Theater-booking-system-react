import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../Utils/AxiosInstance';
import ViewMovieDeatiles from '../Pages/ViewMovieDeatiles';
import { act } from 'react-dom/test-utils';
jest.mock('../Utils/AxiosInstance');
import '@testing-library/jest-dom';

describe('ViewMovieDeatiles Component', () => {
  const mockMovie = {
    id: 1,
    tittle: 'Inception',
    cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
    crew: 'Christopher Nolan',
    duration: '2h 28m',
    language: 'English',
    poster: 'https://example.com/inception.jpg',
    modify: 'N/A'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders movie details correctly', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { data: mockMovie } });

    await act(async () => {
      render(
        <BrowserRouter>
          <ViewMovieDeatiles />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(mockMovie.tittle)).toBeInTheDocument();
      expect(screen.getByText(`Duration: ${mockMovie.duration}`)).toBeInTheDocument();
      expect(screen.getByText(mockMovie.language)).toBeInTheDocument();
      expect(screen.getByText(/Cast:/)).toBeInTheDocument();
      expect(screen.getByText(/Crew:/)).toBeInTheDocument();
    });
  });

  test('displays error when API call fails', async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await act(async () => {
      render(
        <BrowserRouter>
          <ViewMovieDeatiles />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText(mockMovie.tittle)).not.toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SlideShow from './SlideShow';
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe('SlideShow Component', () => {
  it('renders slideshow with initial image', () => {
    render(<SlideShow />);
    expect(screen.getByAltText('Slideing images')).toBeInTheDocument();
  });

  it('automatically changes slides every 3 seconds', () => {
    render(<SlideShow />);
    const img = screen.getByAltText('Slideing images');

    expect(img).toHaveAttribute('src', expect.stringContaining('How-to-Link-Credit-Card-to-UPI.png'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(img).toHaveAttribute('src', expect.stringContaining('cinema-advertising-2-20230804152852.webp'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(img).toHaveAttribute('src', expect.stringContaining('How-to-Find-UPI-ID-in-Payment-Apps.png'));
  });

  it('navigates to the previous slide when prev button is clicked', () => {
    render(<SlideShow />);
    const img = screen.getByAltText('Slideing images');
    const prevButton = screen.getByText('◀');

    fireEvent.click(prevButton);
    expect(img).toHaveAttribute('src', expect.stringContaining('How-to-Find-UPI-ID-in-Payment-Apps.png'));
  });

  it('navigates to the next slide when next button is clicked', () => {
    render(<SlideShow />);
    const img = screen.getByAltText('Slideing images');
    const nextButton = screen.getByText('▶');

    fireEvent.click(nextButton);
    expect(img).toHaveAttribute('src', expect.stringContaining('cinema-advertising-2-20230804152852.webp'));
  });
});
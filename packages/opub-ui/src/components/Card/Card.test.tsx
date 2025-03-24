import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { Color } from '../../types/icon';
import Card from './Card';

describe('Card Component', () => {
  const mockProps = {
    imageUrl: 'https://example.com/image.jpg',
    tag: ['Use Case'],
    title: 'Sample Title',
    description:
      'This is a sample description that exceeds 100 characters. It is used to test the see more and see less functionality of the Card component.',

    variation: 'Collapsed' as 'Collapsed',
    iconColor: 'warning' as Color,
  };

  test('renders correctly with given props', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText('Sample Title')).toBeInTheDocument();

    expect(screen.getByText('Use Case')).toBeInTheDocument();
  });

  test('truncates description and toggles see more/see less', () => {
    render(<Card {...mockProps} />);

    expect(
      screen.getByText(
        /This is a sample description that exceeds 100 characters/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText('See More')).toBeInTheDocument();

    fireEvent.click(screen.getByText('See More'));

    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText('See Less')).toBeInTheDocument();

    fireEvent.click(screen.getByText('See Less'));

    expect(
      screen.getByText(
        /This is a sample description that exceeds 100 characters/i
      )
    ).toBeInTheDocument();
  });
});

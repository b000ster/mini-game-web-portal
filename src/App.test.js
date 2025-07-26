import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mini-Game Portal title', () => {
  render(<App />);
  const titleElement = screen.getByText(/mini-game portal/i);
  expect(titleElement).toBeInTheDocument();
});

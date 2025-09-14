import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FAQ from '../FAQ';

describe('FAQ Component', () => {
  const mockFAQItems = [
    {
      question: 'Test question 1?',
      answer: 'Test answer 1'
    },
    {
      question: 'Test question 2?',
      answer: 'Test answer 2'
    }
  ];

  it('renders FAQ items correctly', () => {
    render(<FAQ items={mockFAQItems} />);
    
    expect(screen.getByText('Test question 1?')).toBeInTheDocument();
    expect(screen.getByText('Test question 2?')).toBeInTheDocument();
  });

  it('toggles FAQ item when clicked', () => {
    render(<FAQ items={mockFAQItems} />);
    
    const firstButton = screen.getByRole('button', { name: /Test question 1\?/ });
    
    // Initially closed
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Test answer 1')).toBeVisible();
    
    // Click to close
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles keyboard navigation', () => {
    render(<FAQ items={mockFAQItems} />);
    
    const firstButton = screen.getByRole('button', { name: /Test question 1\?/ });
    
    // Test Enter key
    fireEvent.keyDown(firstButton, { key: 'Enter' });
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    
    // Test Space key
    fireEvent.keyDown(firstButton, { key: ' ' });
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('has proper ARIA attributes', () => {
    render(<FAQ items={mockFAQItems} />);
    
    const firstButton = screen.getByRole('button', { name: /Test question 1\?/ });
    const panels = screen.getAllByRole('region');
    const firstPanel = panels[0];
    
    expect(firstButton).toHaveAttribute('aria-controls');
    expect(firstPanel).toHaveAttribute('aria-labelledby');
    expect(firstButton.getAttribute('aria-controls')).toBe(firstPanel.getAttribute('id'));
    expect(firstPanel.getAttribute('aria-labelledby')).toBe(firstButton.getAttribute('id'));
  });

  it('uses default FAQ items when none provided', () => {
    render(<FAQ />);
    
    // Should render the default FAQ items
    expect(screen.getByText(/How quickly can you start working/)).toBeInTheDocument();
    expect(screen.getByText(/Do you work with startups/)).toBeInTheDocument();
  });
});
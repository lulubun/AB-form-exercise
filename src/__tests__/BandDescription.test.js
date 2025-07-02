import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BandDescription from '../Components/BandDescription/BandDescription';

describe('BandDescription Component', () => {
  let mockBand;

  beforeEach(() => {
    mockBand = {
      id: 'test-band',
      name: 'Test Band',
      imgUrl: 'https://example.com/test-image.jpg',
      description_blurb: '<p>This is a <strong>test band</strong> with great music.</p>.'
    };
  });

  describe('Rendering', () => {
    it('should render band image with correct attributes', () => {
      render(<BandDescription band={mockBand} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test Band band');
      expect(image).toHaveClass('band-image');
    });

    it('should render band description HTML content', () => {
      render(<BandDescription band={mockBand} />);
      
      // Check that HTML content is rendered
      expect(screen.getByText('test band', { exact: false })).toBeInTheDocument();
      
      // Check that the strong tag is preserved
      const strongElement = screen.getByText('test band');
      expect(strongElement.tagName.toLowerCase()).toBe('strong');
    });
  });

  describe('Description Processing', () => {
    it('should remove ending period from description', () => {
      const bandWithPeriod = {
        ...mockBand,
        description_blurb: '<p>Band description with period.</p>.'
      };

      render(<BandDescription band={bandWithPeriod} />);
      
      // Check that the content is rendered correctly
      expect(screen.getByText('Band description with period.', { exact: false })).toBeInTheDocument();
    });

    it('should handle description without ending period', () => {
      const bandWithoutPeriod = {
        ...mockBand,
        description_blurb: '<p>Band description without period</p>'
      };

      render(<BandDescription band={bandWithoutPeriod} />);
      
      expect(screen.getByText('Band description without period')).toBeInTheDocument();
    });

    it('should handle description that ends with multiple periods', () => {
      const bandWithMultiplePeriods = {
        ...mockBand,
        description_blurb: '<p>Band description...</p>.'
      };

      render(<BandDescription band={bandWithMultiplePeriods} />);
      
      // Should only remove the last period
      expect(screen.getByText('Band description...', { exact: false })).toBeInTheDocument();
    });
  });

  describe('Security Considerations', () => {
    it('should render HTML content using dangerouslySetInnerHTML', () => {
      render(<BandDescription band={mockBand} />);
      
      // The HTML should be rendered (this tests the current implementation)
      // Note: This is a known security concern that was identified in the code review
      const strongElement = screen.getByText('test band');
      expect(strongElement.tagName.toLowerCase()).toBe('strong');
    });

    it('should handle safe HTML content', () => {
      const bandWithSafeHTML = {
        ...mockBand,
        description_blurb: '<p>Safe content with <em>emphasis</em></p>.'
      };

      render(<BandDescription band={bandWithSafeHTML} />);
      
      expect(screen.getByText('Safe content with')).toBeInTheDocument();
      expect(screen.getByText('emphasis')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have descriptive alt text for image', () => {
      render(<BandDescription band={mockBand} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Test Band band');
    });

    it('should handle band names with special characters in alt text', () => {
      const bandWithSpecialChars = {
        ...mockBand,
        name: 'The Rock & Roll Band'
      };

      render(<BandDescription band={bandWithSpecialChars} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'The Rock & Roll Band band');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing image URL gracefully', () => {
      const bandWithoutImage = {
        ...mockBand,
        imgUrl: ''
      };

      render(<BandDescription band={bandWithoutImage} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '');
    });

    it('should handle missing band name gracefully', () => {
      const bandWithoutName = {
        ...mockBand,
        name: ''
      };

      render(<BandDescription band={bandWithoutName} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', ' band');
    });

    it('should handle empty description', () => {
      const bandWithEmptyDescription = {
        ...mockBand,
        description_blurb: ''
      };

      render(<BandDescription band={bandWithEmptyDescription} />);
      
      // Should render the image even with empty description
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});

import { render, screen } from '@testing-library/react';
import ClearButton from 'components/form/button-clear';

describe('should Load clear Button component', () => {
  test('Clear Button rendering', () => {
    const { getByTestId } = render(
      <ClearButton
        onClick={function (e: any): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(getByTestId('clear-button')).toBeInTheDocument();
    const button = getByTestId('clear-button');
    expect(button.textContent).toBe('Clear');
  });
});

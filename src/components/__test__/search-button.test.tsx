import { render, screen } from '@testing-library/react';
import SearchButton from 'components/form/button-search';

describe('should Load search Button component', () => {
  test('Search Button rendering', () => {
    const { getByTestId } = render(
      <SearchButton
        onClick={function (e: any): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(getByTestId('search-button')).toBeInTheDocument();
    const button = getByTestId('search-button');
    expect(button.textContent).toBe('Search');
  });
});

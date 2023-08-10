import { render, screen } from '@testing-library/react';
import FieldText from 'components/form/field-text';

describe('Field Text component', () => {
  test('Field Text rendering', () => {
    const { getByTestId } = render(<FieldText />);
    expect(getByTestId('field-text')).toBeInTheDocument();
  });
});

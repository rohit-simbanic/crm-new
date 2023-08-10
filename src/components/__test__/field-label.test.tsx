import { render, screen } from '@testing-library/react';
import FieldLabel from 'components/form/field-label';

describe('Field label component', () => {
  test('Field Label rendering', () => {
    const { getByTestId } = render(<FieldLabel />);
    expect(getByTestId('field-label')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import Breadcrumbs from 'components/breadcrumbs';
import { BrowserRouter } from 'react-router-dom';

describe('should Load Breadcrumb component', () => {
  test('Breadcrumb rendering', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Breadcrumbs children={undefined} />
      </BrowserRouter>
    );
    expect(getByTestId('breadcrumb')).toBeInTheDocument();
  });
});

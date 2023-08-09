import { render, screen } from '@testing-library/react';
import BreadcrumbItem from 'components/breadcrumbs/item';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

it('should Load Breadcrumb component', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <BreadcrumbItem title={''} />
      </BrowserRouter>
    )
  );

  // Get the home text from breadcrumb
  const title = screen.getByText('Home');
  expect(title).toBeInTheDocument();
});

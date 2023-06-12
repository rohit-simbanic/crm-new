import ProfileCreate from 'features/profile/profile-create';
import ProfilePage from 'pages/profile';

const profileRoutes = {
  path: 'profile',
  element: <ProfilePage />,
  children: [
    {
      path: '',
      element: <ProfileCreate routeTag="profile-edit" />
    }
  ]
};

export default profileRoutes;

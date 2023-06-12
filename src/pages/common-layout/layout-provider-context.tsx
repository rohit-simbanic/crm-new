import React from 'react';

export interface LayoutProviderInterface {
  sideNavMenuItems: {};
  mobileSideNavOpen: boolean;
  mobileTopNavOpen: boolean;
  topBar: React.ReactNode;
  isRecentViewOpen: boolean;
  setSideNavMenuItems: React.Dispatch<React.SetStateAction<{}>>;
  handleMobileSideNav: () => void;
  handleMobileTopNav: () => void;
  toggleRecentView: () => void;
  setTopBar: (value: React.ReactNode) => void;
}

const LayoutProvider = React.createContext<LayoutProviderInterface>({
  sideNavMenuItems: {},
  mobileSideNavOpen: false,
  mobileTopNavOpen: false,
  isRecentViewOpen: false,
  topBar: <></>,
  setSideNavMenuItems: () => ({}),
  handleMobileSideNav: () => ({}),
  handleMobileTopNav: () => ({}),
  toggleRecentView: () => ({}),
  setTopBar: () => ({})
});

export default LayoutProvider;

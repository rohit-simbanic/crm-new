// @ts-nocheck

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TreeView from '@mui/lab/TreeView';
import MenuTreeItem from 'components/side-nav-panel/menu-tree-item';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

const Menu = ({
  items,
  handleCloseUserMenu,
  topMenu,
  short,
  handleMouseEnter
}: any) => {
  const TreeItem = ({ data, index, children, nodeId }: any) => {
    console.log('Menu Rendered');
    return (
      <MenuTreeItem
        nodeId={nodeId}
        labelText={short ? '' : data.label}
        labelIcon={data.labelIcon}
        url={data.url}
        handleCloseUserMenu={handleCloseUserMenu}
        url={data.url !== '' ? data.url : '#'}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </MenuTreeItem>
    );
  };
  if (topMenu === true) {
    return (
      <TreeView
        aria-label="Side-Nav-Menu"
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{
          flexGrow: 1,
          maxWidth: 400,
          overflowY: 'auto',
          maxHeight: '80vh'
        }}
      >
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <TreeItem data={item} key={uuid()} nodeId={`${item.nodeId}`}>
              {item.subMenuItems &&
                item.subMenuItems.length > 0 &&
                item.subMenuItems.map((subItem) => (
                  <TreeItem
                    data={subItem}
                    key={uuid()}
                    nodeId={`${subItem.nodeId}`}
                  />
                ))}
            </TreeItem>
          ))}
      </TreeView>
    );
  } else {
    return (
      <TreeView
        aria-label="Side-Nav-Menu"
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 14 }} />}
        sx={{
          flexGrow: 1,
          maxWidth: short ? 100 : 600,
          margin: '70px auto 0'
        }}
      >
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <TreeItem data={item} key={uuid()} nodeId={`${item.nodeId}`}>
              {item.subMenuItems &&
                item.subMenuItems.length > 0 &&
                item.subMenuItems.map((subItem) => (
                  <TreeItem
                    data={subItem}
                    key={uuid()}
                    nodeId={`${subItem.nodeId}`}
                  />
                ))}
            </TreeItem>
          ))}
      </TreeView>
    );
  }
};

export default Menu;

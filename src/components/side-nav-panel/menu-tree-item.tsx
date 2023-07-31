import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { tokens } from 'theme';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import useColorToken from 'hooks/useColorToken';
import RouteLinkStyled from 'components/link/route-link-styled';

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelText: string;
  handleCloseUserMenu?: any;
  url?: any;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  margin: '0 0px !important',
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    padding: 8,
    flexDirection: 'row-reverse',
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: '4px'
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit'
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: 20
    }
  }
}));

const MenuTreeItem = (props: StyledTreeItemProps) => {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelText,
    url,
    handleCloseUserMenu,
    ...other
  } = props;
  //const { handleMobileSideNav } = useContext(LayoutProvider);
  const Item = () => {
    const colors = useColorToken();

    return (
      <>
        <Box
          component={LabelIcon}
          color="inherit"
          sx={{ mr: 1, fontSize: 'medium' }}
        />
        <Typography
          component={'span'}
          sx={{
            fontWeight: '700',
            flexGrow: 1,
            color: colors.grey[900],
            fontSize: '1rem',
            paddingLeft: 0
          }}
        >
          {labelText}
        </Typography>
      </>
    );
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <StyledTreeItemRoot
      label={
        url !== undefined ? (
          <RouteLinkStyled
            to={url}
            style={{
              color:
                theme.palette.mode === 'dark'
                  ? colors.white[500]
                  : colors.black[500],
              textDecoration: 'none'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 0.5,
                pl: 2,
                pr: 0
              }}
              onClick={handleCloseUserMenu}
            >
              <Item />
            </Box>
          </RouteLinkStyled>
        ) : (
          <Box
            sx={{ display: 'flex', alignItems: 'center', p: 0.5, pl: 2, pr: 0 }}
            style={{
              color:
                theme.palette.mode === 'dark'
                  ? colors.white[500]
                  : colors.black[500]
            }}
          >
            <Item />
          </Box>
        )
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      {...other}
    />
  );
};

export default MenuTreeItem;

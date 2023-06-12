import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import RouteLink from 'components/link/route-link';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { tokens } from 'theme';

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelText: string;
  url?: any;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
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
      backgroundColor: theme.palette.action.hover
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

const StyledTreeItem = (props: StyledTreeItemProps) => {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelText,
    url,
    ...other
  } = props;

  const Item = () => {
    return (
      <>
        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
        <Typography
          component={'span'}
          sx={{ fontWeight: 'inherit', flexGrow: 1 }}
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
          <RouteLink
            url={url}
            style={{
              color:
                theme.palette.mode === 'dark'
                  ? colors.white[500]
                  : colors.black[500],
              textDecoration: 'none'
            }}
            name={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 0.5,
                  pl: 2,
                  pr: 0
                }}
              >
                <Item />
              </Box>
            }
          />
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

export default StyledTreeItem;

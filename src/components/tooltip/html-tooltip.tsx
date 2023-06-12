import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.grey[800],
    maxWidth: '100%',
    border: `1px solid ${theme.palette.background.default}`,
    boxShadow:
      '0px 5px 10px -3px rgb(0 0 0 / 20%), 0px 8px 76px 36px rgb(0 0 0 / 14%), 0px 0 134px 319px rgb(0 0 0 / 12%)'
  }
}));

export default HtmlTooltip;

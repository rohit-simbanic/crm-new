import { Grid, useTheme } from '@mui/material';
import Composer from 'features/email2/composer';
import FormLabel from '@mui/material/FormLabel';
import { tokens } from 'theme';

interface TextUnitInterface {
  grid?: {
    xs: number;
    sm: number;
  };
  value: string;
  onChange: (e: any) => any;
  readOnly?: boolean;
  theme: string;
  label: string;
  height?: string;
  updateQuillRef?: (e: any) => any;
  pt?: number;
  pb?: number;
}

const UnitComposer = (props: TextUnitInterface) => {
  let {
    value,
    onChange,
    grid = { xs: 12, sm: 6 },
    theme = 'bubble',
    readOnly = false,
    label,
    updateQuillRef,
    height,
    pt = 5,
    pb = 5
  } = props;

  const themePalette = useTheme();
  const colors = tokens(themePalette.palette.mode);
  return (
    <Grid item xs={grid.xs} sm={grid.sm} pt={pt} pb={pb}>
      <FormLabel
        style={{
          color: `${colors.grey[400]}`,
          fontWeight: '700'
        }}
      >
        {label}
      </FormLabel>
      <Composer
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        theme={theme}
        height={height}
        updateQuillRef={updateQuillRef}
      />
    </Grid>
  );
};
export default UnitComposer;

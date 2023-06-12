import { Grid, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PrimaryButton from 'components/button/button-primary';

interface ButtonAttachFileInterface {
  grid?: {
    xs: number;
    sm: number;
  };
  multiple?: boolean;
  fileInput: any;
  onChange?: (e: any) => any;
  icon?: boolean;
}

const ButtonAttachFile = ({
  multiple,
  fileInput,
  onChange,
  grid = { xs: 12, sm: 6 },
  icon = true
}: ButtonAttachFileInterface) => {
  return (
    <Grid item xs={grid.xs} sm={grid.sm}>
      {icon ? (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{ ml: '10px' }}
        >
          <input
            hidden
            type="file"
            multiple={multiple}
            ref={fileInput}
            onChange={onChange}
          />
          <AttachFileIcon color="info" fontSize="large" />
        </IconButton>
      ) : (
        <PrimaryButton
          variant="contained"
          onClick={() => fileInput.current?.click()}
          fullWidth
        >
          Select File
          <input
            type="file"
            multiple={true}
            ref={fileInput}
            onChange={onChange}
            hidden
          />
        </PrimaryButton>
      )}
    </Grid>
  );
};

export default ButtonAttachFile;

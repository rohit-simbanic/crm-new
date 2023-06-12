import { Stack, Typography } from '@mui/material';
import upperCaseString from 'helpers/upper-case-string-helper';

interface ModelTitleProps {
  title: string;
}

/** Model Title */
const ModelTitle = (props: ModelTitleProps) => {
  const { title } = props;
  const TITLE = upperCaseString(title);

  return (
    <>
      <Stack direction="row" ml={1} mb={2}>
        <Typography component={'span'} variant="h4" textTransform="capitalize">
          {TITLE}
        </Typography>
      </Stack>
    </>
  );
};

export default ModelTitle;

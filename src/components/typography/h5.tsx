import { Typography } from '@mui/material';

interface H5Props {
  title: string;
  gutterBottom?: boolean;
  className?: string;
}

const H5 = (props: H5Props) => {
  const { gutterBottom, className, title } = props;

  return (
    <>
      <Typography
        component={'span'}
        variant="h5"
        gutterBottom={gutterBottom}
        className={className}
      >
        {title}
      </Typography>
    </>
  );
};

export default H5;

import { Paper, Typography } from '@mui/material';
type HeaderTitleProps = {
  label: string;
  bgcolor?: 'primary' | 'secondary';
  color?: 'primary' | 'secondary';
  variant?: 'h4' | 'h5' | 'h6';
  elevation?: number;
};
const EcosurSectionTitle: React.FC<HeaderTitleProps> = ({
  label,
  bgcolor = 'primary',
  color = 'primary',
  variant = 'h4',
  elevation = 2,
}) => {
  return (
    <Paper
      sx={{
        padding: 1,
        bgcolor: `${bgcolor}.main`,
        color: `${color}.contrastText`,
        borderRadius: 0,
      }}
      elevation={elevation}
    >
      <Typography component="div" variant={variant}>
        {label}
      </Typography>
    </Paper>
  );
};
export default EcosurSectionTitle;

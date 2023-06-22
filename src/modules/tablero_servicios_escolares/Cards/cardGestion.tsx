import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CardGestion = ({ icon, title, details, link }) => {
  return (
    <Card
      sx={{
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        maxWidth: 400,
        minWidth: 300,
      }}
    >
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="div">
          {icon && <span style={{ color: 'rgb(197, 107, 22)'}}>{icon}</span>}
          <div>{title}</div>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ margin: '5px 0px' }}
        >
          {details}
        </Typography>
        {link && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href={link}>
            <a
              style={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: '#00BFA5',
              }}
            >
              Ingresar
              <ArrowForwardIcon style={{ marginLeft: '5px', height: 15 }} />
            </a>
          </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardGestion;

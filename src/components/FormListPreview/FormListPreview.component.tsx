import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Delete, Preview } from '@mui/icons-material';
import { formDetails } from '../../types/form';

type IFormListPreview = {
  loading: boolean,
  onClick: (preview: boolean) => void;
} & formDetails;

export default function FormListPreview({ loading, title, description, field, onClick }: IFormListPreview) {
  return (
    <Card sx={{ width: '100%', m: 2, minWidth: 250 }}>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div" textOverflow={'ellipsis'} noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <span>No. of fields : {field.length}</span>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" onClick={() => onClick(true)}>
          Preview
          <Preview />
        </Button>
        <Button size="small" onClick={() => onClick(false)} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
          <Delete />
        </Button>
      </CardActions>
    </Card>
  );
}
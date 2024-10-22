import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Preview, Save } from '@mui/icons-material';

import { FormField, FormFieldAction } from '../../types/form';

type IFormFieldPreview = {
  handleAction: (action: FormFieldAction, payload?: FormField | FormField[]) => void,
  fields: FormField[],
  loading: boolean
}
export default function FormFieldPreview({ handleAction, fields, loading = false }: IFormFieldPreview) {

  const [draggingItem, updateDraggingItem] = useState<null | FormField>(null);

  const handleDragStart = (_e: React.DragEvent<HTMLDivElement>, item: FormField) => {
    updateDraggingItem(item);
  };

  const handleDragEnd = () => {
    updateDraggingItem(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (_e: React.DragEvent<HTMLDivElement>, targetItem: FormField) => {
    if (!draggingItem) return;
    const updatedList = [...fields];

    const currentIndex = fields.indexOf(draggingItem);
    const targetIndex = fields.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      updatedList.splice(currentIndex, 1);
      updatedList.splice(targetIndex, 0, draggingItem);

      handleAction(FormFieldAction.REORDER_LIST, updatedList);
    }

  };
  return (
    <Box sx={{ flex: 1, padding: '1rem' }}>

      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ textAlign: 'center', fontWeight: "bold", textDecoration: "underline" }}>Selected Form Fields</h4>
        <span>
          <Button variant="outlined"
            disabled={!fields.length || loading}
            onClick={() => handleAction(FormFieldAction.SAVE_FORM)}
            sx={{
              marginRight: '1rem'
            }}
            endIcon={<Save />}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Button variant="outlined"
            disabled={!fields.length}
            onClick={() => handleAction(FormFieldAction.PREVIEW)} endIcon={<Preview />}>
            Preview
          </Button>
        </span>
      </Box>

      <Box sx={{ py: '1rem' }}>
        {
          fields.length > 0 ?
            fields.map(field =>
              <Card sx={{ m: 2, minWidth: 250, width: '100%' }} key={field.uniqId}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, field)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, field)}
              >
                <CardContent id={field.uniqId + 'card-content'} style={{
                  ...(draggingItem?.uniqId === field.uniqId ?
                    {
                      cursor: 'move'
                    } : {})
                }} >
                  <Typography gutterBottom variant="h6" component="div">
                    {field.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Component Type - {field.type}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small" onClick={() => handleAction(FormFieldAction.EDIT, field)}>Edit</Button>
                  <Button size="small" onClick={() => handleAction(FormFieldAction.REMOVE, field)}>Remove</Button>
                </CardActions>
              </Card>
            ) :
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Please add new fields for the form..</Box>
        }
      </Box>
    </Box>





  );
}
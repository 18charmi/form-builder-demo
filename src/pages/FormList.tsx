import Container from '@mui/material/Container';
import FormListPreview from '../components/FormListPreview';
import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteForm, getFormList, updateActionType, updateActiveFormDetail } from '../store/Form.slice';
import { formDetails } from '../types/form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ACTION_TYPES } from '../util/constants';

// Render all the list of created forms
function FormList() {

  const [deleteFormId, updateDeleteFormId] = useState<string | null>(null);
  const list = useAppSelector((state) => state.form.list);
  const loadingPage = useAppSelector((state) => state.form.loadingPage);
  const actionType = useAppSelector((state) => state.form.actionType);
  const dispatch = useAppDispatch();

  // fetch form listing on page load
  useEffect(() => {
    dispatch(getFormList());
  }, []);

  // reset fetching type
  useEffect(() => {
    if ([ACTION_TYPES.DELETE_SUCC].includes(actionType)) {
      dispatch(updateActionType(ACTION_TYPES.NONE));
      updateDeleteFormId(null);
    }
  }, [actionType]);

  function _handleClick(preview: boolean, form: formDetails) {
    if (preview) { dispatch(updateActiveFormDetail(form)) }
    else {
      // console.log({form});
      updateDeleteFormId(form.id);
      dispatch(deleteForm(form.id))
    }
  }

  const renderListing = () => {
    return list.length > 0 ?
      list.map(form => (
        <FormListPreview key={form.id} {...form} onClick={(preview) => _handleClick(preview, form)} loading={[ACTION_TYPES.DELETE_REQ].includes(actionType) && deleteFormId === form.id} />
      )) : <span>Form List is empty....</span>
  }

  return (
    <Container maxWidth="xl" sx={{ p: 5 }}>
      <h2>Form Lists</h2>
      <hr />
      <div style={{ display: 'flex', flexWrap: "wrap" }}>
        {loadingPage ?
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
          </Backdrop> :
          renderListing()}
      </div>
    </Container>

  )
}

export default FormList;
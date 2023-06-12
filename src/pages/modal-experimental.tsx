import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Divider, Paper } from '@mui/material';
import StackRow from 'components/stack/stack-row';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxHeader from 'components/paper-box/paper-box-header';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import SearchButton from 'components/form/button-search';
import ClearButton from 'components/form/button-clear';
import ColumnChooser from 'features/dashboards/column-chooser';
import RefreshButton from 'components/form/button-refresh';
import DASHBOARDS from 'assets/constants/dashboards';

const ModalExperimental: React.FC = () => {
  return (
    <>
      <BasicModal />
    </>
  );
};

const BasicModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Paper
            elevation={3}
            sx={{
              height: '400px',
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 800
            }}
          >
            {/** component start */}
            <PaperBox>
              <PaperBoxHeader value="Fucking Header" />
              <Divider />
              <PaperBoxContent
                sx={{ height: '300px', overflowY: 'auto', p: 2 }}
              >
                <table>
                  <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                  </tr>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                </table>
              </PaperBoxContent>
              <Divider />
              <PaperBoxFooter>
                <StackRow sx={{ pt: 0, pr: 0, pb: 0, pl: 0 }}>
                  <SearchButton onClick={() => {}} />{' '}
                  <ClearButton onClick={() => {}} />
                  {/* <ColumnChooser
                    title="ACCPETED OFFER"
                    category={DASHBOARDS.NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER}
                    subcategory={DASHBOARDS.SELECTED_COLUMNS}
                    dashboard={DASHBOARDS.NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER}
                  /> */}
                  <RefreshButton onClick={() => {}} />
                </StackRow>
              </PaperBoxFooter>
            </PaperBox>
            {/** component end */}
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalExperimental;

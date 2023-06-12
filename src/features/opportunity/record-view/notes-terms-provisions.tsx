import { Box, FormLabel, List, ListItem } from '@mui/material';
import fieldLabel from 'assets/constants/fieldLabel';
import offerGrade from 'assets/constants/offer-grade';
import AddButton from 'components/form/button-add';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import RouteLink from 'components/link/route-link';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React from 'react';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';

interface recordViewType {
  oppurtunity: ObjectType;
  oldOppurtunity: ObjectType;
  validation?: ObjectType;
  changeHandle?: (e: any) => any;
  setField?: (e: any) => any;
  readOnly?: boolean;
  transactionNotes: ObjectType[];
  negotiatorNotes: ObjectType[];
}

const NotesTermsProvisionsRecordView = ({
  oppurtunity,
  oldOppurtunity,
  changeHandle,
  readOnly = false,
  transactionNotes = [],
  negotiatorNotes = []
}: recordViewType) => {
  let handleChange = changeHandle ?? emptyFunction;

  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;

  return (
    <>
      <FormContainer>
        <UnitItem>
          <FormLabel>{fieldLabel.negotiationNotes}:</FormLabel>
          <Box
            sx={{
              width: '100%',
              maxHeight: 350,
              overflowY: 'scroll'
            }}
          >
            <List>
              {negotiatorNotes.map((note: any) => (
                <ListItem
                  key={uuid()}
                  sx={{ padding: '10px' }}
                  component="div"
                  disablePadding
                >
                  {note.name}
                </ListItem>
              ))}
            </List>
          </Box>
          <FormContainer>
            <UnitItem grid={{ xs: 1, sm: 12 }}>
              <RouteLink
                name={<AddButton onClick={emptyFunction} />}
                key={'view'}
                url={`/opportunities/${data.id}/notes_chats/negotiator_notes`}
              />
            </UnitItem>
          </FormContainer>
        </UnitItem>
        <UnitItem>
          <FormLabel>{fieldLabel.transactionNotes}:</FormLabel>
          <Box
            sx={{
              width: '100%',
              maxHeight: 350,
              overflowY: 'scroll'
            }}
          >
            <List>
              {transactionNotes.map((note: any) => (
                <ListItem
                  key={uuid()}
                  sx={{ padding: '10px' }}
                  component="div"
                  disablePadding
                >
                  {note.name}
                </ListItem>
              ))}
            </List>
          </Box>
          <FormContainer>
            <UnitItem grid={{ xs: 1, sm: 12 }}>
              <RouteLink
                key={'view'}
                url={`/opportunities/${data.id}/notes_chats/transaction_notes`}
                name={<AddButton onClick={emptyFunction} />}
              />
            </UnitItem>
          </FormContainer>
        </UnitItem>

        <UnitSwitch
          value={data.rpd_received ?? 0}
          onChange={handleChange}
          name="rpd_received"
          label={fieldLabel.rpdReceived}
          disabled={readOnly}
          grid={{ xs: 12, sm: 6 }}
        />

        <UnitSwitch
          value={data.mog_received ?? 0}
          onChange={handleChange}
          name="mog_received"
          label={fieldLabel.mogReceived}
          disabled={readOnly}
          grid={{ xs: 12, sm: 6 }}
        />

        <UnitText
          label={fieldLabel.addendumNo}
          name="addendum_no"
          value={data.addendum_no ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.addendumNotes}
          name="addendum_notes"
          value={data.addendum_notes ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline
          rows={4}
        />

        <UnitText
          label={fieldLabel.publicRemarksC}
          name="public_remarks_c"
          value={data.public_remarks_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline
          rows={4}
        />

        <UnitText
          label={fieldLabel.realtorRemarksC}
          name="realtor_remarks_c"
          value={data.realtor_remarks_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline
          rows={4}
        />

        <UnitText
          label={fieldLabel.additionalTermsCommentsC}
          name="additional_terms_comments_c"
          value={data.additional_terms_comments_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline
          rows={4}
        />

        <UnitText
          label={fieldLabel.inclusions}
          name="inclusion"
          value={data.inclusion ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline
          rows={4}
        />

        <UnitText
          label={fieldLabel.exclusions}
          name="exclusion"
          value={data.exclusion ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline
          rows={4}
        />

        <UnitText
          label={fieldLabel.otherCounterOfferTerms}
          name="other_counter_offer_terms"
          value={data.other_counter_offer_terms ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline
          rows={4}
        />

        <UnitText
          label={fieldLabel.backwardsStatusMoveReason}
          name="backwards_status_move_reason"
          value={data.backwards_status_move_reason ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
          multiline
          rows={4}
        />

        <UnitSelect
          name="offer_grade"
          label={fieldLabel.offerGrade}
          records={getObjectEntriesAsArray(offerGrade)}
          value={data.offer_grade ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          label={fieldLabel.lowestAcceptablePrice}
          name="lowest_acceptable_price"
          value={data.lowest_acceptable_price ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.offerResponseDetails}
          name="offer_response_details"
          value={data.offer_response_details ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline
          rows={4}
        />
      </FormContainer>
    </>
  );
};

export default NotesTermsProvisionsRecordView;

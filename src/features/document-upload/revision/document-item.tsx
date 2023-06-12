import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, ListItemText, useTheme } from '@mui/material';
import documentState from 'assets/constants/document-state';
import documentStatus from 'assets/constants/document-status';
import documentSubType from 'assets/constants/document-sub-type';
import documentType from 'assets/constants/document-type';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import {
  getTableBodyCell,
  getTableRow
} from 'components/table/table-component';
import DateUtility from 'helpers/date-helper';
import emptyFunction from 'helpers/empty-function-helper';
import { isEmpty, replaceStringCharacters } from 'helpers/misc-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext, useEffect, useRef, useState } from 'react';
import documentRevisionService from 'services/document-revision-service';
import { tokens } from 'theme';
import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';

const DocumentItem = ({
  document,
  index,
  removeFile,
  updateDocuments,
  isSameTypeDocumentSelected,
  opportunityId,
  validation
}: any) => {
  const { file, category_id, sub_type, revision, status, state, autoFocus } =
    document;

  const { oppurtunity } = useContext(OpportunityContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [subTypetOptions, setSubtypeOption] = useState<OptionType[]>([]);
  const [docRevisions, setDocRevisions] = useState<ObjectType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isRevisionExists = async () => {
    let query = `?filter[opportunity_id]=${opportunityId}&filter[document_type]=${category_id}&filter[document_subtype]=${sub_type}`;

    setIsLoading(true);

    const result: ObjectType =
      await documentRevisionService.getDocumentsRevisions(query);

    setIsLoading(false);

    let revisions = result.data.data;

    if (revisions.length > 0) {
      revisions.sort(
        (a: ObjectType, b: ObjectType) => +b.revision - +a.revision
      );
      setDocRevisions(revisions);
      updateDocuments(index, {
        ...document,
        revision: +revisions[0].revision + 1
      });
    }
  };

  const DocumentName = () => {
    let document_name = `${replaceStringCharacters(
      oppurtunity.name,
      ' ',
      '_'
    )}${
      !isEmpty(sub_type) &&
      category_id != 'misc' &&
      sub_type != 'client_name_pof_date_received'
        ? `_${replaceStringCharacters(
            subTypetOptions.find((x) => x.value == sub_type)!?.label,
            ' ',
            '_'
          )}`
        : ``
    }${
      category_id === 'misc'
        ? `${sub_type ? '_' : ''}${
            replaceStringCharacters(sub_type, ' ', '_') ?? ''
          }`
        : ''
    }${
      category_id === 'amendments' && ['coe_ext', 'dd_ext'].includes(sub_type)
        ? `_${revision}`
        : ''
    }${
      category_id === 'proof_of_funds' &&
      ['client_name_pof_date_received'].includes(sub_type)
        ? `_${replaceStringCharacters(
            oppurtunity.account.name,
            ' ',
            '_'
          )}_POF_${DateUtility.getTodayDateWithFormatString('DD-MM-YYYY')}`
        : ''
    }${!isEmpty(state) && state !== 'NA' ? `_${state}` : ''} `;
    return document_name;
  };

  useEffect(() => {
    setDocRevisions([]);
    setSubtypeOption(documentSubType[category_id] || []);
  }, [category_id]);

  useEffect(() => {
    setDocRevisions([]);
    if (isEmpty(sub_type)) return;

    isRevisionExists();
  }, [sub_type]);

  const Row = getTableRow(colors);
  const Cell = getTableBodyCell(colors);

  return (
    <>
      <Row
        sx={{
          backgroundColor: 'white !important'
        }}
      >
        <Cell sx={{ borderLeft: '3px solid grey' }}>
          <ListItemText primary={`${file.name}`} />
          {!isLoading ? <ListItemText primary={`${DocumentName()}`} /> : ''}
        </Cell>
        <Cell sx={{ pt: 1 }}>
          <UnitSelect
            label={fieldLabel.documentType}
            name="category_id"
            value={category_id}
            onChange={(e) => {
              updateDocuments(index, {
                file: file,
                category_id: e.target.value,
                sub_type: '',
                status: status,
                revision: 1,
                state: state
              });
            }}
            records={getObjectEntriesAsArray(documentType)}
            grid={{ xs: 12, sm: 12 }}
            error={validation[`documents.${index}.document_type`] ?? ''}
          />
        </Cell>

        <Cell sx={{ pt: 1 }}>
          {category_id != 'misc' ? (
            <UnitSelect
              label={fieldLabel.documentSubType}
              name="sub_type"
              value={sub_type}
              onChange={(e) => {
                updateDocuments(index, {
                  file: file,
                  category_id: category_id,
                  sub_type: e.target.value,
                  status: status,
                  state: state,
                  revision: 1
                });
              }}
              records={subTypetOptions}
              grid={{ xs: 12, sm: 12 }}
              error={validation[`documents.${index}.document_subtype`] ?? ''}
            />
          ) : (
            <UnitText
              name="sub_type"
              label={fieldLabel.documentSubType}
              value={sub_type}
              grid={{ xs: 12, sm: 12 }}
              onChange={(e: any) => {
                updateDocuments(index, {
                  file: file,
                  category_id: category_id,
                  sub_type: e.target.value,
                  status: status,
                  state: state,
                  revision: 1,
                  autoFocus: true
                });
              }}
              error={validation[`documents.${index}.document_subtype`] ?? ''}
              autoFocus={autoFocus ? true : false}
            />
          )}
        </Cell>
        <Cell sx={{ pt: 1 }}>
          <UnitSelect
            label={fieldLabel.documentState}
            name="state"
            value={state}
            onChange={(e) => {
              updateDocuments(index, {
                file: file,
                category_id: category_id,
                sub_type: sub_type,
                status: status,
                state: e.target.value,
                revision: revision,
                autoFocus: false
              });
            }}
            records={getObjectEntriesAsArray(documentState)}
            grid={{ xs: 12, sm: 12 }}
            error={validation[`documents.${index}.document_state`] ?? ''}
          />
        </Cell>
        <Cell sx={{ pt: 1 }}>
          <UnitSelect
            label={fieldLabel.documentStatus}
            name="status"
            value={status}
            onChange={(e) => {
              updateDocuments(index, {
                file: file,
                category_id: category_id,
                sub_type: sub_type,
                state: state,
                status: e.target.value,
                revision: revision,
                autoFocus: false
              });
            }}
            records={getObjectEntriesAsArray(documentStatus)}
            grid={{ xs: 12, sm: 12 }}
            error={validation[`documents.${index}.document_status`] ?? ''}
          />
        </Cell>
        <Cell>
          <Box p={1} style={{ color: 'black' }}>
            V{revision}{' '}
            <IconButton color="error" onClick={() => removeFile(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Cell>
      </Row>

      {docRevisions.map((docRevision: ObjectType, index: number) => (
        <Row
          sx={{
            backgroundColor: `paper !important`,
            p: 0.5
          }}
        >
          <Cell sx={{ paddingLeft: '20px' }}>{`${docRevision.filename}`}</Cell>
          <Cell>
            <UnitSelect
              label={fieldLabel.documentType}
              name="category_id"
              value={category_id}
              onChange={emptyFunction}
              records={getObjectEntriesAsArray(documentType)}
              grid={{ xs: 12, sm: 12 }}
              disabled={true}
            />
          </Cell>
          <Cell>
            <Box p={1}>
              {category_id != 'misc' ? (
                <UnitSelect
                  label={fieldLabel.documentSubType}
                  name="sub_type"
                  value={sub_type}
                  onChange={emptyFunction}
                  records={subTypetOptions}
                  grid={{ xs: 12, sm: 12 }}
                  disabled={true}
                />
              ) : (
                <UnitText
                  name="sub_type"
                  label={fieldLabel.documentSubType}
                  value={sub_type}
                  grid={{ xs: 12, sm: 12 }}
                  onChange={emptyFunction}
                  disabled={true}
                />
              )}
            </Box>
          </Cell>
          <Cell>
            <UnitSelect
              label={fieldLabel.documentState}
              name="state"
              value={docRevision.state}
              onChange={emptyFunction}
              records={getObjectEntriesAsArray(documentState)}
              grid={{ xs: 12, sm: 12 }}
              disabled={true}
            />
          </Cell>
          <Cell>
            <UnitSelect
              label={fieldLabel.documentStatus}
              name="status"
              value={docRevision.status}
              onChange={emptyFunction}
              records={getObjectEntriesAsArray(documentStatus)}
              grid={{ xs: 12, sm: 12 }}
              disabled={true}
            />
          </Cell>
          <Cell width={'10px'}>
            <Box p={1}>V{docRevision.revision}</Box>
          </Cell>
        </Row>
      ))}

      {/* {isSameTypeDocumentSelected(category_id, sub_type) && (
        <Row>
          <Cell colSpan={6}>
            <ValidationError data={['Duplicate Type and Sub Type']} />
          </Cell>
        </Row>
      )} */}
    </>
  );
};

export default DocumentItem;

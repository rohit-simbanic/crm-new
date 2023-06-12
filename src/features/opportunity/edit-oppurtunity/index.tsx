import Box from '@mui/material/Box';
import EVENTS from 'assets/constants/events';
import opportunityDetailViewTabs from 'assets/constants/opportunity-view-tabs';
import tabFields from 'assets/tab-fields';
import CircularLoader from 'components/dog-loader/dog-lodar';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import HorizontalTabs from 'components/tabs/horizontal-tabs';
import TabArea from 'components/tabs/tab-area';
import eventBus from 'helpers/event-bus-helper';
import { isEmpty } from 'helpers/misc-helper';
import LayoutProvider, {
  LayoutProviderInterface
} from 'pages/common-layout/layout-provider-context';
import { OpportunityContext } from 'pages/opportunity/Context';
import {
  saveOpportunityCommission,
  transformOpportunity,
  validateOpportunity
} from 'pages/opportunity/utility';
import useRouteName from 'pages/route-outlet-context';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import * as validationService from 'services/validation-service';
import { ObjectType } from 'types';

import Basic from './basic';
import Characteristics from './characteristics';
import ContactInformation from './contact-information';
import DiligencePeriod from './diligence-period';
import FinancialInformation from './financial-information';
import NotesTermsProvision from './notes-terms-provisions';
import OffMarket from './off-market';
import PrimaryInformation from './primary-information';
import Settlement from './settlement';

const TabLabel = ({ title, index, validation }: ObjectType) => {
  let errorFields = Object.keys(validation);
  let hasError = tabFields[index]?.some(
    (x: string) => errorFields.includes(x) && validation[x].length > 0
  );
  return (
    <span style={{ display: 'inline', color: hasError ? 'red' : 'inherit' }}>
      {title}
    </span>
  );
};

const OppurtunityDetailEdit = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id } = useParams<ObjectType>();
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const { oppurtunity, oldOppurtunity, handleChange, updateOpportunity } =
    useContext(OpportunityContext);

  const { setTopBar } = useContext<LayoutProviderInterface>(LayoutProvider);

  const { routeName, setRouteName } = useRouteName();
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [field, setField] = useState('');
  const tabId = 'opportunity-edit';
  const changeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };

  const updateValidation = (obj: ObjectType) => {
    setValidation(Object.assign({}, validation, obj));
  };

  const handleSubmit = async () => {
    const { status, ...errors } = validateOpportunity(
      oppurtunity,
      oldOppurtunity
    );
    setValidation(errors);

    if (!status) {
      let reqBody: ObjectType = transformOpportunity(oppurtunity);

      setIsLoading(true);

      const result = await oppurtunityService.update(opportunity_id, reqBody);

      setIsLoading(false);

      if (reqBody.data_source === 'off_market') {
        saveOpportunityCommission(reqBody);
      }

      if (result.isSuccess) {
        eventBus.dispatch(EVENTS.SHOW_TOAST, {
          message: 'Update Success',
          isError: false
        });
        eventBus.dispatch('refresh_opportunity', {});
        navigate(`/opportunities/${opportunity_id}/view`);
      }

      if (result.isError) {
        eventBus.dispatch(EVENTS.SHOW_TOAST, {
          message: result.errorMessage,
          isError: true
        });
      }
    }
  };

  const tabItems = () => {
    let items = {};
    delete opportunityDetailViewTabs.off_market;
    for (let item in opportunityDetailViewTabs) {
      items = {
        ...items,
        [item]: (
          <TabLabel
            title={opportunityDetailViewTabs[item]}
            index={item}
            validation={validation}
          />
        )
      };
    }

    if (oppurtunity?.data_source && oppurtunity?.data_source === 'off_market') {
      items = {
        ...items,
        off_market: (
          <TabLabel
            title={'Off Market'}
            index={'off_market'}
            validation={validation}
          />
        )
      };
    }

    return items;
  };

  const performAfterEffect = async (field: string) => {
    let result: ObjectType = {};
    if (validationService.validation[field]?.handleChange) {
      result = await validationService.validation[field]?.handleChange(
        oppurtunity,
        oldOppurtunity
      );
      updateOpportunity(result);
    }

    if (validationService.validation[field]?.validate) {
      const errors = validationService.validation[field]?.validate(
        oppurtunity,
        'edit',
        oldOppurtunity
      );
      if (!isEmpty(errors)) {
        updateValidation({ [field]: errors });
      }
    }

    for (const key in result) {
      if (validationService.validation[key]?.handleChange) {
        setField(key);
      }
    }

    setField('none');
  };

  const TopBar = (
    <>
      <Box
        sx={{
          justifyContent: 'flex-end',
          display: 'flex',
          paddingTop: 2
        }}
      >
        <Box pr={2}>
          <SaveButton onClick={handleSubmit} disabled={isLoading} />
        </Box>
        <Box pr={4}>
          <CancelButton
            onClick={() => {
              navigate(`/opportunities/${opportunity_id}/view`);
            }}
          />
        </Box>
      </Box>
    </>
  );

  useEffect(() => {
    performAfterEffect(field);
  }, [field]);

  useEffect(() => {
    setRouteName(routeTag);

    return () => {
      updateOpportunity(oldOppurtunity);
    };
  }, []);

  useEffect(() => {
    setTopBar(TopBar);
  }, [oppurtunity]);

  return (
    <>
      {isLoading ? (
        <CircularLoader />
      ) : (
        <>
          <HorizontalTabs
            value={activeTabIndex}
            handleChange={changeTab}
            tabItems={tabItems()}
            tabId={tabId}
          />

          <PaperBox sx={{ mt: 1 }}>
            <PaperBoxContent>
              <TabArea
                index={0}
                value={activeTabIndex}
                border={false}
                tabId={tabId}
              >
                <Basic
                  validation={validation}
                  updateValidation={updateValidation}
                  setField={setField}
                />
              </TabArea>
              <TabArea
                index={1}
                value={activeTabIndex}
                border={false}
                tabId={tabId}
              >
                <PrimaryInformation
                  validation={validation}
                  setField={setField}
                  updateValidation={updateValidation}
                />
              </TabArea>
              <TabArea
                index={2}
                value={activeTabIndex}
                border={false}
                tabId={tabId}
              >
                <NotesTermsProvision />
              </TabArea>
              <TabArea
                index={3}
                value={activeTabIndex}
                border={false}
                tabId={tabId}
              >
                <Characteristics
                  validation={validation}
                  setField={setField}
                  updateValidation={updateValidation}
                />
              </TabArea>
              <TabArea
                index={4}
                value={activeTabIndex}
                border={false}
                tabId={tabId}
              >
                <ContactInformation
                  validation={validation}
                  setField={setField}
                />
              </TabArea>
              <TabArea
                index={5}
                value={activeTabIndex}
                border={false}
                tabId={tabId}
              >
                <FinancialInformation
                  validation={validation}
                  updateValidation={updateValidation}
                  setField={setField}
                />
              </TabArea>
              <TabArea
                index={6}
                value={activeTabIndex}
                border={false}
                tabId={tabId}
              >
                <DiligencePeriod setField={setField} validation={validation} />
              </TabArea>
              <TabArea
                index={7}
                value={activeTabIndex}
                border={false}
                tabId={tabId}
              >
                <Settlement
                  validation={validation}
                  setField={setField}
                  updateValidation={updateValidation}
                  field={field}
                />
              </TabArea>
              <TabArea
                index={8}
                value={activeTabIndex}
                border={false}
                tabId={tabId}
              >
                <OffMarket
                  currentField={field}
                  setField={setField}
                  validation={validation}
                />
              </TabArea>

              <StackRowWithDivider>
                <SaveButton onClick={handleSubmit} disabled={isLoading} />
                <CancelButton
                  onClick={() => {
                    navigate(`/opportunities/${opportunity_id}/view`);
                  }}
                />
              </StackRowWithDivider>
            </PaperBoxContent>
          </PaperBox>
        </>
      )}
    </>
  );
};

export default OppurtunityDetailEdit;

import { Typography } from '@mui/material';
import FormContainer from 'components/form/container';
import UnitHeading from 'components/form/unit-heading';
import UnitItem from 'components/form/unit-item';
import UnitRead from 'components/form/unit-read';
import capitalizeFirstLetter from 'helpers/capitalize-first-letter-healper';
import { isEmpty } from 'helpers/misc-helper';
import useColorToken from 'hooks/useColorToken';
import React from 'react';
import { ObjectType } from 'types';
import { MarketPreferenceEntity } from 'types/market-preferences';
import ListItem from '@mui/material/ListItem/ListItem';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';

interface recordViewType {
  marketPreferences: MarketPreferenceEntity;
  readOnly?: boolean;
}

const RecordView = ({
  marketPreferences,
  readOnly = false
}: recordViewType) => {
  let offerDefaults: any;
  const isExist = !isEmpty(marketPreferences.entera_offer_defaults);
  const colors = useColorToken();
  if (isExist) {
    offerDefaults = JSON.parse(marketPreferences.entera_offer_defaults || '');
  }

  function decodeOfferDefaultValues(value: any) {
    if (value === '' || value === null || value.length === 0) {
      return '---';
    } else if (value === true) {
      return 'True';
    } else if (value === false) {
      return 'False';
    }
    return value;
  }

  function simplyfyJson(json: { [s: string]: unknown } | ArrayLike<unknown>) {
    let entity: { key: string; value: object | null }[] = [];
    let collection: { key: string; value: object | null }[] = [];
    let attribute: { key: string; value: unknown }[] = [];
    let item: { key: string; value: any[] }[] = [];

    Object.entries(json).map(([key, value]) => {
      value = decodeOfferDefaultValues(value);
      if (typeof value === 'object' && !Array.isArray(value)) {
        entity.push({
          key,
          value
        });
      } else if (Array.isArray(value)) {
        if (typeof value[0] !== 'object') {
          item.push({
            key,
            value
          });
        } else {
          collection.push({
            key,
            value
          });
        }
      } else {
        attribute.push({
          key,
          value
        });
      }
    });

    return {
      entity,
      collection,
      attribute,
      item
    };
  }

  const Form = ({ data }: any) => {
    const { entity, collection, attribute, item } = simplyfyJson(data);

    const renderFormField = (
      value: any,
      key: any,
      heading?: boolean
    ): JSX.Element => {
      if (
        !isEmpty(value) &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        return (
          <UnitItem
            sx={{
              border: `1px solid ${colors.grey.border}`,
              borderRadius: 1,
              padding: 2,
              marginLeft: 2,
              marginTop: 2
            }}
            grid={{ xs: 12, sm: 5.8 }}
          >
            <UnitHeading title={key} />
            {React.Children.toArray(
              Object.entries(value).map(([k, v]: any) => (
                <UnitRead
                  label={k}
                  value={decodeOfferDefaultValues(v)}
                  key={k}
                  grid={{ xs: 12, sm: 12 }}
                  sx={{ padding: 1 }}
                />
              ))
            )}
          </UnitItem>
        );
      } else if (
        !isEmpty(value) &&
        typeof value[0] !== 'object' &&
        Array.isArray(value) &&
        value.length > 0
      ) {
        return (
          <>
            <UnitRead
              label={key}
              value={React.Children.toArray(
                value.map((val: string, index: number) => {
                  return (
                    <>
                      <ListItem sx={{ p: 1 }}>
                        {index + 1}. {decodeOfferDefaultValues(val)}
                      </ListItem>
                    </>
                  );
                })
              )}
              key={key}
              grid={{ xs: 12, sm: 6 }}
              sx={{ padding: 1 }}
              boxsx={{ pt: value.length > 2 ? 5 : 0 }}
            />
          </>
        );
      } else if (!isEmpty(value) && Array.isArray(value) && value.length > 0) {
        return (
          <>
            <UnitItem
              sx={{
                border: `1px solid ${colors.grey.border}`,
                borderRadius: 1,
                padding: 2,
                marginLeft: 2,
                marginTop: 2
              }}
              grid={{ xs: 12, sm: heading ? 12 : 5.8 }}
            >
              {typeof value[0] === 'object' ? (
                !heading ? (
                  <UnitHeading title={`${capitalizeFirstLetter(key)}`} />
                ) : (
                  <Typography component={'div'} variant="body1">
                    {key}
                  </Typography>
                )
              ) : (
                <></>
              )}
              {React.Children.toArray(
                value.map((item: any, index: number) => {
                  if (item && typeof item === 'string') {
                    return (
                      <>
                        <UnitRead
                          label={''}
                          value={item}
                          labelsx={{ pr: 1 }}
                          key={key}
                          grid={{ xs: 12, sm: 12 }}
                        />
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Typography component={'span'} variant="body2">
                          {index + 1}.{key}
                        </Typography>
                        {React.Children.toArray(
                          Object.entries(item).map(([k, v]) =>
                            renderFormField(v, k, true)
                          )
                        )}
                      </>
                    );
                  }
                })
              )}
            </UnitItem>
            <StackRowWithDivider />
          </>
        );
      } else {
        return (
          <>
            <UnitRead
              label={key}
              value={decodeOfferDefaultValues(value)}
              key={key}
              grid={{ xs: 12, sm: heading ? 12 : 6 }}
              sx={{ padding: 1 }}
              boxsx={{ display: 'grid' }}
            />
          </>
        );
      }
    };
    return (
      <>
        {React.Children.toArray(
          [attribute, item, entity, collection].map((element: ObjectType) =>
            React.Children.toArray(
              element.map((element: ObjectType) =>
                renderFormField(element.value, element.key)
              )
            )
          )
        )}
      </>
    );
  };

  return (
    <>
      {isExist && (
        <FormContainer>
          <Form data={offerDefaults} />
        </FormContainer>
      )}
    </>
  );
};

export default RecordView;

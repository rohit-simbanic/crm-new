import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitText from 'components/form/unit-text';
import ModalHeader from 'components/modal/modal-header';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import PaperBoxHeader from 'components/paper-box/paper-box-header';
import StackRow from 'components/stack/stack-row';
import React, { useState } from 'react';
import serviceProviders from 'services/service-providers';
import ValidationService from 'services/validation-service';

const AddVendor = ({
  type,
  reloadVendor,
  onClose
}: {
  type: string;
  reloadVendor: (e: any) => any;
  onClose: () => void;
}) => {
  const [data, setData] = useState<any>({
    name: '',
    type: type
  });

  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { status, ...errors } = ValidationService.validate(
      data,
      ['vendor_name'],
      'action'
    );
    setValidation(errors);

    if (!status) {
      setIsLoading(true);

      const result = await serviceProviders.createServiceProvides(data);

      setIsLoading(false);

      if (result.isValidationError) {
        setValidation(ValidationService.backendValidate(errors.error));
      }

      reloadVendor(result.data.id);
    }
  };

  return (
    <>
      <PaperBox variantValue="elevation" sx={{ p: 0 }}>
        <PaperBoxHeader
          value={
            <>
              <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
                <ModalHeader
                  title={'Create New Service Provider'}
                  onClose={onClose}
                />
              </UnitItem>
            </>
          }
        />
        <PaperBoxContent
          sx={{
            height: 'calc(100vh - 85vh)',
            overflowY: 'auto',
            p: 2
          }}
        >
          <FormContainer>
            <UnitText
              label="Enter Name"
              name="name"
              value={data.name ?? ''}
              onChange={handleChange}
              error={
                validation['vendor_name']
                  ? validation['vendor_name']
                  : validation['name']
              }
              required
              grid={{ xs: 12, sm: 12 }}
            />
          </FormContainer>
        </PaperBoxContent>
        <PaperBoxFooter>
          <StackRow sx={{ pt: 0, pr: 0, pb: 0, pl: 0 }}>
            <SaveButton onClick={handleSubmit} disabled={isLoading} />
            <CancelButton onClick={onClose} />
          </StackRow>
        </PaperBoxFooter>
      </PaperBox>
    </>
  );
};

export default AddVendor;

import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { validateMSA } from 'helpers/validation/msa-helper';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import msaService from 'services/msa-service';
import initialMsa from 'state/msa/initial-msa';
import { MsaEntity } from 'types/msa-types';

import RecordView from '../record-view';

const MsaCreate = ({ routeTag }: { routeTag: string }) => {
  const { msa_id } = useParams();
  const [msa, setMsa] = useState<MsaEntity>(initialMsa);
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { routeName, setRouteName } = useRouteName();
  const handleChange = (e: any) => {
    setMsa(Object.assign({}, msa, { [e.target.name]: e.target.value }));
  };

  const loadMsa = async (msa_id: string) => {
    let responce = await msaService.get(msa_id);
    setMsa(responce.data);
  };

  const handleSubmit = async () => {
    const { status, ...errors } = validateMSA(msa);

    setValidation(errors);

    if (!status) return;

    let response;

    setIsLoading(true);

    const reqBody = {
      name: msa.name,
      entera_market_id: msa.entera_market_id,
      code: msa.code,
      initial_commission: msa.initial_commission,
      state: msa.state,
      mls_code: msa.mls_code,
      has_municipal_inspections: msa.has_municipal_inspections
    };

    if (msa_id) {
      response = await msaService.update(msa_id, reqBody);
    } else {
      response = await msaService.create(reqBody);
    }

    setIsLoading(false);

    if (response.isValidationError) {
      setValidation(response.errorMessage);
    }

    if (response.isSuccess) {
      window.history.back();
    }
  };

  useEffect(() => {
    if (msa_id) loadMsa(msa_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  });

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView msa={msa} validation={validation} onChange={handleChange} />

        <StackRowWithDivider>
          <SaveButton onClick={handleSubmit} disabled={isLoading} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default MsaCreate;

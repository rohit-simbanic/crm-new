import EVENTS from 'assets/constants/events';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import eventBus from 'helpers/event-bus-helper';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import userService from 'services/user-service';
import { ObjectType } from 'types';
import RecordView from '../record-view';
import { validateProfile } from '../utility';

const ProfileCreate = ({ routeTag }: { routeTag: string }) => {
  const [profile, setProfile] = useState<any>();
  const { routeName, setRouteName } = useRouteName();
  const [validation, setValidation] = useState<ObjectType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<ObjectType>({});

  const handleChange = (e: any) => {
    setProfile(Object.assign({}, profile, { [e.target.name]: e.target.value }));
  };

  const loadMe = async () => {
    const result: ObjectType = await userService.getCurrentUser();

    if (result.isError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: result.errorMessage,
        isError: true
      });

      return;
    }

    if (result.isSuccess) {
      setUser(result.data);
      setProfile(result.data);
    }
  };

  const handleSubmit = async () => {
    let reqBody = {
      ...profile
    };
    let localStorageUser = JSON.parse(localStorage.getItem('user') || '');
    const { status, ...errors } = validateProfile(reqBody);
    setValidation(errors);
    if (!status) return;

    setLoading(true);
    const result = await userService.update(
      user?.id ? user?.id : localStorageUser?.user?.id,
      reqBody
    );
    setLoading(false);

    if (result.isValidationError) {
      setValidation(result.errorMessage);

      return;
    }

    if (result.isError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: result.errorMessage,
        isError: true
      });

      return;
    }

    if (result.isSuccess) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: 'Your profile Updated.',
        isError: false
      });
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <PaperBox>
        <PaperBoxContent>
          <RecordView
            profile={profile}
            validation={validation}
            onChange={handleChange}
          />

          <StackRowWithDivider>
            <SaveButton onClick={handleSubmit} />
            <CancelButton />
          </StackRowWithDivider>
        </PaperBoxContent>
      </PaperBox>
    </>
  );
};
export default ProfileCreate;

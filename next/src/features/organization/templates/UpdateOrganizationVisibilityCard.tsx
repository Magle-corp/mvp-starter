import styled from 'styled-components';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputSwitch } from 'primereact/inputswitch';
import { TbEyeOff, TbEye } from 'react-icons/tb';
import { useAppContext } from '@/cdn/AppContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePut from '@/cdn/hooks/usePut';
import { useAuthContext } from '@/features/authentication/AuthContext';
import Card from '@/ui/atoms/Card';

const UpdateOrganizationVisibilityCard = () => {
  const { token, organization, getFreshToken } = useAuthContext();
  const { toast } = useAppContext();
  const switchDefaultValue = organization?.public ?? false;

  const organizationMutation = usePut({
    url: ApiRoutes.ORGANIZATIONS + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATION + organization?.id,
    onSuccess: () => {
      getFreshToken(token);
      toast.current.show({
        severity: 'success',
        summary: 'Organisation',
        detail: 'Mis à jour avec succès',
      });
    },
    onError: () =>
      toast.current.show({
        severity: 'error',
        summary: 'Organisation',
        detail: 'Un problème technique est survenu',
      }),
  });

  const publicOrganizationDialogContent =
    'En choisissant de rendre votre organisation publique ...';
  const privateOrganizationDialogContent =
    'En choisissant de rendre votre organisation privée ...';

  const onVisibilityChange = () => {
    confirmDialog({
      message: switchDefaultValue
        ? privateOrganizationDialogContent
        : publicOrganizationDialogContent,
      header: 'Modifier la visibilité de mon organisation',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        organizationMutation.mutate({
          public: !organization?.public,
        }),
    });
  };

  const Toolbar = (
    <SwitchWrapper>
      <div>
        <p>Organisation {switchDefaultValue ? 'publique' : 'privée'}</p>
        {switchDefaultValue ? <TbEye /> : <TbEyeOff />}
      </div>
      <InputSwitch
        checked={switchDefaultValue}
        onChange={() => onVisibilityChange()}
        disabled={!organization}
      />
    </SwitchWrapper>
  );

  return (
    <Card title="Visibilité de mon organisation" toolbar={Toolbar}>
      <p></p>
    </Card>
  );
};

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;

    p {
      font-weight: bold;
    }
  }
`;

export default UpdateOrganizationVisibilityCard;

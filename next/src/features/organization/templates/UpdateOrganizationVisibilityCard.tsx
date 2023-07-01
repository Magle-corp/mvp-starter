import styled from 'styled-components';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputSwitch } from 'primereact/inputswitch';
import { TbCopy, TbEyeOff, TbEye, TbLink } from 'react-icons/tb';
import { useAppContext } from '@/cdn/AppContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePut from '@/cdn/hooks/usePut';
import { useAuthContext } from '@/features/authentication/AuthContext';
import Card from '@/ui/atoms/Card';
import IconButton from '@/ui/atoms/IconButton';

const UpdateOrganizationVisibilityCard = () => {
  const { token, organization, getFreshToken } = useAuthContext();
  const { toast } = useAppContext();
  const publicOrganization = organization?.public ?? false;

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
    'Souhaitez-vous que votre organisation soit visible sur le site public ?';
  const privateOrganizationDialogContent = (
    <InfoWrapper>
      <p>
        En choisissant de rendre votre organisation privée, vous ne serez plus
        visible sur le site public.
      </p>
      <p>Souhaitez-vous continuer ?</p>
    </InfoWrapper>
  );

  const onVisibilityChange = () => {
    confirmDialog({
      message: publicOrganization
        ? privateOrganizationDialogContent
        : publicOrganizationDialogContent,
      header: 'Modifier la visibilité de mon organisation',
      icon: publicOrganization
        ? 'pi pi-exclamation-triangle'
        : 'pi pi-question-circle',
      accept: () =>
        organizationMutation.mutate({
          public: !organization?.public,
        }),
    });
  };

  const handleCopyPublicUrl = () => {
    navigator.clipboard.writeText('Magle studio');
    toast.current.show({
      severity: 'info',
      summary: 'Organisation',
      detail: 'Lien copié avec succès',
    });
  };

  const Toolbar = (
    <SwitchWrapper>
      <div>
        <p>Organisation {publicOrganization ? 'publique' : 'privée'}</p>
        {publicOrganization ? <TbEye /> : <TbEyeOff />}
      </div>
      <InputSwitch
        checked={publicOrganization}
        onChange={() => onVisibilityChange()}
        disabled={!organization}
      />
    </SwitchWrapper>
  );

  const CardDescription = <p>accroître la visibilité de votre organisation.</p>;

  return (
    <Card
      title="Visibilité de mon organisation"
      description={CardDescription}
      toolbar={Toolbar}
    >
      <InfoWrapper>
        <p>
          En rendant votre profil public, vous permettez à tous les utilisateurs
          du site de découvrir les informations concernant votre organisation.
        </p>
        <p>
          Cela signifie que vos fiches animal seront accessibles à un large
          public, offrant ainsi une exposition à votre cause et à vos actions.
        </p>
      </InfoWrapper>
      {organization?.public && (
        <IconButtonWrapper>
          <IconButton
            behaviour="button"
            onClick={handleCopyPublicUrl}
            accessAlt="Copier le lien vers la page public de votre organisation"
            tooltip="Copier le lien vers la page public de votre organisation"
          >
            <TbCopy />
          </IconButton>
          <IconButton
            behaviour="link"
            href="https://google.com"
            accessAlt="Ouvrir la page public de votre navigation dans un nouvel onglet"
            tooltip="Ouvrir la page public de votre navigation"
          >
            <TbLink />
          </IconButton>
        </IconButtonWrapper>
      )}
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

    > svg {
      font-size: 20px;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const IconButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default UpdateOrganizationVisibilityCard;

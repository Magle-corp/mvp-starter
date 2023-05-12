import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import vocabularyDropdownOptions from '@/features/dictionary/conf/vocabularyDropdownOptions';
import getVocabularyFormConfiguration, {
  VocabularyFormConfiguration,
} from '@/features/dictionary/conf/vocabularyFormConfigurations';
import { VocabularyTypes } from '@/features/dictionary/types/Dictionary';
import TemperForm, {
  TemperFormSchema,
} from '@/features/dictionary/forms/TemperForm';
import TypeForm, { TypeFormSchema } from '@/features/dictionary/forms/TypeForm';
import VocabularyDropdown from '@/features/dictionary/components/VocabularyDropdown';
import Card from '@/ui/atoms/Card';

const CreateVocabularyCard = () => {
  const [formConfiguration, setFormConfiguration] =
    useState<VocabularyFormConfiguration>();

  const router = useRouter();
  const { vocabulary: vocabularyQueryId } = router.query;
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  useEffect(() => {
    if (organization && vocabularyQueryId) {
      if (
        vocabularyQueryId === VocabularyTypes.TEMPER ||
        vocabularyQueryId === VocabularyTypes.RACE ||
        vocabularyQueryId === VocabularyTypes.TYPE
      ) {
        setFormConfiguration(
          getVocabularyFormConfiguration(
            vocabularyQueryId,
            organization?.id.toString()
          )
        );
      }
    }
  }, [organization, vocabularyQueryId]);

  const successToast = () =>
    toast.current.show({
      severity: 'success',
      summary: 'Dictionnaire',
      detail: 'Enregistré avec succès',
    });

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Dictionnaire',
      detail: 'Un problème technique est survenu',
    });

  const temperMutation = usePost<TemperFormSchema>({
    url: ApiRoutes.ORGANIZATION_TEMPER,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TEMPERS,
    onSuccess: () => successToast(),
    onError: () => errorToast(),
  });

  const onSubmitTemperForm: SubmitHandler<TemperFormSchema> = (
    fieldValues: TemperFormSchema
  ) => {
    temperMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + organization?.id,
    });
  };

  const typeMutation = usePost<TypeFormSchema>({
    url: ApiRoutes.ORGANIZATION_TYPES,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TYPES,
    onSuccess: () => successToast(),
    onError: () => errorToast(),
  });

  const onSubmitTypeForm: SubmitHandler<TypeFormSchema> = (
    fieldValues: TypeFormSchema
  ) => {
    typeMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + organization?.id,
    });
  };

  const Toolbar = (
    <VocabularyDropdown
      placeholder="type de vocabulaire"
      value={formConfiguration?.type}
      options={vocabularyDropdownOptions}
      onChange={(event) => {
        if (organization) {
          setFormConfiguration(
            getVocabularyFormConfiguration(
              event.value,
              organization?.id.toString()
            )
          );
        }
      }}
    />
  );

  return (
    <Card
      title={formConfiguration?.cardTitle ?? 'Ajouter du vocabulaire'}
      toolbar={Toolbar}
    >
      {formConfiguration?.type === VocabularyTypes.TEMPER && (
        <TemperForm
          defaultValues={formConfiguration.formDefaultValues}
          onSubmit={onSubmitTemperForm}
          submitLoading={temperMutation.isLoading}
          submitError={temperMutation.error?.response?.data.message}
        />
      )}
      {formConfiguration?.type === VocabularyTypes.TYPE && (
        <TypeForm
          defaultValues={formConfiguration.formDefaultValues}
          onSubmit={onSubmitTypeForm}
          submitLoading={typeMutation.isLoading}
          submitError={typeMutation.error?.response?.data.message}
        />
      )}
    </Card>
  );
};

export default CreateVocabularyCard;

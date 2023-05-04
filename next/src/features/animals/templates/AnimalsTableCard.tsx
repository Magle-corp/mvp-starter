import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTableFilterMeta } from 'primereact/datatable';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useGet from '@/cdn/hooks/useGet';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import { Animal } from '@/features/animals/types/Animal';
import Card from '@/ui/atoms/Card';
import LinkButton from '@/ui/atoms/LinkButton';
import Table from '@/ui/atoms/Table';

const tableInitialFilters: DataTableFilterMeta = {
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const AnimalsTableCard = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [tableFilters, setTableFilters] =
    useState<DataTableFilterMeta>(tableInitialFilters);

  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();

  const animalsQuery = useGet<Animal>({
    url: ApiRoutes.ANIMALS_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMALS,
    onSuccess: (data) => {
      // TODO: replace hydra:member
      // @ts-ignore
      setAnimals(data['hydra:member']);
    },
  });

  const Toolbar = (
    <LinkButton label="Ajouter" href={AppPages.BO_ANIMAL_CREATE} />
  );

  const rowActions = (props: Animal) => {
    return (
      <LinkButton
        href={AppPages.BO_ANIMAL_UPDATE + '/' + props.id}
        icon="pi pi-pencil"
      />
    );
  };

  return (
    <Card title="Mes animaux" toolbar={Toolbar}>
      <Table
        value={animals}
        filters={tableFilters}
        filterDisplay="row"
        onFilter={(event) => setTableFilters(event.filters)}
        stateKey="animals_table"
        loading={animalsQuery.isLoading}
      >
        <Column
          field="name"
          header="Nom"
          sortable
          filter
          filterPlaceholder="Rechercher"
        />
        <Column className="custom-row-actions" body={rowActions} />
      </Table>
    </Card>
  );
};

export default AnimalsTableCard;

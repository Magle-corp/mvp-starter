import { useState } from 'react';
import styled from 'styled-components';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTableFilterMeta } from 'primereact/datatable';
import { useAppContext } from '@/cdn/AppContext';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import AppPages from '@/cdn/enums/AppPages';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import useGetAnimals from '@/cdn/queries/useGetAnimals';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { Animal } from '@/features/animals/types/Animal';
import ActionColumn from '@/features/animals/components/table/ActionColumn';
import NameColumn from '@/features/animals/components/table/NameColumn';
import RaceColumn from '@/features/animals/components/table/RaceColumn';
import PublicColumn from '@/features/animals/components/table/PublicColumn';
import Card from '@/ui/atoms/Card';
import LinkButton from '@/ui/atoms/LinkButton';
import Table from '@/ui/atoms/Table';

const tableInitialFilters: DataTableFilterMeta = {
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const AnimalsTableCard = () => {
  const [tableFilters, setTableFilters] =
    useState<DataTableFilterMeta>(tableInitialFilters);

  const { breakpointSM, breakpointMD, breakpointLG } = useBreakpoints();
  const { token, organization } = useAuthContext();
  const { toast } = useAppContext();
  const { organizationMenuOpen } = useBackOfficeContext();

  const animalsQuery = useGetAnimals({
    organizationId: organization?.id,
    token: token?.token,
    onError: () =>
      toast.current.show({
        severity: 'error',
        summary: 'Animal',
        detail: 'Un problème technique est survenu',
      }),
  });

  const getTableFilterDisplayMode = (): 'menu' | 'row' => {
    if (breakpointMD && !breakpointLG && !organizationMenuOpen) {
      return 'row';
    } else if (breakpointMD && !breakpointLG && organizationMenuOpen) {
      return 'menu';
    } else if (breakpointLG) {
      return 'row';
    } else {
      return 'menu';
    }
  };

  const Toolbar = (
    <LinkButton label="Ajouter" href={AppPages.BO_ANIMAL_CREATE} />
  );

  const cardDescription = <p>administrez les animaux de votre organisation</p>;

  return (
    <Card title="Mes animaux" description={cardDescription} toolbar={Toolbar}>
      <StyledTable
        value={animalsQuery.data?.data['hydra:member']}
        filters={tableFilters}
        filterDisplay={getTableFilterDisplayMode()}
        onFilter={(event) => setTableFilters(event.filters)}
        stateKey="animals_table"
        loading={animalsQuery.isLoading}
      >
        <Column
          field="name"
          header="Nom"
          sortable
          filter={breakpointSM}
          filterPlaceholder="Rechercher"
          body={NameColumn}
        />
        {breakpointSM && (
          <Column field="race.name" header="Race" sortable body={RaceColumn} />
        )}
        {(breakpointLG ||
          (breakpointMD && !breakpointLG && !organizationMenuOpen)) && (
          <Column
            field="public"
            header="Visibilité"
            sortable
            body={PublicColumn}
          />
        )}
        <Column className="custom-row-actions" body={ActionColumn} />
      </StyledTable>
    </Card>
  );
};

const StyledTable = styled(Table)`
  .p-datatable-tbody {
    > tr {
      td:nth-child(1) {
        width: 300px;
      }

      td:nth-child(2) {
        width: 300px;
      }

      td:nth-child(3) {
        width: 150px;
      }

      td:last-child {
        width: unset;
      }
    }
  }
`;

export default AnimalsTableCard;

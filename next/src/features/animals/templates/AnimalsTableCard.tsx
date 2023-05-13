import styled from 'styled-components';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTableFilterMeta } from 'primereact/datatable';
import {
  TbCat,
  TbDog,
  TbGenderAgender,
  TbGenderFemale,
  TbGenderMale,
} from 'react-icons/tb';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import useGet from '@/cdn/hooks/useGet';
import { dateToString } from '@/cdn/utils/dateService';
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
  const [tableFilters, setTableFilters] =
    useState<DataTableFilterMeta>(tableInitialFilters);

  const { breakpointSM, breakpointMD, breakpointLG } = useBreakpoints();
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { organizationMenuOpen, toast } = useBackOfficeContext();

  const animalsQuery = useGet<Animal[]>({
    url: ApiRoutes.ANIMALS_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMALS,
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

  const NameColumnItemTemplate = (props: Animal) => {
    return (
      <ColumnItemWrapper>
        {props.race.type.name === 'Chien' && <TbDog />}
        {props.race.type.name === 'Chat' && <TbCat />}
        <p>{props.name}</p>
      </ColumnItemWrapper>
    );
  };

  const RaceColumnItemTemplate = (props: Animal) => {
    return (
      <ColumnItemWrapper>
        {props.sex.name === 'Male' && <TbGenderMale />}
        {props.sex.name === 'Femelle' && <TbGenderFemale />}
        {props.sex.name === 'Inconnu' && <TbGenderAgender />}
        <p>{props.race.name}</p>
      </ColumnItemWrapper>
    );
  };

  const RegisteredColumnItemTemplate = (props: Animal) => {
    return (
      <ColumnItemWrapper>
        <p>{dateToString(new Date(props.registered))}</p>
      </ColumnItemWrapper>
    );
  };

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
          body={NameColumnItemTemplate}
        />
        {breakpointSM && (
          <Column
            field="race.name"
            header="Race"
            sortable
            body={RaceColumnItemTemplate}
          />
        )}
        {breakpointMD && (
          <Column
            field="registered"
            header="Arrivé"
            sortable
            body={RegisteredColumnItemTemplate}
          />
        )}
        <Column className="custom-row-actions" body={rowActions} />
      </StyledTable>
    </Card>
  );
};

const ColumnItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

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

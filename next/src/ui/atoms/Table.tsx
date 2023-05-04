import styled from 'styled-components';
import {
  DataTable,
  DataTableProps,
  DataTableValueArray,
} from 'primereact/datatable';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';

const Table = <T extends DataTableValueArray>(props: DataTableProps<T>) => {
  const { breakpointMD } = useBreakpoints();

  const completePaginatorTemplate =
    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown';

  const shortPaginatorTemplate = 'PrevPageLink NextPageLink';

  return (
    <DataTable
      paginator={props.paginator ?? true}
      paginatorTemplate={
        !breakpointMD ? shortPaginatorTemplate : completePaginatorTemplate
      }
      rows={props.rows ?? 10}
      rowsPerPageOptions={props.rowsPerPageOptions ?? [10, 20, 50]}
      stateStorage={props.stateStorage ?? 'local'}
      removableSort
      filterDelay={0}
      emptyMessage={'Pas de données'}
      {...props}
    >
      {props.children}
    </DataTable>
  );
};

export default styled(Table)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .p-datatable-wrapper {
    border-radius: 3px;
  }

  .custom-row-actions {
    .p-column-header-content {
      display: flex;
      justify-content: end;
    }
  }

  td + .custom-row-actions {
    display: flex;
    justify-content: end;
  }

  .p-paginator {
    justify-content: center;
    border: unset;
  }
`;

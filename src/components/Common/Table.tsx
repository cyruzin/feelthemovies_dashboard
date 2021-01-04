import React from 'react';
import TR from './TR';

interface Columns {
  key: number;
  name: string;
}

interface Props {
  columns: Columns[];
  children?: React.ReactNode;
}

function Table(props: Props) {
  const { columns, children } = props;
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <TR>
            {columns.map((column) => (
              <th key={column.key}>{column.name}</th>
            ))}
          </TR>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default Table;

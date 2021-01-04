// @flow
import React from 'react';

type Props = {
  title: string;
};

function SectionHeader(props: Props) {
  const { title } = props;
  return (
    <div className="page-header">
      <div className="container-fluid">
        <h2 className="h5 no-margin-bottom">{title}</h2>
      </div>
    </div>
  );
}

export default SectionHeader;

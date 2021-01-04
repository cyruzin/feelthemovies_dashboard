// @flow
import React from 'react';
import { Link } from 'react-router-dom';

type BreadCrumb = {
  key: number;
  path: string;
  name: string;
};

type Props = {
  activeName: string;
  breadCrumbs: Array<BreadCrumb>;
};

function BreadCrumbs(props: Props) {
  const { breadCrumbs, activeName } = props;
  return (
    <div className="container-fluid">
      <ul className="breadcrumb">
        {breadCrumbs.map((bc) => (
          <li key={bc.key} className="breadcrumb-item">
            <Link to={bc.path}>{bc.name}</Link>
          </li>
        ))}
        <li className="breadcrumb-item active">{activeName}</li>
      </ul>
    </div>
  );
}

export default BreadCrumbs;

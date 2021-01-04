import React from 'react';

interface Props {
  children: React.ReactNode;
}

function Select(props: Props) {
  const { children, ...rest } = props;
  return <select {...rest}>{children}</select>;
}

export default Select;

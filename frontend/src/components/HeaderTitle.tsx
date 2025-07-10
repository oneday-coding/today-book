import React from 'react';

interface Props {
  title: string | React.ReactNode;
}

function HeaderTitle({ title }: Props) {
  return <h1 className="absolute left-1/2 -translate-x-1/2 flex-1 text-center text-lg text-textPrimary">{title}</h1>;
}

export default HeaderTitle;
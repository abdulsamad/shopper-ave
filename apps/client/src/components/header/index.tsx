import React from 'react';

interface IProps {
  opened: boolean;
  toggleOpen: () => void;
}

const Index = ({ opened, toggleOpen }: IProps) => {
  return (
    <h1>
      <div>Hello</div>
    </h1>
  );
};

export default Index;

import React, { FunctionComponent } from 'react';
import { List as MuiList } from '@material-ui/core';

import { Item as ItemDefinition } from '../../definitions/types';
import Item from './Item/Item';

interface CharacterListProps {
  items: Partial<ItemDefinition>[];
  onChange?: Function;
  checked?: number[];
  hasCheckBox: boolean;
}

const List: FunctionComponent<CharacterListProps> = ({ items, onChange, hasCheckBox, checked }) => {
  return (
    <MuiList dense>
      {items.map(item => {
        return <Item item={item} hasCheckBox={hasCheckBox} onChange={onChange} checked={checked} />;
      })}
    </MuiList>
  );
};

export default List;

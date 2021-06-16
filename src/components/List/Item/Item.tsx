import React, { FunctionComponent } from 'react';
import {
  Avatar,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Item as ItemDefinition } from '../../../definitions/types';

interface CharacterItemProps {
  item: Partial<ItemDefinition>;
  onChange?: Function;
  checked?: number[];
  hasCheckBox: boolean;
}

const Item: FunctionComponent<CharacterItemProps> = ({ item, onChange, checked, hasCheckBox }) => {
  const { id, name, logo } = item;
  return (
    <ListItem key={id || name} button>
      {logo && (
        <ListItemAvatar>
          <Avatar alt={`Image ${name}`} src={logo} />
        </ListItemAvatar>
      )}
      <ListItemText primary={name} />
      {hasCheckBox && (
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            onChange={onChange && onChange(id)}
            checked={checked?.indexOf(id as number) !== -1}
          />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default Item;

import React from 'react';
import { Avatar, Panel } from 'rsuite';
import { Art, Floor, Insertable, VariableInsertable } from './definitions/acnh';
import { parseVariation, realId } from './utils/itemCodes';
import { hasColor, isArt, isFloor, isGarment, isRecipe, isVariableInsertable } from './utils/items';
import { decimalToHex } from './utils/numeric';

interface ItemShowProps {
  item: Insertable
  small?: boolean
  onClick?: () => any
}

function firstLineData(item: Insertable | Art | VariableInsertable) {
  if (isArt(item)) {
    return `Genuine: ${item.Genuine}`
  }
  if (isVariableInsertable(item)) {
    return `Variation: ${item.Variation}`
  }
  if (isGarment(item)) {
    return `Style: ${item.Style}`
  }
  if (isFloor(item)) {
    return `Concept #1: ${item["HHA Concept 1"]}`
  }
  return `Version Unlocked: ${item["Version Unlocked"]}`
}

function lastLineData(item: Insertable | Art | VariableInsertable | Floor) {
  if (isArt(item)) {
    return `Tag: ${item.Tag}`
  }
  if (isVariableInsertable(item)) {
    return `Variation: 0x${parseVariation(item["Variant ID"])}`
  }
  if (isFloor(item)) {
    return `Concept #2: ${item["HHA Concept 2"]}`
  }
  if (isRecipe(item)) {
    return <Avatar src="https://acnhcdn.com/latest/MenuIcon/BookRecipe.png" alt="R" />
  }
  return `Source: ${item.Source}`
}

export function ItemShow(props: ItemShowProps) {
  const { item, small = false, onClick = () => { } } = props;
  const iconHeight = small ? 90 : 240;
  return (
    <Panel bordered bodyFill onClick={onClick} className="acitem">
      <img src={item.Image} height={iconHeight} alt={`${item.Name}`} />
      <Panel header={item.Name}>
        <p>
          <small>{firstLineData(props.item)} <br />{hasColor(item) && <>Color 1: {item["Color 1"]} <br />Color 2: {item["Color 2"]} <br /></>}{lastLineData(item)}</small>
        </p>
      </Panel>
    </Panel>
  );
}

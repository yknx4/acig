import React from 'react'
import { Panel } from 'rsuite'
import { Items, Variant } from './items/items'

interface ItemShowProps {
  item: Items
  variant: Variant
  small?: boolean
  onClick?: () => any
}

export function ItemShow(props: ItemShowProps) {
  const { item, variant, small = false, onClick = () => {} } = props
  const iconHeight = small ? 90 : 240
  return (
    <Panel bordered bodyFill onClick={onClick} className="acitem">
      <img
        src={variant.image ?? variant.albumImage ?? variant.storageImage ?? ''}
        height={iconHeight}
        alt={`${item.name} ${variant.variation ?? ''}`}
      />
      <Panel header={item.name}>
        <p>
          {variant.colors.length > 0 && <small>Colors: {variant.colors.join(', ')}</small>}
          {variant.themes.length > 0 && <small>Themes: {variant.themes.join(', ')}</small>}
          <small>Source: {variant.source.join(', ')}</small>
        </p>
      </Panel>
    </Panel>
  )
}

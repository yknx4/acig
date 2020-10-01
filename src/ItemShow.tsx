import { toPairs } from 'lodash'
import React from 'react'
import { Panel } from 'rsuite'
import { Items, Variant } from './items/items'
import { Recipes } from './items/recipes'
import { isRecipe, isVariant } from './utils/items'

interface ItemShowProps {
  item: Items
  variant: Variant | Recipes
  small?: boolean
  onClick?: () => any
}

export function ItemShow(props: ItemShowProps) {
  const { item, variant, small = false, onClick = () => {} } = props
  const iconHeight = small ? 90 : 240
  const image = isRecipe(variant) ? variant.image : variant.image ?? variant.albumImage ?? variant.storageImage ?? ''
  const alt = isRecipe(variant) ? 'recipe' : variant.variation ?? ''
  return (
    <Panel bordered bodyFill onClick={onClick} className="acitem">
      <img src={image} height={iconHeight} alt={`${item.name} ${alt}`} />
      <Panel header={isRecipe(variant) ? `${variant.name} recipe` : item.name}>
        {isVariant(variant) && (
          <p>
            {variant.colors.length > 0 && <small>Colors: {variant.colors.join(', ')}</small>}
            {variant.themes.length > 0 && <small>Themes: {variant.themes.join(', ')}</small>}
            <small>Source: {variant.source.join(', ')}</small>
          </p>
        )}
        {isRecipe(variant) && (
          <p>
            <small>Materials: {toPairs(variant.materials).map(m => `${m[0]}: ${m[1]}`).join(', ')}</small>
            <small>Source: {variant.source.join(', ')}</small>
          </p>
        )}
      </Panel>
    </Panel>
  )
}

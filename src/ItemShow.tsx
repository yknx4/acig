import { map } from 'lodash'
import React, { Fragment } from 'react'
import { AnyItem } from './utils/definitions'
import { isRecipe, isVariant } from './utils/items'

interface ItemShowProps {
  variant: AnyItem
  small?: boolean
  onClick?: () => any
  onDoubleClick?: () => any
}

export function ItemShow(props: ItemShowProps) {
  const { variant, small = false, onClick = () => { }, onDoubleClick = () => {} } = props
  const iconHeight = small ? 90 : 240
  const image = isRecipe(variant) ? variant.image : variant.image ?? variant.albumImage ?? variant.storageImage ?? ''
  const alt = isRecipe(variant) ? 'recipe' : variant.variation ?? ''
  return (
    <div className="box">
      <article className="media" onClick={onClick} onDoubleClick={onDoubleClick}>
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={image} height={iconHeight} alt={`${variant.name} ${alt}`} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p className="is-small">
              <strong>{isRecipe(variant) ? `${variant.name} recipe` : variant.name}</strong><br />
              {isRecipe(variant) && <>
                {variant.category}<br />

                {map(variant.materials, (v, k) => <Fragment key={`mat-${variant.uniqueEntryId}-${k}`}>{k}: {v}<br /></Fragment>)}

              </>}
              {isVariant(variant) && <>
                {variant.genuine !== undefined && <>{variant.genuine ? 'Genuine' : 'Fake'}<br /></>}
                {variant.colors.join(', ')}<br />
                {variant.themes.join(', ')}<br />
              </>}
            </p>
          </div>
        </div>
      </article >
    </div >
  )
}

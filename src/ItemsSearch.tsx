import React, { useState, useEffect } from 'react'
import { Items } from './items/items'
import untypedItems from './items/items.json'
import untypedRecipes from './items/recipes.json'
import Fuse from 'fuse.js'
import { memoize, flatMap } from 'lodash'
import { InvertedVariant, AnyItem } from './utils/definitions'
import { Input } from 'antd'
import { ItemShow } from './ItemShow'
import {SearchOutlined} from '@ant-design/icons'
import { inflateRecipes } from './utils/items'
import { Recipes } from './items/recipes'

const items: Items[] = untypedItems as Items[]
const recipes = (untypedRecipes as unknown as Recipes[]).map(inflateRecipes)
const processedItems: InvertedVariant[] = flatMap(items, ({ variants, ...item }) => variants.map(v => ({ ...v, item, name: item.name })))
export const allItems: AnyItem[] = [...processedItems, ...recipes].filter(i => i.item?.unlocked ?? true)

const options = {
  includeScore: true,
  keys: [
    {
      name: 'name',
      weight: 5
    },
    {
      name: 'variants.variation',
      weight: 2
    },
    {
      name: 'variants.colors',
      weight: 2
    },
    {
      name: 'variants.pattern',
      weight: 2
    },
    {
      name: 'tag',
      weight: 2
    },
    'curtainType',
    'curtainColor',
    'style1',
    'style2',
    'primaryShape',
    'secondaryShape',
    'type',
    'category',
    'hhaCategory'
  ]
}

const myIndex = Fuse.createIndex(options.keys, allItems)
const fuse = new Fuse(allItems, options, myIndex)
const searcher = memoize((value: string) => fuse.search(value, { limit: 30 }))

export interface ItemsSearchProps {
  onSelect(item: AnyItem): void
  onSecondarySelect(item: AnyItem): void
}
export function ItemsSearch(props: ItemsSearchProps) {
  const { onSelect, onSecondarySelect = () => {} } = props
  const [matchedOptions, setMatchedOptions] = useState<AnyItem[]>([])
  const [search, doSearch] = useState<string>('')
  useEffect(() => {
    const result = searcher(search)
    setMatchedOptions(result.map(r => r.item))
  }, [search])

  const options: AnyItem[] = [...matchedOptions]

  return (
    <div className="tile is-ancestor">
      <div className="tile is-12 is-vertical">
        <div className="tile">
          <Input placeholder="input search text" onChange={(e) => doSearch(e.target.value)} defaultValue={search} addonAfter={<SearchOutlined />}/>
        </div>
        {options.map(o => <div key={`result-${o.uniqueEntryId}`} className='tile'><ItemShow variant={o} onDoubleClick={() => onSecondarySelect(o)} onClick={() => onSelect(o)} /></div>)}
      </div>
    </div>
  );
}

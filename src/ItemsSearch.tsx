import React, { useState, useEffect } from 'react'
import { Items, Variant } from './items/items'
import untypedItems from './items/items.json'
import { Recipes } from './items/recipes'
import untypedRecipes from './items/recipes.json'
import Fuse from 'fuse.js'
import Select, { createFilter, ValueType } from "react-select";
import { memoize, flatMap } from 'lodash'
import { isRecipe, isVariant } from './utils/items'
import { InvertedVariant, AnyItem } from './utils/definitions'

const items: Items[] = untypedItems as Items[]
const recipes: Recipes[] = untypedRecipes as unknown as Recipes[]
const processedItems: InvertedVariant[] = flatMap(items, ({ variants, ...item }) => variants.map(v => ({ ...v, item, name: item.name })))
export const allItems: AnyItem[] = [...processedItems, ...recipes]

function createLabel(value: AnyItem) {
  if (isRecipe(value)) {
    return `${value.name} recipe`
  }
  if (isVariant(value)) {
    const postfix = value.colors.length > 0 ? ` - ${value.colors.join('&')}` : ''
    if (value.genuine !== undefined) {
      return `${value.genuine ? 'Genuine' : 'Fake'} ${value.name}${postfix}`
    }
    if (value.variation != null) {
      return `${value.variation} ${value.name}${postfix}`
    }
    return value.name + postfix
  }
  return 'SHOULD NOT HAPPEN'
}


interface AnyItemOption {
  value: string
  label: string
  data: AnyItem
}

const options = {
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
const searcher = memoize((value: string) => fuse.search(value, { limit: 20 }))

type FilterOption = ReturnType<typeof createFilter>

const fuseFilter: FilterOption = (option, rawInput) => searcher(rawInput).find(r => r.item.uniqueEntryId === option.value) != null

const selectOptions: AnyItemOption[] = allItems.map(i => ({ value: i.uniqueEntryId, data: i, label: createLabel(i) }))

export interface ItemsSearchProps {
  onSelect(item: AnyItem): void
}
export function ItemsSearch(props: ItemsSearchProps) {
  const { onSelect } = props
  const [selectedOption, setSelectedOption] = useState<ValueType<AnyItemOption> | undefined | null>(undefined);
  useEffect(() => {
    if (selectedOption != null) {
      onSelect((selectedOption as AnyItemOption).data)
    }
  }, [selectedOption, onSelect])

  return (
    <Select
      isClearable
      isSearchable
      defaultValue={selectedOption}
      filterOption={fuseFilter}
      onChange={(value) => setSelectedOption(value)}
      options={selectOptions}
    />
  );
}

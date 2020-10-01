import React, { useState } from 'react'
import 'rsuite/dist/styles/rsuite-default.css'
import './App.css'
import { Col, Content, Footer, Grid, Header, Row, SelectPicker, SelectPickerProps, Container, Icon, Nav, Navbar, Sidebar, Button } from 'rsuite'

import { fromPairs, map } from 'lodash'
import leafLogo from './assets/leaf-logo.png'
import { formatCheat } from './utils/formatCheat'
import { ItemShow } from './ItemShow'
import { range, flatMap } from 'lodash'
import untypedItems from './items/items.json'
import untypedRecipes from './items/recipes.json'
import { Items, Category, Variant } from './items/items'
import { Recipes } from './items/recipes'

interface Selection {
  item: Items
  selected: Variant | Recipes
}

const items: Items[] = untypedItems as Items[]
const recipes: Recipes[] = untypedRecipes as unknown as Recipes[]
const allPossibleSelections: Array<Pick<Variant | Recipes, 'uniqueEntryId'>> = [...flatMap(items.map((i) => i.variants)), ...recipes]
const mapToItems: Record<string, string> = fromPairs([...flatMap(items.map((i) => i.variants.map((v) => [v.uniqueEntryId, i.name]))), ...recipes.map(r => [r.uniqueEntryId, r.name])])

const getSelection = (variant: Variant | Recipes): Selection => ({
  selected: variant,
  item: items.find((i) => i.name === mapToItems[variant.uniqueEntryId]) as Items
})

function itemLabel(item: Items, variant: Variant) {
  const postfix = variant.colors.length > 0 ? ` - ${variant.colors.join('&')}` : ''
  if (variant.genuine !== undefined) {
    return `${variant.genuine ? 'Genuine' : 'Fake'} ${item.name}${postfix}`
  }
  if (variant.variation != null) {
    return `${variant.variation} ${item.name}${postfix}`
  }
  return item.name + postfix
}

const dataa: SelectPickerProps['data'] = [...flatMap(
  items.map((m) =>
    m.variants.map((v) => ({
      role: m.name,
      value: v.uniqueEntryId,
      label: itemLabel(m, v)
    }))
  )
), ...recipes.map(r => ({
  role: r.name,
  value: r.uniqueEntryId,
  label: `${r.name} - Recipe`
}))]

interface EmptyItemProps {
  slot: number
  onClick?: () => any
}

function EmptyItem(props: EmptyItemProps) {
  const { onClick = () => {} } = props
  const emptyItem: Items = {
    name: `Empty Slot #${props.slot + 1}`,
    sourceSheet: Category.Other,
    variants: []
  }
  const variant: Variant = {
    image: leafLogo,
    filename: '',
    uniqueEntryId: '',
    colors: [],
    themes: [],
    source: [],
    internalId: 0,
    buy: 0,
    sell: 0
  }
  return <ItemShow small={true} onClick={onClick} item={emptyItem} variant={variant} />
}

const cellIndex = (row: number, column: number) => row * 10 + column

interface InventoryGrid {
  selectedItems: Record<number, Selection>
  fillCell: (row: number, col: number) => void
}

function InventoryGrid(props: InventoryGrid) {
  const { selectedItems, fillCell } = props
  return (
    <Grid fluid>
      <Row>
        {[0, 1, 2, 3].map((rowIndex) => (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((columnIndex) => (
              <Col xs={6} key={`column-${rowIndex}-${columnIndex}`}>
                {selectedItems[cellIndex(rowIndex, columnIndex)] === undefined ? (
                  <EmptyItem onClick={() => fillCell(rowIndex, columnIndex)} slot={cellIndex(rowIndex, columnIndex)} />
                ) : (
                  <ItemShow onClick={() => fillCell(rowIndex, columnIndex)} small={true} item={selectedItems[cellIndex(rowIndex, columnIndex)].item} variant={selectedItems[cellIndex(rowIndex, columnIndex)].selected}/>
                )}
              </Col>
            ))}
          </>
        ))}
      </Row>
    </Grid>
  )
}

const defaultSelection: Selection = Object.freeze({
  item: items[0],
  selected: items[0].variants[0]
})

function Main() {
  const [selectedItem, selectItem] = useState<Selection>(defaultSelection)
  const [selectedItems, selectItemInCell] = useState<Record<number, Selection>>({})

  const nextEmptyIndex = range(40).find((i) => selectedItems[i] === undefined) ?? 0
  const selectAcItem = (uid: string) => {
    selectItem(getSelection(allPossibleSelections.find((v) => v.uniqueEntryId === uid) as Variant) ?? defaultSelection)
  }
  const fillIndex = (index: number) => selectItemInCell({ ...selectedItems, [index]: selectedItem })
  const fillCell = (row: number, column: number) => fillIndex(cellIndex(row, column))
  const fillEmpty = () => fillIndex(nextEmptyIndex)
  return (
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Header>
            <img src={leafLogo} className="logo" alt="Animal Crossing New Horizons Inventory Generator Logo" />
          </Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item icon={<Icon icon="home" />}>AC:NH Inventory Generator V1.5.0</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Header>
      <Container>
        <Sidebar>
          <SelectPicker data={dataa} groupBy="role" style={{ width: '100%' }} onSelect={selectAcItem} />
          <ItemShow item={selectedItem.item} variant={selectedItem.selected}/>
          <Button disabled={Object.values(selectedItems).length >= 40} onClick={fillEmpty}>
            Fill Next Empty
          </Button>
        </Sidebar>
        <Content>
          <Grid fluid>
            <Row className="show-grid">
              <Col xs={24} sm={12} md={16} lg={18}>
                <InventoryGrid selectedItems={selectedItems} fillCell={fillCell} />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <pre>
                  {`[CHEAT CODE]\n`}
                  {map(selectedItems, (k, v) => formatCheat(k.selected, v))}
                </pre>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>

      <Footer>No rights reserved. Do whatever the f*** do you want. Ale Ornelas 2020</Footer>
    </Container>
  )
}

export default Main

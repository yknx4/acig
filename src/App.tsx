import React, { useState } from 'react'
import 'rsuite/dist/styles/rsuite-default.css'
import './App.css'
import { Col, Content, Footer, Grid, Header, Row, SelectPicker, SelectPickerProps, Container, Icon, Nav, Navbar, Sidebar, Button } from 'rsuite'
import misc from './data/csv_img/miscellaneous.csv.json'
import hw from './data/csv_img/housewares.csv.json'
import wm from './data/csv_img/wall-mounted.csv.json'
import ar from './data/csv_img/art.csv.json'
import acc from './data/csv_img/accessories.csv.json'
import ba from './data/csv_img/bags.csv.json'
import bo from './data/csv_img/bottoms.csv.json'
import co from './data/csv_img/clothing other.csv.json'
import du from './data/csv_img/dress-up.csv.json'
import fl from './data/csv_img/floors.csv.json'
import hew from './data/csv_img/headwear.csv.json'
import mu from './data/csv_img/music.csv.json'
import pho from './data/csv_img/photos.csv.json'
import po from './data/csv_img/posters.csv.json'
import ru from './data/csv_img/rugs.csv.json'
import sh from './data/csv_img/shoes.csv.json'
import so from './data/csv_img/socks.csv.json'
import to from './data/csv_img/tools.csv.json'
import top from './data/csv_img/tops.csv.json'
import um from './data/csv_img/umbrellas.csv.json'
import wp from './data/csv_img/wallpaper.csv.json'
import rp from './data/csv_img/recipes.csv.json'
import { map } from 'lodash'
import leafLogo from './assets/leaf-logo.png'
import { formatCheat } from './utils/formatCheat'
import { ItemShow } from './ItemShow'
import { Art, Floor, Garment, Insertable, Recipe, VariableInsertable } from './definitions/acnh'
import { hasColor, isArt, isVariableInsertable, isRecipe } from './utils/items'
import { range } from 'lodash'
import { temp1_5IRecipes, temp1_5Items } from './data/items-1-5'

const photos: Array<VariableInsertable> = pho
const miscellaneous: Array<VariableInsertable> = misc
const houseware: Array<VariableInsertable> = hw
const wallmounted: Array<VariableInsertable> = wm
const art: Array<Art> = ar as Array<Art>
const accessories: Array<Garment> = acc
const bags: Array<Garment> = ba
const bottoms: Array<Garment> = bo
const clothingOther: Array<Garment> = co
const dressUp: Array<Garment> = du
const floors: Array<Floor> = fl
const headware: Array<Garment> = hew
const music: Array<Insertable> = mu
const posters: Array<Insertable> = po
const rugs: Array<Floor> = ru
const shoes: Array<Garment> = sh
const socks: Array<Garment> = so
const tops: Array<Garment> = top
const umbrellas: Array<Insertable> = um
const tools: Array<VariableInsertable> = to
const wallpapers: Array<Insertable> = wp
const recipes: Array<Recipe> = rp

const itemsPool: Insertable[] = [
  ...shoes,
  ...socks,
  ...tops,
  ...umbrellas,
  ...tools,
  ...wallpapers,
  ...miscellaneous,
  ...houseware,
  ...wallmounted,
  ...art,
  ...accessories,
  ...bags,
  ...bottoms,
  ...clothingOther,
  ...dressUp,
  ...floors,
  ...headware,
  ...music,
  ...photos,
  ...posters,
  ...rugs,
  ...recipes,
  ...temp1_5IRecipes,
  ...temp1_5Items
]

function itemLabel(item: Insertable | Art | VariableInsertable) {
  const postfix = hasColor(item) ? ` - ${item['Color 1']} ${item['Color 2']}` : ''
  if (isArt(item)) {
    return `${item.Genuine === 'Yes' ? 'Genuine' : 'Fake'} ${item.Name}${postfix}`
  }
  if (isVariableInsertable(item)) {
    return `${item.Variation} ${item.Name}${postfix}`
  }
  if (isRecipe(item)) {
    return `${item.Name} - Recipe`
  }
  return item.Name + postfix
}

const dataa: SelectPickerProps['data'] = itemsPool.map((m) => ({
  value: m['Unique Entry ID'],
  label: itemLabel(m),
  role: m.Name
}))

interface EmptyItemProps {
  slot: number
  onClick?: () => any
}

function EmptyItem(props: EmptyItemProps) {
  const { onClick = () => {} } = props
  const emptyItem: Insertable = {
    Name: `Empty Slot #${props.slot + 1}`,
    Image: leafLogo,
    'Internal ID': '',
    'Unique Entry ID': '',
    Source: '',
    'Version Unlocked': '0.0.0'
  }
  return <ItemShow small={true} onClick={onClick} item={emptyItem} />
}

const cellIndex = (row: number, column: number) => row * 10 + column

interface InventoryGrid {
  selectedItems: Record<number, Insertable>
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
                  <ItemShow onClick={() => fillCell(rowIndex, columnIndex)} small={true} item={selectedItems[cellIndex(rowIndex, columnIndex)]} />
                )}
              </Col>
            ))}
          </>
        ))}
      </Row>
    </Grid>
  )
}

function Main() {
  const [selectedItem, selectItem] = useState(itemsPool[0])
  const [selectedItems, selectItemInCell] = useState<Record<number, Insertable>>({})

  const nextEmptyIndex = range(40).find((i) => selectedItems[i] === undefined) ?? 0
  const selectAcItem = (uid: string) => {
    selectItem(itemsPool.find((m) => m['Unique Entry ID'] === uid) ?? itemsPool[0])
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
          <ItemShow item={selectedItem} />
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
                  {map(selectedItems, (k, v) => formatCheat(k, v))}
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

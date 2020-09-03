import React, { useState } from 'react';
import 'rsuite/dist/styles/rsuite-default.css'
import './App.css'
import { Col, Content, Footer, Grid, Header, Panel, Row, SelectPicker, SelectPickerProps, Container, Icon, Nav, Navbar } from 'rsuite'
import idData from './data/ACNH/item_ids/items_USen.json'
import misc from './data/csv_img/miscellaneous.csv.json'
import hw from './data/csv_img/housewares.csv.json'
import wm from './data/csv_img/wall-mounted.csv.json'
import { map } from 'lodash';
import ot from './data/output_template.json'
import { parseVariation } from './utils/itemCodes';
import { decimalToHex } from './utils/numeric';
import leafLogo from './assets/leaf-logo.png'

const realId = (item: Insertable) => item["Internal ID"] !== '' ? idData.STR_ItemName_00_Ftr.find(ftr => ftr.name === item.Name)!.id[0] as number : 0;

interface Insertable {
  Name: string;
  Image: string;
  Variation: string;
  "Color 1": string;
  "Color 2": string;
  "Internal ID": string;
  "Unique Entry ID": string;
  "Variant ID": string;
}

const outputTemplate = ot as string[][]
const miscellaneous: Array<Insertable> = misc
const houseware: Array<Insertable> = hw
const wallmounted: Array<Insertable> = wm

const itemsPool = [...miscellaneous, ...houseware, ...wallmounted]

const dataa: SelectPickerProps['data'] = itemsPool.map(m => ({
  value: m['Unique Entry ID'],
  label: `${m.Variation} ${m.Name} - ${m["Color 1"]} ${m["Color 2"]}`,
  role: m.Name
}))

function formatCheat(item: Insertable, indexAsString: string) {
  const index = parseInt(indexAsString, 10)
  const template = outputTemplate[index]
  return `${template[0]} ${template[1]} ${parseVariation(item["Variant ID"])} ${decimalToHex(realId(item))}\n`
}

interface ItemShowProps {
  item: Insertable
  small?: boolean
  onClick?: () => any
}

function ItemShow(props: ItemShowProps) {
  const { item, small = false, onClick = () => { } } = props
  const iconHeight = small ? 90 : 240
  return (
    <Panel bordered bodyFill onClick={onClick} className="acitem">
      <img src={item.Image} height={iconHeight} />
      <Panel header={item.Name}>
        <p>
          <small>Variation: {item.Variation} <br/>Color 1: {item["Color 1"]} <br/>Color 2: {item["Color 2"]} <br/>ItemId: 0x{decimalToHex(realId(item))} <br/>Variation: 0x{parseVariation(item["Variant ID"])}</small>
        </p>
      </Panel>
    </Panel>
  )
}

interface EmptyItemProps {
  slot: number
  onClick?: () => any
}

function EmptyItem(props: EmptyItemProps) {
  const { onClick = () => { } } = props
  const emptyItem: Insertable = {
    Name: `Empty Slot #${props.slot + 1}`,
    Image: leafLogo,
    Variation: 'NA',
    "Color 1": '',
    "Color 2": '',
    "Internal ID": '',
    "Unique Entry ID": '',
    "Variant ID": ''
  }
  return <ItemShow small={true} onClick={onClick} item={emptyItem}/>
}

const cellIndex = (row: number, column: number) => (row * 10) + column

interface InventoryGrid {
  selectedItems: Record<number, Insertable>
  fillCell: (row: number, col: number) => void
}

function InventoryGrid(props: InventoryGrid) {
  const { selectedItems, fillCell } = props
  return (
    <Grid fluid>
      <Row>
        {[0, 1, 2, 3].map(rowIndex => (<>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(columnIndex => (
            <Col xs={6} key={`column-${rowIndex}-${columnIndex}`}>
              { selectedItems[cellIndex(rowIndex, columnIndex)] === undefined ? <EmptyItem onClick={() => fillCell(rowIndex, columnIndex)} slot={cellIndex(rowIndex, columnIndex)} /> : <ItemShow onClick={() => fillCell(rowIndex, columnIndex)} small={true} item={selectedItems[cellIndex(rowIndex, columnIndex)]} />}
            </Col>
          ))}
        </>)
        )}
      </Row>
    </Grid>
  )
}

function Main() {
  const [selectedItem, selectItem] = useState(itemsPool[0])
  const [selectedItems, selectItemInCell] = useState<Record<number, Insertable>>({})
  console.log(selectedItem)

  const selectAcItem = (uid: string) => { selectItem(itemsPool.find(m => m["Unique Entry ID"] === uid) ?? itemsPool[0]) }
  const fillCell = (row: number, column: number) => selectItemInCell({ ...selectedItems, [cellIndex(row, column)]: selectedItem })
  return (
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Header>
            <img src={leafLogo} className="logo" />
          </Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item icon={<Icon icon="home" />}>AC:NH Inventory Generator</Nav.Item>
            </Nav>
            <Nav pullRight>
              <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Header>
      <Content>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={24} sm={24} md={8} lg={6}>
              <SelectPicker data={dataa} groupBy="role" style={{ width: '100%' }} onSelect={selectAcItem} />
              <ItemShow item={selectedItem} />
            </Col>
            <Col xs={24} sm={12} md={8} lg={12}>
              <InventoryGrid selectedItems={selectedItems} fillCell={fillCell} />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <pre>
                {`[CHEAT CODE]\n`}
                {map(selectedItems, formatCheat)}
              </pre>
            </Col>
          </Row>
        </Grid>
      </Content>
      <Footer>No rights reserved. Do whatever the f*** do you want. Ale Ornelas 2020</Footer>
    </Container>
  )
}

export default Main;

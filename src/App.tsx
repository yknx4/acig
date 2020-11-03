import React, { useState } from 'react'
import 'rsuite/dist/styles/rsuite-default.css'
import './App.css'
import { Col, Content, Footer, Grid, Header, Row, Container, Icon, Nav, Navbar, Sidebar, Button } from 'rsuite'
import { map } from 'lodash'
import leafLogo from './assets/leaf-logo.png'
import { formatCheat } from './utils/formatCheat'
import { ItemShow } from './ItemShow'
import { range } from 'lodash'
import { Category } from './items/items'
import { allItems, ItemsSearch } from './ItemsSearch'
import { AnyItem } from './utils/definitions'

interface EmptyItemProps {
  slot: number
  onClick?: () => any
}

function EmptyItem(props: EmptyItemProps) {
  const { onClick = () => { } } = props

  const variant: AnyItem = {
    name: `Empty Slot #${props.slot + 1}`,
    item: {
      name: `Empty Slot #${props.slot + 1}`,
      sourceSheet: Category.Other
    },
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
  return <ItemShow small={true} onClick={onClick} variant={variant} />
}

const cellIndex = (row: number, column: number) => row * 10 + column

interface InventoryGrid {
  selectedItems: Record<number, AnyItem>
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
                    <ItemShow onClick={() => fillCell(rowIndex, columnIndex)} small={true} variant={selectedItems[cellIndex(rowIndex, columnIndex)]} />
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
  const [selectedItem, selectItem] = useState<AnyItem>(allItems[0])
  const [selectedItems, selectItemInCell] = useState<Record<number, AnyItem>>({})

  const nextEmptyIndex = range(40).find((i) => selectedItems[i] === undefined) ?? 0
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
          <ItemsSearch onSelect={(item) => { selectItem(item) }} />
          <ItemShow variant={selectedItem} />
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

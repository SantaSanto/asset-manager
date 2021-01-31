import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'

export default function Home() {
  return (
    <CardColumns>
      <Card bg="dark" text='black'>
        <Card.Body>
          <Card.Title><b>ALL ASSET</b></Card.Title>
          <Card.Text>Collection of financial instruments like stocks, bonds, mutual funds and fixed income.</Card.Text>
          <Card.Link href='/asset-form?mode=NEW'>ADD</Card.Link>
          <Card.Link href='/asset-list'>VIEW</Card.Link>
        </Card.Body>
      </Card>

      <Card bg="dark" text='black'>
        <Card.Body>
          <Card.Title><b>WELFARE FUND</b></Card.Title>
          <Card.Text>Balanced portfolio of equity, debt, fixed and bullion assets to fund retirement savings.</Card.Text>          
          <Card.Link href='/asset-list?portfolio=WELFARE'>VIEW</Card.Link>
        </Card.Body>
      </Card>



      <Card bg="dark" text='black'>
        <Card.Body>
          <Card.Title><b>EXIGENCY FUND</b></Card.Title>
          <Card.Text>A corpus to tackle emergencies at crisis or at unexpected and unplanned scenarios.</Card.Text>          
          <Card.Link href='/asset-list?portfolio=EXIGENCY'>VIEW</Card.Link>
        </Card.Body>
      </Card>

      <Card bg="dark" text='black'>
        <Card.Body>
          <Card.Title><b>RETIRMENT FUND</b></Card.Title>
          <Card.Text>Investment plans for post-retirement needs such as living and medical expenses to ensure secure financial independence.</Card.Text>          
          <Card.Link href='/asset-list?portfolio=RETIRMENT'>VIEW</Card.Link>
        </Card.Body>
      </Card>

      <Card bg="dark" text='black'>
        <Card.Body>
          <Card.Title><b>EDUCATION FUND</b></Card.Title>
          <Card.Text>Savings to manage ongoing school expenses like tution, books, uniform and amenities fees.</Card.Text>          
          <Card.Link href='/asset-list?portfolio=EDUCATION'>VIEW</Card.Link>
        </Card.Body>
      </Card>

      <Card bg="dark" text='black'>
        <Card.Body>
          <Card.Title><b>RELIANT FUND</b></Card.Title>
          <Card.Text>Collection of financial instruments like bonds and fixed income assets inherited from parents.</Card.Text>          
          <Card.Link href='/asset-list?portfolio=RELIANT'>VIEW</Card.Link>
        </Card.Body>
      </Card>

      <Card bg="dark" text='black'>
        <Card.Body>
          <Card.Title><b>CHILDREN FUND</b></Card.Title>
          <Card.Text>Financial advantages to manage children future educational and marriage expenses.</Card.Text>          
          <Card.Link href='/asset-list?portfolio=CHILDREN'>VIEW</Card.Link>
        </Card.Body>
      </Card>
    </CardColumns>
  )
}



export async function getServerSideProps(context) {  
  const _breadcrumb = { key:'HOME', title: 'ASSET MANAGER', href: '/', active: true }

  return {
    props: {
      breadcrumb: _breadcrumb
    },
  }
}
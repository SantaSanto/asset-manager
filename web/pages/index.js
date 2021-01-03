import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'

export default function Home() {
  return (
    <CardColumns>
      <Card bg="dark" text='white'>
        <Card.Body>
          <Card.Title><b>PORTFOLIO</b></Card.Title>
          <Card.Text>Collection of financial instruments like stocks, bonds, mutual funds and fixed income assets.</Card.Text>
          <Card.Link href="/portfolio">VIEW</Card.Link>
        </Card.Body>
      </Card>


      <Card bg="dark" text='white'>
        <Card.Body>
          <Card.Title><b>ASSET</b></Card.Title>
          <Card.Text>Financial instruments like stocks, bonds, mutual funds and fixed income.</Card.Text>
          <Card.Link href="/asset/add">ADD</Card.Link>
          <Card.Link href="/asset/list-view">VIEW</Card.Link>
        </Card.Body>
      </Card>
      
    </CardColumns>
  )
}

export async function getServerSideProps(context) {
  const _breadcrumbs = [
    { title: 'ASSET MANAGER', href:'#', active:true }
  ]

  return {
    props: {
      breadcrumbs: _breadcrumbs
    }, 
  }
}
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'

export default function Home() {
  return (
    <div>

      <div className='table-bar'>
      <Form>
        <Form.Row>
          <Col xs={8}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>SEARCH</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl />
            </InputGroup>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>GROUP BY</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select">
                <option>INSTRUMENT</option>
                <option>...</option>
              </Form.Control>

            </InputGroup>
          </Col>
        </Form.Row>
      </Form>
      </div>

      <Table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>ASSETS</th>
            <th>INVESTED <i className="fa fa-long-arrow-down" aria-hidden="true"></i></th>
            <th>CURRENT</th>
            <th>PROFIT</th>
            <th>ROI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href='#'>EXIGENCY</a>
            </td>
            <td>25</td>
            <td>200,000</td>
            <td>210,000</td>
            <td>10,000</td>
            <td>2.15</td>
          </tr>
          <tr>
            <td>WELFARE</td>
            <td>25</td>
            <td>200,000</td>
            <td>210,000</td>
            <td>10,000</td>
            <td>2.15</td>
          </tr>
        </tbody>
      </Table>
    </div>

  )
}

export async function getServerSideProps(context) {
  const _breadcrumbs = [
    { title: 'ASSET MANAGER', href: "/" },
    { title: 'PORTFOLIO', href: "/portfolio" },
    { title: 'EXIGENCY', href: '#', active: true },
  ]

  return {
    props: {
      breadcrumbs: _breadcrumbs
    },
  }
}

import createConnection from '../utils/db'
import Table from 'react-bootstrap/Table'

export default function Portfolio() {
  return (
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
            <a href='/portfolioDetails'>EXIGENCY</a>
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
    </Table >
  )
}

export async function getServerSideProps(context) {
  const _breadcrumbs = [
    { title: 'ASSET MANAGER', href: "/" },
    { title: 'PORTFOLIO', href: "#", active: true },
  ]

  const connection = createConnection()
  connection.connect()

  connection.query('SELECT ID, NAME, ASSETS, INVESTED, CURRENT, ROI FROM PORTFOLIO', 
    function (error, results) {
      if (error) throw error;
      console.log('The solution is: ', results)
    }
  );

  connection.end();

  return {
    props: {
      breadcrumbs: _breadcrumbs
    },
  }
}
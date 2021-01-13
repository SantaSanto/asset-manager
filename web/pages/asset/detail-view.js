import Table from 'react-bootstrap/Table'
import TableHeader from '../../components/table/TableHeader'

const tableHeader = {
    label: ['INVESTED', 'CURRENT', 'PROFIT', 'ROI'],
    align: ['right', 'right', 'right', 'right']
}

export default function DetailsView(prop) {
    return (
        <Table bordered size='sm'>
            <tbody>
                <tr>
                    <th className="text-right">NAME</th> <td className='ad-td'>ABCDEFGHIJKLMNOPQRSTUVWXYZ</td>                    
                    <th className="text-right">INVESTED</th> <td className="ad-td">10,00,000</td>
                    <th className="text-right">START DATE</th> <td className='ad-td'>12-12-2020</td>
                    <th className="text-right">CODE</th> 
                    <td className='ad-td'>CX0101</td>
                    <td className='ad-td text-center'><a href='#'><i className="fa fa-pencil" aria-hidden="true"></i></a></td>
                </tr>
                <tr>                    
                    <th className="text-right">INSTRUMENT</th> <td className='ad-td'>FIXED DEPOSIT</td>               
                    <th className="text-right">CURRENT</th> <td className="ad-td">10,00,000</td>
                    <th className="text-right">END DATE</th> <td className='ad-td'>12-12-2020</td>
                    <th className="text-right">HOLDER</th> <td colSpan='2' className='ad-td'>SANTOSH</td>
                </tr>
                <tr>                                      
                    <th className="text-right">INSTITUTION</th> <td className='ad-td'>CITIBANK CITIBANK</td>  
                    <th className="text-right">PROFIT</th> <td className="ad-td">10,00,000</td>
                    <th className="text-right">ROI</th> <td className='ad-td'>12.56 %</td>
                    <th className="text-right">STATUS</th> <td colSpan='2' className='ad-td'>ACTIVE</td> 
                </tr>
            </tbody>
        </Table>
    )
}

export async function getServerSideProps(context) {
    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" },
        { title: 'ASSETS', href: "#", active: true },
    ]

    return {
        props: {
            breadcrumbs: _breadcrumbs
        }
    }
}
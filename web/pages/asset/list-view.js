import { FormProvider } from '../../components/form/FormProvider'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import TextField from '../../components/form/TextField'
import SelectField from '../../components/form/SelectField'

export default function ListView() {
    return (
        <div>
            <FormProvider model={{}}>
                <Form>
                    <Form.Row>
                        <TextField label='SEARCH' name='search' xs={7} />
                        <SelectField label='GROUP' name='group' options={[]} />
                        <SelectField label='ASSET STATUS' name='status' options={[]} />
                    </Form.Row>
                </Form>
            </FormProvider>
            <Table striped >
                <thead>
                    <tr>
                        <th>CODE</th>
                        <th>NAME</th>
                        <th>CATEGORY</th>
                        <th>INSTRUMENT</th>
                        <th>HOLDER</th>
                        <th class="text-right">INVESTED <i className="fa fa-long-arrow-down" aria-hidden="true"></i></th>                        
                        <th class="text-right">CURRENT</th>
                        <th class="text-right">PROFIT</th>
                        <th class="text-right">ROI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ZX1235</td>
                        <td>DEBT</td>
                        <td>HDFC ULTRA SHORT TERM</td>
                        <td>MUTUAL FUND</td>
                        <td>LAVANYA</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">12.5</td>
                    </tr>
                    <tr>
                        <td>ZX1235</td>
                        <td>DEBT</td>
                        <td>HDFC ULTRA SHORT TERM</td>
                        <td>MUTUAL FUND</td>
                        <td>LAVANYA</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">12.5</td>
                    </tr>
                    <tr>
                        <td>ZX1235</td>
                        <td>DEBT</td>
                        <td>HDFC ULTRA SHORT TERM</td>
                        <td>MUTUAL FUND</td>
                        <td>LAVANYA</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">12.5</td>
                    </tr>
                    <tr>
                        <td>ZX1235</td>
                        <td>DEBT</td>
                        <td>HDFC ULTRA SHORT TERM</td>
                        <td>MUTUAL FUND</td>
                        <td>LAVANYA</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">9.5</td>
                    </tr>
                    <tr>
                        <td>ZX1235</td>
                        <td>DEBT</td>
                        <td>HDFC ULTRA SHORT TERM</td>
                        <td>MUTUAL FUND</td>
                        <td>LAVANYA</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">10,00,000</td>
                        <td class="text-right">1.5</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan='5'></th>
                        <th class="text-right">10,00,000</th>
                        <th class="text-right">10,00,000</th>
                        <th class="text-right">10,00,000</th>
                        <th class="text-right">14.5</th>

                    </tr>
                </tfoot>
            </Table>
        </div>
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
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import { FormProvider } from '../../components/form/FormProvider'
import SelectField from '../../components/form/SelectField'

export default function DetailsView(prop) {
    return (
        <div className='asset-details-toolbar'>
            <Row>
                <Col>
                    <Nav className='ad-nav' variant="pills" defaultActiveKey="transaction">
                        <Nav.Item>
                            <Nav.Link eventKey="details">ASSET DETAILS</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="transaction">TRANSACTIONS</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="nav" disabled>NAV</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col></Col>
                <Col>
                    <FormProvider model={{}}>
                        <Form style={{ padding: '0px 10px', 'padding-top': '16px' }}>
                            <Form.Row>
                                <SelectField name='portfolio' options={[]} />
                            </Form.Row>
                        </Form>
                    </FormProvider>
                </Col>
            </Row>
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
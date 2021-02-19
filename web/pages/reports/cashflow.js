
import { FormProvider } from '../../components/form/FormProvider'
import Filter from '../../components/cashflow/Filter'
import Calender from '../../components/cashflow/Calendar'

export default function CashflowView(props) {
    return (
        <FormProvider model={props.filter}>
            <Filter />
            <br/>
            <Calender />
        </FormProvider>
        
    )
}

export async function getServerSideProps(context) {
    const url = context.resolvedUrl
    const _breadcrumb = { key: 'CASHFLOW', title: 'CASHFLOW', href: url,  active: true }

    
    const _filter = {
        PORTFOLIO: 'ALL',
        HOLDER: 'ALL',
        INSTITUTION: 'ALL',
        CATEGORY: 'CREDIT',
        YEAR: '2021'            
    }

    return {
        props: {
            breadcrumb: _breadcrumb,
            filter: _filter
        }
    }
}



import { useContext } from 'react'
import { FormContext } from "../form/FormProvider"

export default function TableHeader(props) {
    const { header } = props
    const { label, align } = header
    const { formState, dispatch } = useContext(FormContext)
    const { formData } = formState

    const sortBy = formData['SORT_BY']
    const sortOrder = formData['SORT_ORDER']

    const handleChange = (_sortBy, _sortOrder) => {
        formData['SORT_BY'] = _sortBy
        formData['SORT_ORDER'] = _sortOrder
        dispatch({ type: 'FIELD_CHANGED', payload: formData })
    }

    return (
        <thead>
            <tr>
                {label.map((lbl, idx) =>
                    <Header key={idx} label={lbl} align={align[idx]} sortBy={sortBy} sortOrder={sortOrder}
                        handleChange={handleChange} />
                )}
            </tr>
        </thead>
    )
}

function Header({ label, align, sortBy, sortOrder, handleChange }) {
    const alignClass = getAlignClass(align)

    const isSort = (label === sortBy)    
    let _sortOrder = 'ASC'
    if(isSort)  _sortOrder = (sortOrder === 'ASC')? 'DESC' : 'ASC'

    return (
        <th className={alignClass} onClick={() => handleChange(label, _sortOrder)}>
            <a href='#'>{label}</a>
            { isSort && getSortClass(sortOrder) }
        </th>
    )
}

function getAlignClass(align) {
    switch (align) {
        case 'left': return 'text-left'
        case 'right': return 'text-right'
        default: return ''
    }
}

function getSortClass(sortOrder) {
    switch (sortOrder) {
        case 'ASC': return <i className='fa fa-caret-up' />
        case 'DESC': return <i className='fa fa-caret-down' />
        default: return null
    }
}


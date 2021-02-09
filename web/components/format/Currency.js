import NumberFormat from 'react-number-format'

export default function Currency( {value, decimal=0} ) {
    return (
        <NumberFormat 
            displayType='text'
            thousandsGroupStyle='lakh'
            thousandSeparator={true}
            prefix={'₹ '}
            decimalScale={decimal} 
            value={value} 
        />
    )
}
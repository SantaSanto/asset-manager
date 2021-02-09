import NumberFormat from 'react-number-format'

export default function Number( {value, decimal=0} ) {
    return (
        <NumberFormat 
            displayType='text'
            thousandsGroupStyle='lakh'
            thousandSeparator={true}
            decimalScale={decimal} 
            value={value} 
        />
    )
}
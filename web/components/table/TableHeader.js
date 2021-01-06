export default function TableHeader(props) {
    const { header } = props
    const { label, align } = header
    return (
        <thead>
            <tr>
                { label.map((lbl, idx) => <Header key={idx} label={lbl} align={align[idx]}/> )}
            </tr>
        </thead>
    )
}

function Header({label, align}) {
    const alignClass = getAlignClass(align)
    return (
        <th className={alignClass}>
            <a href='#'>{label}</a>
        </th>
    )
}

function getAlignClass(align) {
    switch (align) {
        case 'left':  return 'text-left'
        case 'right': return 'text-right'
        default:  return ''
    }
}


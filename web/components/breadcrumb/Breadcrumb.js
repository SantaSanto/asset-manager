import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { getBreadcrumb, putBreadcrumb, merge } from './Utils'

export default function IBreadcrumb(props) {
    const { breadcrumb } = props

    const oldBreadcrumb = getBreadcrumb()
    const breadcrumbs = merge(oldBreadcrumb, breadcrumb)
    putBreadcrumb(breadcrumbs)

    return (
        <Breadcrumb> {
            breadcrumbs.map(bi => {
                if(bi.active) 
                    return <Breadcrumb.Item key={bi.key} active>{bi.title}</Breadcrumb.Item>    
                return <Breadcrumb.Item key={bi.key} href={bi.href}>{bi.title}</Breadcrumb.Item> 
            })}
        </Breadcrumb >
    )
}
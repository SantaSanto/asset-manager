import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { getBreadcrumb, putBreadcrumb } from './Utils'

export default function IBreadcrumb(props) {
    const { breadcrumb } = props
    let breadcrumbs = [ ]
    const oldBreadcrumb = getBreadcrumb()
    
    if(oldBreadcrumb !== undefined) {
        const newBreadcrumb = []

        for(const bc of oldBreadcrumb)  {            
            if(bc.key === breadcrumb.key) { break }
            bc.active = false
            newBreadcrumb.push(bc)   
        }       

        newBreadcrumb.push(breadcrumb)
        putBreadcrumb(newBreadcrumb)

        breadcrumbs = newBreadcrumb
    }

    return (        
        <Breadcrumb> {
            breadcrumbs.map(bi =>
                <BreadcrumbItem key={bi.key} {...bi} />
            )}
        </Breadcrumb >
    )
}

function BreadcrumbItem({ title, href, active }) {
    return (
        <Breadcrumb.Item href={href} active={active}>
            {title}
        </Breadcrumb.Item>
    )
}
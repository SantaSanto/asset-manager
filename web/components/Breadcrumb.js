import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function IBreadcrumb(props) {
    const { breadcrumbs } = props
    return (
        <Breadcrumb> {
            breadcrumbs.map(breadcrumb =>
                <BreadcrumbItem key={breadcrumb.title} {...breadcrumb} />
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
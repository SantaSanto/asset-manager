const BREADCRUMB = 'BREADCRUMB'

export function getBreadcrumb() {
    const session = getSession()
    if(session === null) return

    const breadcrumb = session.getItem(BREADCRUMB)

    if (breadcrumb !== null) {
        return JSON.parse(breadcrumb)        
    }

    return []
}

export function putBreadcrumb(breadcrumb) {
    const session = getSession()
    if(session === null) return
    session.setItem(BREADCRUMB, JSON.stringify(breadcrumb))
}


function getSession() {
    try {
        const session = window.sessionStorage
        return session
    } catch {
        return null
    }
} 
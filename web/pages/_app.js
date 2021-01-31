import Container from 'react-bootstrap/Container'
import IBreadcrumb from '../components/Breadcrumb'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Container fluid> 
      <title>Asset Manager</title>
      <IBreadcrumb breadcrumbs={pageProps.breadcrumbs} />
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp

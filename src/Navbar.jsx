import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function TextLinkExample() {
  return (
    <Navbar className="bg-body-tertiary" bg="dark" >
      <Container>
        <Navbar.Brand href="#home" data-bs-theme = 'light' style={{color:'white'}}>Blood-Cell Detection</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{color:'white'}} >
            Signed in as: <a href="#login" style={{color:'white'}}>Guest</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
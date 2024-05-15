import { useState } from 'react';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';
import MainLayout from 'layouts/MainLayout';
import {
  Container,
  Button,
  Accordion,
  Table,
  Dropdown,
  Offcanvas,
  Card,
  Tab,
  Tabs,
  Collapse,
  Badge,
  ListGroup,
  Stack,
} from 'react-bootstrap';

const TestingGround = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);

  return (
    <MainLayout>
      <AdvancedThemeContext.Consumer>
        {({ isDarkMode }) => {
          return (
            <Container>
              <Button
                variant="primary"
                onClick={handleShow}
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
              >
                Launch
              </Button>
              <br />
              <br />
              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  Some text as placeholder. In real life you can have the
                  elements you have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
              </Offcanvas>
              <Button variant="primary mb-2">Primary</Button>{' '}
              <Button variant="secondary mb-2">Secondary</Button>{' '}
              <Button variant="success mb-2">Success</Button>{' '}
              <Button variant="warning mb-2">Warning</Button>{' '}
              <Button variant="danger mb-2">Danger</Button>{' '}
              <Button variant="info mb-2">Info</Button>{' '}
              <Button variant="light mb-2">Light</Button>{' '}
              <Button variant="dark mb-2">Dark</Button>
              <Button variant="link mb-2">Link</Button>
              <br />
              <br />
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
              >
                <Tab eventKey="home" title="Home">
                  Tab content for Home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                  Tab content for Profile
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                  Tab content for Contact
                </Tab>
              </Tabs>
              <Accordion
                className="mt-3"
                defaultActiveKey="0"
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Accordion Item #1</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Accordion Item #2</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Button
                className="mt-3"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                show code &#8595;
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
              <Card
                className="mt-3"
                body
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
              >
                This is some text within a card body.
              </Card>
              <Card
                style={{ width: '18rem' }}
                className="mt-3"
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
              >
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
              <ListGroup
                className="mt-3"
                as="ol"
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
                numbered
              >
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                  </div>
                  <Badge bg="primary" pill>
                    14
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                  </div>
                  <Badge bg="primary" pill>
                    14
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                  </div>
                  <Badge bg="primary" pill>
                    14
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup
                className="mt-3"
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
                horizontal
              >
                <ListGroup.Item>This</ListGroup.Item>
                <ListGroup.Item>ListGroup</ListGroup.Item>
                <ListGroup.Item>renders</ListGroup.Item>
                <ListGroup.Item>horizontally!</ListGroup.Item>
              </ListGroup>
              <ListGroup
                className="mt-3"
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
              >
                <ListGroup.Item>No style</ListGroup.Item>
                <ListGroup.Item variant="primary">Primary</ListGroup.Item>
                <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
                <ListGroup.Item variant="success">Success</ListGroup.Item>
                <ListGroup.Item variant="danger">Danger</ListGroup.Item>
                <ListGroup.Item variant="warning">Warning</ListGroup.Item>
                <ListGroup.Item variant="info">Info</ListGroup.Item>
                <ListGroup.Item variant="light">Light</ListGroup.Item>
                <ListGroup.Item variant="dark">Dark</ListGroup.Item>
              </ListGroup>
              <Table
                className="mt-3"
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
                striped
                bordered
                hover
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
              <Stack direction="horizontal" gap={2}>
                <Badge pill bg="primary">
                  Primary
                </Badge>
                <Badge pill bg="secondary">
                  Secondary
                </Badge>
                <Badge pill bg="success">
                  Success
                </Badge>
                <Badge pill bg="danger">
                  Danger
                </Badge>
                <br />
                <Badge pill bg="warning" text="dark">
                  Warning
                </Badge>

                <Badge pill bg="light" text="dark">
                  Light
                </Badge>
                <Badge pill bg="dark">
                  Dark
                </Badge>
              </Stack>
              <Dropdown
                className="mt-3"
                data-bs-theme={isDarkMode ? 'dark' : 'light'}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
              <br />
              <div className="mt-3 d-grid gap-2">
                <Button variant="primary" size="lg">
                  Block level button
                </Button>
                <Button variant="secondary" size="lg">
                  Block level button
                </Button>
              </div>
            </Container>
          );
        }}
      </AdvancedThemeContext.Consumer>
    </MainLayout>
  );
};

export default TestingGround;

export { Head } from 'components/Head';

import React, { useState } from "react";
import { Table, Button, Modal, Form, Container, Row, Col } from "react-bootstrap";

const ManageCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBlocked, setShowBlocked] = useState(false);

  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [newCompany, setNewCompany] = useState({ id: "", name: "", email: "", blocked: false, verified: false });
  const [editCompany, setEditCompany] = useState({ id: "", name: "", email: "", blocked: false, verified: false });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (company) => {
    setEditCompany(company);
    setEditShow(true);
  };

  const handleAddCompany = () => {
    setCompanies([...companies, { ...newCompany, id: companies.length + 1 }]);
    setNewCompany({ id: "", name: "", email: "", blocked: false, verified: false });
    handleClose();
  };

  const handleEditCompany = () => {
    setCompanies(companies.map(company => company.id === editCompany.id ? editCompany : company));
    handleEditClose();
  };

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter((company) => company.id !== id));
  };

  const handleBlockCompany = (id) => {
    setCompanies(companies.map(company => company.id === id ? { ...company, blocked: !company.blocked } : company));
  };

  const handleVerifyCompany = (id) => {
    setCompanies(companies.map(company => company.id === id ? { ...company, verified: true } : company));
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (showBlocked ? company.blocked : !company.blocked)
  );

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="fw-bolder my-5">Company Management</h2>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search by company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={6} className="text-end">
              <Button variant="primary" className="me-2" onClick={handleShow}>Add Company</Button>
              <Button variant={showBlocked ? "secondary" : "dark"} onClick={() => setShowBlocked(!showBlocked)}>
                {showBlocked ? "View Active Companies" : "View Blocked Companies"}
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id} className={company.blocked ? "table-danger" : ""}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditShow(company)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button variant="danger" size="sm" className="me-2" onClick={() => handleDeleteCompany(company.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                    {!showBlocked && (
                      <>
                        <Button variant="dark" size="sm" className="me-2" onClick={() => handleBlockCompany(company.id)}>
                          <i className="fa-solid fa-ban"></i>
                        </Button>
                        <Button variant="success" size="sm" onClick={() => handleVerifyCompany(company.id)} disabled={company.verified}>
                          {company.verified ? "Verified" : "Verify"}
                        </Button>
                      </>
                    )}
                    {showBlocked && (
                      <Button variant="success" size="sm" onClick={() => handleBlockCompany(company.id)}>
                        Unblock
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Add Company Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newCompany.email}
                onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleAddCompany}>Add Company</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Company Modal */}
      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editCompany.name}
                onChange={(e) => setEditCompany({ ...editCompany, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editCompany.email}
                onChange={(e) => setEditCompany({ ...editCompany, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Close</Button>
          <Button variant="primary" onClick={handleEditCompany}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageCompany;

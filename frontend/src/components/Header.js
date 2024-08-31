import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button, Container, Modal, Form } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Header = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState();
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [tax, setTax] = useState({
    income: "",
    amountOldRegime: 0,
    amountNewRegime: 0,
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  const handleShowLogin = () => {
    navigate("/login");
  };

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleShowTaxModal = () => setShowTaxModal(true);
  const handleCloseTaxModal = () => setShowTaxModal(false);

  const handleCalculateTax = () => {
    let amountOldRegime = 0;
    let amountNewRegime = 0;
    const income = parseFloat(tax.income);

    if (isNaN(income)) return;

    // Old Regime calculation
    if (income <= 250000) amountOldRegime = 0;
    else if (income <= 500000) amountOldRegime = (income - 250000) * 0.05;
    else if (income <= 750000) amountOldRegime = 12500 + (income - 500000) * 0.1;
    else if (income <= 1000000) amountOldRegime = 37500 + (income - 750000) * 0.15;
    else if (income <= 1250000) amountOldRegime = 75000 + (income - 1000000) * 0.2;
    else if (income <= 1500000) amountOldRegime = 125000 + (income - 1250000) * 0.25;
    else amountOldRegime = 187500 + (income - 1500000) * 0.3;

    // New Regime calculation
    if (income <= 250000) amountNewRegime = 0;
    else if (income <= 500000) amountNewRegime = (income - 250000) * 0.05;
    else if (income <= 750000) amountNewRegime = 12500 + (income - 500000) * 0.1;
    else if (income <= 1000000) amountNewRegime = 37500 + (income - 750000) * 0.15;
    else if (income <= 1250000) amountNewRegime = 75000 + (income - 1000000) * 0.2;
    else if (income <= 1500000) amountNewRegime = 125000 + (income - 1250000) * 0.25;
    else amountNewRegime = 187500 + (income - 1500000) * 0.3;

    setTax({ ...tax, amountOldRegime, amountNewRegime });
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: { value: '#000' },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 200,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: { value: '#ffcc00' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: { enable: true, minimumValue: 1 } },
              links: { enable: false },
              move: { enable: true, speed: 2 },
              life: {
                duration: { sync: false, value: 3 },
                count: 0,
                delay: {
                  random: { enable: true, minimumValue: 0.5 },
                  value: 1,
                },
              },
            },
            detectRetina: true,
          }}
          style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <Navbar className="navbarCSS" collapseOnSelect expand="lg" style={{ position: 'relative', zIndex: "2 !important" }}>
          <Container>
            <Navbar.Brand href="/" className="text-white navTitle">ExpenseSage</Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ backgroundColor: "transparent", borderColor: "transparent" }}
            >
              <span
                className="navbar-toggler-icon"
                style={{
                  background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
                }}
              ></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav className="d-flex align-items-center">
                {user ? (
                  <>
                    <Button variant="primary" onClick={handleShowTaxModal} className="mx-2 my-2">Tax Calculator</Button>
                    <Button variant="primary" onClick={handleShowLogout} className="mx-2 my-2">Logout</Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={handleShowLogin} className="mx-2 my-2">Login</Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <Modal show={showTaxModal} onHide={handleCloseTaxModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tax Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formIncome">
              <Form.Label>Income</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your income"
                value={tax.income}
                onChange={(e) => setTax({ ...tax, income: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCalculateTax}>
              Calculate Tax
            </Button>
          </Form>
          {tax.income && (
            <div className="mt-3">
              <p>Old Regime Tax: ₹{tax.amountOldRegime.toFixed(2)}</p>
              <p>New Regime Tax: ₹{tax.amountNewRegime.toFixed(2)}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;

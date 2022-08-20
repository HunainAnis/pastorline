import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuery, setStopScroll, updatePage } from "../features/contacts/contactsSlice";
import { modalRoutes } from "../utils";
import ContactsList from "./ContactsList";

export default function CustomModal({ show, onClose, data, fetchContacts, scrollbarRef }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateTo = (route) => {
        dispatch(updatePage(1));
        dispatch(setQuery(''));
        dispatch(setStopScroll(false));
        navigate(route);
    }

    return(
        <div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Button className="me-2" variant="primary" onClick={() => navigateTo(`/${modalRoutes[0]}`)}>All Contacts</Button>
                        <Button className="me-2" variant="secondary" onClick={() => navigate(`/${modalRoutes[1]}`)}>US Contacts</Button>
                        <Button className="ms-auto" variant="outline-primary" onClick={onClose}>Close</Button>
                    </div>
                    <div className="mt-3">
                        <ContactsList 
                            scrollbarRef={scrollbarRef} 
                            fetchContacts={fetchContacts} 
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-start">
                    <label>
                        <input type='checkbox' className="me-2" />
                        Even only
                    </label>
                    <Button className="ms-auto" variant="outline-primary" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
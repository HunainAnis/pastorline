import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CustomModal from './components/CustomModal'
import { fetchContacts } from './features/contacts/contactsAPI';
import { resetContacts, resetPage, setStopScroll, updateContacts, updatePage, updateStatus } from './features/contacts/contactsSlice';
import { modalRoutes } from './utils';

export default function ModalSection() {
    const { modalType } = useParams();
    // const [ page, setPage ] = useState(1);
    const scrollbarRef = useRef(null);
    const { page, query } = useSelector(state => state.contacts);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchContact = async () => {
        const countryId = modalType === "modalA" ? "" : "226";
        dispatch(updateStatus("loading"));
        const { data } = await fetchContacts(countryId, query, page);
        if(data.contacts_ids.length===0) dispatch(setStopScroll(true));
        dispatch(updateContacts(data.contacts));
    }

    useEffect(() => {
        dispatch(updatePage(1));
        dispatch(resetContacts());
        fetchContact();
    }, [modalType])
    return (
        <div>
          {
            modalRoutes.includes(modalType) &&
            <CustomModal
              // setPage={setPage} 
              scrollbarRef={scrollbarRef}
              show={modalRoutes.includes(modalType)} 
              onClose={() => navigate('/')} 
              data={{ title: modalType, modalType }}
              fetchContacts = {fetchContact}
            />
          }
        </div>
    );
}
import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { resetContacts, setQuery, setStopScroll, updatePage, updateStatus } from "../features/contacts/contactsSlice";
import { debounce } from "../utils";

export default function ContactsList({ fetchContacts, scrollbarRef }) {
    const dispatch = useDispatch();
    const memoizingContacts = createSelector(
        (state) => state.contacts,
        (contacts) => contacts?.contacts
      )
    const allContacts = useSelector(memoizingContacts);
    const { status, stopScroll, query, evenOnly } = useSelector(state => state.contacts)
    const [ updatedContacts, setUpdatedContacts ] = useState(allContacts);

    const fetchNextPage = async ({ top }) => {
        if(top === 1 && status==='idle' && !stopScroll) {
            await fetchContacts();
        }
    }
    
    const fetchQueryContacts = () => {
        dispatch(resetContacts(query));
        dispatch(updatePage(1));
        dispatch(setStopScroll(false));
        if(query.length>2) {
            dispatch(updateStatus('loading'));
            debounce(fetchContacts, 500)();
        }
        if(query.length===0) fetchContacts();
    }

    useEffect(() => {
        fetchQueryContacts();
    }, [query])

    useEffect(() => {
        if(evenOnly) {
            const updated = {};
            const filtered = Object.entries(allContacts).filter(([key, value]) => key % 2 === 0);
            filtered.forEach(([key, value]) => updated[key] = value);

            setUpdatedContacts(updated)
        }
        else setUpdatedContacts(allContacts);
    }, [evenOnly, allContacts])

    // console.log(status, stopScroll, query)
    return(
        <div>
            <h1>Contacts List ({updatedContacts ? Object.keys(updatedContacts)?.length : 0}/{allContacts ? Object.keys(allContacts)?.length : 0})</h1>
            <div>
                <input 
                    type='search'
                    placeholder='Search'
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                />
            </div>

            <Scrollbars 
                ref={scrollbarRef}
                onScrollFrame={(values) => fetchNextPage(values)}
                style={{ height: 300 }}
            >
                {
                    updatedContacts &&
                    Object.entries(updatedContacts)?.map(([key, value], i) => (
                        <div key={key}>
                            {i+1}. {value?.id} {value?.email}
                        </div>
                    ))
                }
                {
                    status === 'loading' &&
                    <div className="d-flex justify-content-center">
                        <Spinner animation="grow" />
                    </div>
                }
            </Scrollbars>
        </div>
    )
}
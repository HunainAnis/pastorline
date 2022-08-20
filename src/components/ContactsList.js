import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { resetContacts, setQuery, setStopScroll, updatePage, updateStatus } from "../features/contacts/contactsSlice";

export default function ContactsList({ fetchContacts, scrollbarRef }) {
    const dispatch = useDispatch();
    const memoizingContacts = createSelector(
        (state) => state.contacts,
        (contacts) => contacts?.contacts
      )
    const allContacts = useSelector(memoizingContacts);
    const { status, stopScroll, query } = useSelector(state => state.contacts)

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
            setTimeout(() => {
                fetchContacts();
            }, 500)
        }
    }

    useEffect(() => {
        fetchQueryContacts();
    }, [query])

    console.log(status, stopScroll, query)
    return(
        <div>
            <h1>Contacts List ({allContacts ? Object.keys(allContacts)?.length : ""})</h1>
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
                    allContacts &&
                    Object.entries(allContacts)?.map(([key, value], i) => (
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
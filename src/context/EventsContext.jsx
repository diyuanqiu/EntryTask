import {createContext, useRef, useState} from 'react';
import {fetchChannels, fetchEvents} from "../api/apiFetch.js";

export const EventsContext = createContext();

export function EventsProvider({ children }) {

    // 展示活动列表
    const [eventsArr, setEventsArr] = useState([]);
    const [channels, setChannels] = useState([]);

    const initialRef = useRef(false);

    const fetchInitialEvents = async () => {
        try {
            const res = await fetchEvents(0);
            setEventsArr(res.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const getChannels = async () => {
        try {
            const res = await fetchChannels();
            if (res) setChannels([{ id: 0, name: "All" }, ...res.channels]);
        } catch (error) {
            console.error("Error fetching channels", error);
        }
    };

    if (!initialRef.current) {
        initialRef.current = true;
        fetchInitialEvents();
        getChannels();
    }

    return (
        <EventsContext.Provider
            value={{
                eventsArr,
                setEventsArr,
                channels,
                fetchInitialEvents
            }}
        >
            {children}
        </EventsContext.Provider>
    );
}

import axios from "axios";
import { useEffect, useReducer } from "react";

const ACTIONS = {
    API_REQUEST: "api-request",
    FETCH_DATA: "fetch-data",
    ERROR: "error"
}

const initialState = {
    data: [],
    loading: true,
    error: null
}

function reducer (state, {type, payload}) {
    switch (type) {
        case ACTIONS.API_REQUEST:
            return {...state, data:[], loading: true};
        case ACTIONS.FETCH_DATA:
            return {...state, data:payload, loading: false};
        case ACTIONS.ERROR:
            return {...state, data:[], error: payload, loading: false};
        default:
           return state;
    }
}

const useFetch = (url) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({type:ACTIONS.API_REQUEST})
        axios.get(url).then((res) => {
            dispatch({type:ACTIONS.FETCH_DATA, payload: res.data})
        }).catch((error) => {
            dispatch({type:ACTIONS.ERROR, payload: error})
        })

    }, [url])

    return state;
}
 
export default useFetch;
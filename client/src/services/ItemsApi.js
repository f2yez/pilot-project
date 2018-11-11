import axios from 'axios';
import { API_URL } from './../config/constant';

/** Fetch list of items from server */
export async function getList (params) {
    return await axios.get(API_URL + `items`, {params}).then(response => {
        return response.data;
    });
}

/** Fetch single item resource from server */
export async function getItem (id) {
    return await axios.get(API_URL + `items/` + id).then(response => {
        return response.data;
    });
}

/** Store new resource */
export async function createItem (payload) {
    return await axios.post(API_URL + `items`, payload).then(response => {
        return response.data;
    });
}

/** Patch resource */
export async function editItem (id, payload) {
    return await axios.patch(API_URL + `items/${id}`, payload).then(response => {
        return response.data;
    });
}
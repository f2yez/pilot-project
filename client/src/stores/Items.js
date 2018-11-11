import { observable, action, runInAction, computed } from 'mobx';
import { getList, getItem, createItem, editItem } from '../services/ItemsApi';

class Items {

    @observable isLoading = true;
    @observable isFailure = false;
    @observable all = [];
    /** Pagination variable */
    @observable page = 1;
    @observable limit = 10;
    @observable skip = 0;
    @observable total = 0;

    @computed get pages() {
        return Math.ceil(this.total/this.limit);
    }

    @computed get canNext() {
        return (this.total > (this.skip + this.limit));
    }

    @computed get canPrev() {
        return (this.skip != 0 && this.skip >= this.limit);
    }

    /** 
     * @param Object params 
     * void
    */
    @action async getItems(params) {
        try {
            let response = await getList(params);
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = false;
                this.total = response.total;
                this.limit = response.limit;
                this.skip = response.skip;
                this.all = response.data;
                });
        } catch (e) {
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = true;
            });
        }
    }

    /**
     * add new item
     * @param Object payload
     * return Boolean status
     */
    @action add (payload) {
        return true;
    }

    /**
     * find item by id
     * @param int item_id
     * @param function callback
     * return Object item
     */
    @action async show (id, callback) {
        try {
            let response = await getItem(id);
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = false;
                callback && callback(response);
            });
        } catch (e) {
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = true;
            });
        }
    }
    
    /**
     * create new item
     * @param object payload
     * @param function callback
     * return Object item
     */
    @action async create (payload, callback) {
        try {
            let item = await createItem(payload);
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = false;
                callback && callback(item);
            });
        } catch (e) {
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = true;
            });
        }
    }
    
    /**
     * edit item
     * @param int id
     * @param object payload
     * @param function callback
     * return Object item
     */
    @action async edit (id, payload, callback) {
        try {
            let item = await editItem(id, payload);
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = false;
                callback && callback(item);
            });
        } catch (e) {
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = true;
            });
        }
    }
}

export default new Items();
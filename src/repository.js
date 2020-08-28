import Event from "./models"

/**
 * The event repository is responsible of events storage from database
 */
export default class EventRepository {

    _dbDriver;

    constructor(dbDriver) {
        this._dbDriver = dbDriver
    }

    /**
     * Get all events saved in db
     * @return Event[]
     */
    getAll() {
        // let tab = [];
        // let events = this._dbDriver._events;
        // if (!events.length) {
        //     for (let i = 0; i < events.length; i++) {
        //         tab.push(events[i]);
        //     }
        //     return tab;
        // } else {
        //     return null;
        // }
        console.log("Passing through repository.js>getAll()")
        return null;
    }

    /**
     * Add a new event
     * return true if succeed
     * @return boolean
     */
    add(event) {
        return false; //TODO
    }
}

export class InMemoryEventRepository extends EventRepository {
    _events;

    constructor(events) {
        super(null);
        this._events = events;
    }


    getAll() {
        return this._events.slice();
    }

    add(event) {
        this._events.push(event);
    }
}
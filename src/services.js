import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {
        let events = this.getEvents();
        let dates = [];
        events.forEach(function (event) {
            dates.push(event.startTime)
        })

        function extracted(dates) {
            return dates.sort(function (a, b) {
                return Date.parse(a) - Date.parse(b);
            })[0];
        }

        return extracted(dates);
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
        let events = this._eventRepository.getAll();
        let dates = [];
        events.forEach(function (ev) {
            dates.push(ev.startTime)
        })

        function getLast(param1) {
            return param1.slice(-1)[0];
        }

        return getLast(dates);
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        let events = this._eventRepository.getAll();
        events.forEach(function (event, index) {

        });
        return null; //TODO
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        return null; //TODO
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }

}
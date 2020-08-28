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
        const ms_per_day = 1000 * 60 * 60 * 24;

        function dateDiffInDays(a, b) {
            const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

            return Math.floor((utc2 - utc1) / ms_per_day);
        }

        let events = this._eventRepository.getAll();
        events.forEach(function (event) {
            const a = event.startTime,
                b = event.endTime;
            console.log(dateDiffInDays(a, b))
            return dateDiffInDays(a, b);
        });
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
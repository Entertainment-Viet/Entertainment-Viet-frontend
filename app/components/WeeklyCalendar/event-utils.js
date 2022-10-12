let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    backgroundColor: '#805AD5',
    className: 'info',
  },
  {
    id: createEventId(),
    title: 'event 1',
    start: `${todayStr}T19:00:00`,
    backgroundColor: '#805AD5',
    className: 'dot',
  },
  {
    id: createEventId(),
    title: 'event 2',
    start: `${todayStr}T12:00:00`,
    backgroundColor: '#805AD5',
    className: 'dot',
  },
  {
    id: createEventId(),
    title: 'event 2',
    start: `${todayStr}T13:00:00`,
    backgroundColor: '#805AD5',
    className: 'dot',
  },
  {
    id: createEventId(),
    title: 'event 3',
    start: `${todayStr}T15:00:00`,
    end: `${todayStr}T14:00:00`,
    backgroundColor: '#0BC5EA',
    className: 'dot',
  },
];

export function createEventId() {
  return String((eventGuid += 1));
}

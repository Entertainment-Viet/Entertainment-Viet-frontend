import React, { useState, useLayoutEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { JobDetailModal } from 'components/Modal';
import PropTypes from 'prop-types';
import { INITIAL_EVENTS } from './event-utils';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css'; // a dependency of timegrid
import '@fullcalendar/timegrid/main.css';
import './styles.css';
export default function WeeklyCalendar({ toDate }) {
  // const [currentEvents, setCurrentEvents] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [id, setId] = useState();
  const toggleModal = inputId => {
    setIsShowing(!isShowing);
    setId(inputId);
  };

  // const date = new Date(window.localStorage.getItem('calendar'));

  useLayoutEffect(() => {
    const calendarApi = calendarComponentRef.current.getApi();
    // const selectDay = document.getElementsByClassName('fc-daygrid-day-frame');

    console.log('calendar changed');
    // const date = new Date(window.localStorage.getItem('calendar'));
    if (!toDate) {
      calendarApi.gotoDate(new Date());
    } else {
      calendarApi.gotoDate(toDate);
    }
    // }
  }, [toDate]);

  const calendarComponentRef = React.createRef();

  const handleDateSelect = selectInfo => {
    // const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    console.log(selectInfo);
    calendarApi.unselect(); // clear date selection
    // toggleModal(selectInfo.startStr);

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleEventClick = clickInfo => {
    // const calendarApi = clickInfo.view.calendar;
    console.log(clickInfo.view.getCurrentData());
    console.log(clickInfo.event);
    // if (
    //   prompt(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`,
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
    toggleModal(clickInfo.event.title);
  };

  const handleEvents = events => {
    console.log(events);
    // setCurrentEvents(events);
  };
  return (
    <div className="weekly-calendar-wrapper">
      {/* {this.renderSidebar()} */}
      {/* <div className="demo-app-main"> */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          // left: 'prev,next today',
          left: 'title',
          // center: 'title',
          // right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        ref={calendarComponentRef}
        height={1000}
        // width={100}
        initialView="timeGridWeek"
        editable
        selectable
        selectMirror
        dayMaxEvents
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      />
      {/* </div> */}
      <JobDetailModal
        title="My Modal"
        onClose={() => toggleModal()}
        show={isShowing}
        id={id}
      />
    </div>
  );
}
WeeklyCalendar.propTypes = {
  toDate: PropTypes.any,
};
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

import React, { useState, useLayoutEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { JobDetailModal } from 'components/Modal';
import PropTypes from 'prop-types';
import { toLocalISOTime } from '../../utils/helpers';
// import { INITIAL_EVENTS } from './event-utils';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css'; // a dependency of timegrid
import '@fullcalendar/timegrid/main.css';
import './styles.css';

export default function Calendar({ onSelectDate, data }) {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [id, setId] = useState();
  const toggleModal = inputId => {
    setIsShowing(!isShowing);
    setId(inputId);
  };
  // const events = [];
  // useEffect(() => {
  //   if (data) {
  //     console.log(data.content)
  //     const tempt1 = [];
  //     data.content.map(event => {
  //       const tempt = {
  //         id: createEventId(),
  //         title: event.packageName,
  //         start: new Date(event.jobDetail.performanceStartTime).toISOString().replace('0Z', ''),
  //         end: new Date(event.jobDetail.performanceEndTime).toISOString().replace('0Z', ''),
  //         backgroundColor: '#805AD5',
  //         className: 'dot',
  //       };
  //       tempt1.push(tempt);
  //       return true;
  //     });
  //     setCurrentEvents(tempt1);
  //   }
  // }, [data]);
  useLayoutEffect(() => {
    if (data) {
      const tempt1 = [];
      data.content.map(event => {
        const tempt = {
          id: event.uid,
          title: event.packageName,
          start: toLocalISOTime(new Date(event.jobDetail.performanceStartTime)),
          end: toLocalISOTime(new Date(event.jobDetail.performanceEndTime)),
          backgroundColor: '#805AD5',
          className: 'dot',
        };
        tempt1.push(tempt);
        return true;
      });
      setCurrentEvents(tempt1);
    }
    function appendHtml(el, str) {
      const div = document.createElement('div');
      div.innerHTML = str;
      while (div.children.length > 0) {
        el.appendChild(div.children[0]);
      }
    }
    const val = document.querySelectorAll('.fc-toolbar-chunk')[3];
    const test =
      '<select class="select_month form-control"><option value=""></option><option value="01">Jan</option><option value="02">Feb</option><option value="03">Mrch</option><option value="04">Aprl</option><option value="05">May</option><option value="06">June</option><option value="07">July</option><option value="08">Aug</option><option value="09">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select>';
    appendHtml(val, test);
    const selectTag = document.querySelector('.select_month');
    const calendarApi = calendarComponentRef.current.getApi();
    selectTag.addEventListener('change', () => {
      calendarApi.gotoDate(
        `${new Date().getFullYear()}-${
          document.querySelector('.select_month').value
        }-01`,
      );
    });
  }, [data]);

  const calendarComponentRef = React.createRef();

  const handleDateSelect = selectInfo => {
    // const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    // console.log(selectInfo);
    // window.localStorage.setItem('calendar', selectInfo.start)
    onSelectDate(selectInfo.start);
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
    // console.log(clickInfo.view.getCurrentData());
    // console.log(clickInfo.event);
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
    // eslint-disable-next-line no-console
    console.log(events);
    // setCurrentEvents(events);
  };
  return (
    <div className="calendar-wrapper">
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
        height={350}
        // width={100}
        initialView="dayGridMonth"
        events={currentEvents}
        editable
        selectable
        selectMirror
        dayMaxEvents
        // initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
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
Calendar.propTypes = {
  onSelectDate: PropTypes.func,
  data: PropTypes.any,
};
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

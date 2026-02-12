import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewMonthGrid, createViewWeek } from '@schedule-x/calendar'
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from '@schedule-x/events-service'

import { Temporal } from 'temporal-polyfill'
import { useAuth } from "../../context/useAuth";
import {Loader} from "lucide-react";

const Calendars = () => {
    const { loading } = useAuth();
    const calendar = useCalendarApp({
        defaultView: 'month-grid',
        views: [createViewMonthGrid(), createViewWeek()],
        plugins: [createDragAndDropPlugin(), createEventsServicePlugin(), createEventModalPlugin()],
        events: [
            {
                id: 1,
                title: 'Meeting',
                start: Temporal.ZonedDateTime.from('2026-02-04T10:05:00+01:00[Europe/Berlin]'),
                end: Temporal.ZonedDateTime.from('2026-02-04T10:35:00+01:00[Europe/Berlin]'),
                editable: true,
            },
        ]
    });

    const renderContent = () => {
      if(loading){
          return (
              <div className="flex items-center justify-center h-200">
                  <Loader className="animate-spin" />
              </div>
          )
      }
      return (
          <div className='flex items-center justify-center p-0'>
              <ScheduleXCalendar calendarApp={calendar} />
          </div>
      )
  }

  return (
      <div className='min-h-screen '>
        <div className="absolute top-3.5 md:ml-0 ml-14">
          <h1 className="text-3xl font-semibold tracking-tighter bg-slate-900  inline-block text-transparent bg-clip-text">Calendar</h1>
        </div>
          {renderContent()}
      </div>
  )
}

export default Calendars
import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewMonthGrid } from '@schedule-x/calendar'
import { Temporal } from 'temporal-polyfill'

const Calendars = () => {
  const calendar = useCalendarApp({
    views: [createViewMonthGrid()],
    // Call Event API
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.ZonedDateTime.from({
          year: 2026,
          month: 2,
          day: 16,
          hour: 1,
          minute: 0,
          timeZone: 'Asia/Manila', // set your timezone
        }),
        end: Temporal.ZonedDateTime.from({
          year: 2026,
          month: 2,
          day: 16,
          hour: 2,
          minute: 0,
          timeZone: 'Asia/Manila',
        }),
      },
    ],
  });

  return (
      <div className='min-h-screen flex flex-col'>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
  )
}

export default Calendars
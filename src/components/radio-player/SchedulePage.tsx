import React from 'react';
import { Schedule, ScheduleItem } from '/workspaces/radio-station/src/components/radio-player/schedule'; // Adjust the path as needed

const SchedulePage = () => {
  // Example schedule data
  const scheduleData: ScheduleItem[] = [
    { time: '10:00 AM', show: 'Morning Show', host: 'John Doe' },
    { time: '12:00 PM', show: 'Lunch Hour', host: 'Jane Smith' },
    { time: '2:00 PM', show: 'Afternoon Delights', host: 'Alice Johnson' },
    // Add more items as needed
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule</h1>
      <Schedule schedule={scheduleData} />
    </div>
  );
};

export default SchedulePage;

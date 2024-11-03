import React from 'react';

export interface ScheduleItem {
  time: string;
  show: string;
  host: string;
}

interface ScheduleProps {
  schedule: ScheduleItem[];
}

export const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  return (
    <div className="space-y-2">
      {schedule.map((item, index) => (
        <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
          <div>
            <div className="font-medium">{item.show}</div>
            <div className="text-sm text-gray-500">{item.host}</div>
          </div>
          <div className="text-sm text-gray-500">{item.time}</div>
        </div>
      ))}
    </div>
  );
};

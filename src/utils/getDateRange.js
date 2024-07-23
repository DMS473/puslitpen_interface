import { format, addDays } from 'date-fns';

const getDateRange = (startDate, days = 7) => {
  const start = new Date(startDate);
  const end = addDays(start, days - 1);
  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
};

export { getDateRange };

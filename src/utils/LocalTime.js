import { useEffect, useState } from 'react';

// Helper function to convert a date string to local time
export function useLocalTime(dateStr) {
  if(dateStr){
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetMilliseconds = offsetMinutes * 60 * 1000;
  
    const originalDate = new Date(dateStr);
    const accurateDate = new Date(originalDate.getTime() - offsetMilliseconds);
  
    return accurateDate;
  }
}

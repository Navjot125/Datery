// import moment from 'moment';

export const remainingTimeConverter = fD => {
  const now = new Date().getTime();
  const futureDate = new Date(fD).getTime();

  const timeleft = futureDate - now;

  const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} min`;
  if (seconds > 0) return `${seconds} sec`;
};

export const remainingTimeBoolean = fD => {
  const now = new Date().getTime();
  const futureDate = new Date(fD).getTime();

  const timeleft = futureDate - now;

  const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if (days != 0) return false;
  if (hours != 0) return false;
  if (minutes <= 0 && minutes >= -45) {
    return true;
  } else {
    return false;
  }
};

// export const getCurrentDayBooking = bookings => {
//   const currentDate = moment();

//   for (let i = 0; i < bookings.length; i++) {
//     if (moment(bookings[i]['date']).isSame(currentDate, 'day')) {
//       return true;
//     }
//   }

//   return false;
// };

export const getFormattedDate = d => {
  const date = new Date(d);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthOfYear = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${dayOfWeek}, ${monthOfYear} ${dayOfMonth}, ${year}`;
  return formattedDate;
};

// type: "normal | success | warning | danger | custom",

export const showAlertSuccess = msg => {
  toast.hideAll();
  setTimeout(() => {
    toast.show(msg, {
      type: 'success',
      placement: 'bottom',
      duration: 3000,
      offset: 30,
      animationType: 'zoom-in',
    });
  }, 100);
};

export const showAlertError = msg => {
  toast.hideAll();
  setTimeout(() => {
    toast.show(msg, {
      type: 'danger',
      placement: 'bottom',
      duration: 3000,
      offset: 30,
      animationType: 'zoom-in',
    });
  }, 100);
};

export const showAlert = (msg, duration) => {
  toast.hideAll();
  setTimeout(() => {
    toast.show(msg, {
      type: 'normal',
      placement: 'bottom',
      duration: duration ? duration : 3000,
      offset: 30,
      animationType: 'zoom-in',
    });
  }, 100);
};

// Your code here

function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employees) {
  let employeeRecords = [];
  for (const employee of employees) {
    employeeRecords.push(createEmployeeRecord(employee));
  }
  return employeeRecords;
}

function createTimeInEvent(record, dateStamp) {
  let hour = parseInt(dateStamp.substring(dateStamp.length - 4));
  let date = dateStamp.substring(0, dateStamp.length - 5);
  let newEvent = {
    type: "TimeIn",
    hour: hour,
    date: date,
  };

  record.timeInEvents.push(newEvent);
  return record;
}

function createTimeOutEvent(record, dateStamp) {
  let hour = parseInt(dateStamp.substring(dateStamp.length - 4));
  let date = dateStamp.substring(0, dateStamp.length - 5);
  let newEvent = {
    type: "TimeOut",
    hour: hour,
    date: date,
  };

  record.timeOutEvents.push(newEvent);
  return record;
}

function hoursWorkedOnDate(record, date) {
  let timeInHour = 0;
  let timeOutHour = 0;
  for (const event of record.timeInEvents) {
    if (event.date === date) {
      timeInHour = event.hour;
    }
  }
  for (const event of record.timeOutEvents) {
    if (event.date === date) {
      timeOutHour = event.hour;
    }
  }
  return (timeOutHour - timeInHour) / 100;
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
  let wagesEarned = 0;
  for (const event of record.timeInEvents) {
    wagesEarned = wagesEarned + wagesEarnedOnDate(record, event.date);
  }

  return wagesEarned;
}

function calculatePayroll(records) {
  const initialValue = 0;
  const payroll = records.reduce((accumulator, record) => {
    return accumulator + allWagesFor(record);
  }, initialValue);
  return payroll;
}

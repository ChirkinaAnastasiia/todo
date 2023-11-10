const getTaskData = key => (localStorage.getItem(key) ?
  JSON.parse(localStorage.getItem(key)) : []);

const setTaskData = (data, key) =>
  localStorage.setItem(key, JSON.stringify(data));

const addTaskData = (contact, key) => {
  const data = getTaskData(key);
  data.push(contact);
  setTaskData(data, key);
};

const removeTaskData = (id, key) => {
  const data = getTaskData(key);
  const newData = data.filter(item => item.id !== id);
  setTaskData(newData, key);
};

const editTaskData = (id, task, key) => {
  const data = getTaskData(key);
  const newData = data.map(item => (
    item.id === id ?
    {
      ...item,
      task,
    } : item
  ));

  localStorage.setItem(key, JSON.stringify(newData));
};

const editTaskStatus = (id, status, key) => {
  const data = getTaskData(key);
  const newData = data.map(item => (
    item.id === id ?
    {
      ...item,
      status,
    } : item
  ));

  localStorage.setItem(key, JSON.stringify(newData));
};


export {getTaskData, addTaskData, removeTaskData, editTaskData, editTaskStatus};

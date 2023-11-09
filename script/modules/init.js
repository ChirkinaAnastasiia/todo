import {renderToDo, renderTasks} from './render.js';
import {getTaskData} from './serviceStorage.js';
import {
  formControl,
  formButtonControl,
  formResetControl,
  taskCompleteControl,
  taskDeleteControl,
  taskEditControl,
} from './control.js';


const init = (key) => {
  const {list, form} = renderToDo(key);
  renderTasks(list, getTaskData(key));

  formButtonControl();
  formResetControl(form);
  formControl(list, form, key);

  taskCompleteControl(list, key);
  taskDeleteControl(list, key);
  taskEditControl(list, key);
};


export {init};

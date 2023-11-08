import {
  createContainer,
  createTitle,
  createForm,
  createTable,
  createRow,
  createModal,
} from './createElements.js';


const renderToDo = (key) => {
  const container = createContainer();
  const h3 = createTitle(key);
  const form = createForm();
  const {tableWrapper, table} = createTable();

  container.append(h3, form, tableWrapper);

  return {
    list: table.tbody,
    form,
  };
};

const renderTasks = (list, data) => {
  const allRow = data.map(createRow);
  list.append(...allRow);

  return allRow;
};

const renderModal = () => {
  const container = document.querySelector('.app-container');
  const {modalOverlay, modalForm} = createModal();
  container.append(modalOverlay);

  return {
    modalOverlay,
    modalForm,
  };
};


export {renderToDo, renderTasks, renderModal};

const createContainer = () => {
  const container = document.querySelector('.app-container');
  container.classList.add(
      'vh-100', 'w-100', 'd-flex', 'align-items-center',
      'justify-content-center', 'flex-column');

  return container;
};

const createTitle = (key) => {
  const h3 = document.createElement('h3');

  h3.textContent = `${key}, ваш список задач!`;

  return h3;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
      <input
        type="text"
        name="task"
        class="form-control form-input"
        placeholder="ввести задачу">
    </label>

    <select name="priority" class="form-select me-3 w-25" aria-label="важность">
      <option value="light" selected>Важность</option>
      <option value="light">Обычная</option>
      <option value="warning">Важная</option>
      <option value="danger">Срочная</option>
    </select>

    <button type="submit" class="btn btn-primary me-3">
      Сохранить
    </button>

    <button type="reset" class="btn btn-warning">
      Очистить
    </button>
  `);

  return form;
};

const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;

  tableWrapper.append(table);

  return {
    tableWrapper,
    table,
  };
};

const createRow = ({task, id, priority, status}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table-light');
  tr.dataset.id = id;
  tr.dataset.status = status;

  const tdNumber = document.createElement('td');
  tdNumber.classList.add('table-number');

  const tdTask = document.createElement('td');
  tdTask.classList.add('table-task');
  tdTask.textContent = task;

  const tdStatus = document.createElement('td');
  tdStatus.classList.add('table-status');
  tdStatus.textContent = 'В процессе';

  const tdButtons = document.createElement('td');
  tdButtons.classList.add('table-buttons');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-danger', 'me-2');
  deleteBtn.innerText = 'Удалить';

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('btn', 'btn-success', 'me-2');
  completeBtn.innerText = 'Завершить';

  const editBtn = document.createElement('button');
  editBtn.classList.add('btn', 'btn-secondary');
  editBtn.innerText = 'Редактировать';

  tdButtons.append(deleteBtn, completeBtn, editBtn);
  tr.append(tdNumber, tdTask, tdStatus, tdButtons);

  if (priority === 'warning') {
    tr.className = 'table-warning';
  }

  if (priority === 'danger') {
    tr.className = 'table-danger';
  }

  if (status === 'complete') {
    completeBtn.innerText = 'Возобновить';
    completeBtn.classList.remove('btn-success');
    completeBtn.classList.add('btn-outline-success');
    editBtn.disabled = true;
    tr.className = 'table-success';
    tr.cells[1].classList.add('text-decoration-line-through');
    tr.cells[2].textContent = 'Выполнена';
  }

  return tr;
};

const createModal = () => {
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('form-overlay', 'is-visible');

  const modalForm = document.createElement('form');
  modalForm.classList.add('form', 'modal-form');

  modalForm.insertAdjacentHTML('beforeend', `
    <h4 class="modal-title mb-3"> Приветствую в ToDo App!</h4>

    <label class="form-group mb-4 d-block">
      <input class="form-control modal-input"
        name="name" type="text" placeholder="Введите ваше имя">
    </label>

    <button type="button" class="btn btn-outline-primary">
        Сохранить
    </button>
  `);

  modalOverlay.append(modalForm);

  return {
    modalOverlay,
    modalForm,
  };
};


export {
  createContainer,
  createTitle,
  createForm,
  createTable,
  createRow,
  createModal,
};

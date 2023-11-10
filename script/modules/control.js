import {init} from './init.js';
import {createRow} from './createElements.js';
import {
  addTaskData,
  removeTaskData,
  editTaskData,
  editTaskStatus,
} from './serviceStorage.js';


const blockFormButton = () => {
  const submitBtn = document.querySelector('.btn-primary');
  const resetBtn = document.querySelector('.btn-warning');

  submitBtn.disabled = true;
  resetBtn.disabled = true;

  return {
    submitBtn,
    resetBtn,
  };
};

const formButtonControl = () => {
  const {submitBtn, resetBtn} = blockFormButton();
  const input = document.querySelector('.form-input');
  input.focus();

  input.addEventListener('input', () => {
    if (input.value.length > 0 && input.value.trim()) {
      submitBtn.disabled = false;
      resetBtn.disabled = false;
    }
  });
};

const formResetControl = (form) => {
  const resetBtn = document.querySelector('.btn-warning');

  resetBtn.addEventListener('click', () => {
    form.reset();
    blockFormButton();
  });
};

const addTasks = (task, list) => {
  list.append(createRow(task));
};

const formControl = (list, form, key) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    newTask.id = Math.random().toString().substring(2, 10);
    newTask.status = 'in process';

    addTasks(newTask, list);
    addTaskData(newTask, key);
    form.reset();
    blockFormButton();
  });
};

const taskCompleteControl = (list, key) => {
  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-success')) {
      target.nextElementSibling.disabled = true;
      target.classList.remove('btn-success');
      target.classList.add('btn-outline-success');
      target.innerText = 'Возобновить';

      const tr = target.closest('tr');
      tr.className = 'table-success';
      tr.cells[1].classList.add('text-decoration-line-through');
      tr.cells[2].textContent = 'Выполнена';
      tr.dataset.status = 'complete';

      editTaskStatus(tr.dataset.id, tr.dataset.status, key);
    } else if (target.closest('.btn-outline-success')) {
      target.nextElementSibling.disabled = false;
      target.classList.remove('btn-outline-success');
      target.classList.add('btn-success');
      target.innerText = 'Завершить';


      const tr = target.closest('tr');
      tr.classList.remove('table-success');
      tr.cells[1].classList.remove('text-decoration-line-through');
      tr.cells[2].textContent = 'В процессе';
      tr.dataset.status = 'in process';

      editTaskStatus(tr.dataset.id, tr.dataset.status, key);
    }
  });
};

const taskDeleteControl = (list, key) => {
  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-danger')) {
      const tr = target.closest('tr');
      const id = tr.dataset.id;
      const deleteTask = confirm('Удалить задачу?');

      if (deleteTask) {
        tr.remove();
        removeTaskData(id, key);
      }
    }
  });
};

const taskEditControl = (list, key) => {
  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-secondary')) {
      target.classList.remove('btn-secondary');
      target.classList.add('btn-outline-secondary');
      target.innerText = 'Сохранить';

      const tr = target.closest('tr');
      tr.cells[1].setAttribute('contenteditable', 'true');
      tr.cells[1].focus();
    } else if (target.closest('.btn-outline-secondary')) {
      target.classList.remove('btn-outline-secondary');
      target.classList.add('btn-secondary');
      target.innerText = 'Редактировать';

      const tr = target.closest('tr');
      if (tr.cells[1].getAttribute('contenteditable')) {
        tr.cells[1].setAttribute('contenteditable', 'false');
        editTaskData(tr.dataset.id, tr.cells[1].textContent, key);
      }
    }
  });
};

const modalControl = (modalOverlay, modalForm) => {
  const modalInput = document.querySelector('.modal-input');
  modalInput.focus();

  const closeModal = () => {
    modalOverlay.classList.remove('is-visible');
  };

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  modalOverlay.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-outline-primary') && modalInput.value.length > 0 &&
        modalInput.value.trim()) {
      closeModal();
      init(modalInput.value);
    }
  });

  modalForm.addEventListener('keydown', e => {
    if (e.key === 'Enter' && modalInput.value.length > 0 &&
        modalInput.value.trim()) {
      closeModal();
      init(modalInput.value);
    }
  });
};


export {
  formControl,
  formButtonControl,
  formResetControl,
  taskCompleteControl,
  taskDeleteControl,
  taskEditControl,
  modalControl,
};


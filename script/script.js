import {renderModal} from './modules/render.js';
import {modalControl} from './modules/control.js';


const initToDo = () => {
  const {modalOverlay, modalForm} = renderModal();

  modalControl(modalOverlay, modalForm);
};

initToDo();

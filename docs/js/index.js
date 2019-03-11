import { isDebug } from '../../js/utils';
import Breakpoint from '../../js/breakpoint';
import Modal from '../../js/modal';

document.addEventListener('DOMContentLoaded', () => {
  console.log('isDebug()', isDebug());

  console.log('Breakpoint.width()', Breakpoint.width());
  console.log('Breakpoint.current()', Breakpoint.current());
  console.log('Breakpoint.is(">=sm")', Breakpoint.is('>=sm'));

  console.log('modal.new()', new Modal().new());
});

/**
 * A simple custom bootstrap modal
 *
 * @author Marvin Heilemann <marvin.heilemann@googlemail.com>
 * @version 1.0.0
 */

import { extend } from './helper';
import { makeId } from './utils';

import 'bootstrap/js/dist/modal.js';

export default class Modal {
  /**
   * Creates and opens our modal. Also adds a remove method on modal close.
   *
   * @param {options} object Our options that we want to override
   *
   * @return {instance} Our modal instance
   */
  new(options) {
    let defaultOptions = {
      classes: 'small',
      content: 'No content yet...',
      id: makeId(),
      size: null,
      header: null
    };

    extend(defaultOptions, options);

    let modalTmpl = this._template(defaultOptions);

    return $(modalTmpl).modal('show')
      .on('hidden.bs.modal', function() {
        this.remove(); // remove the element to keep the html clear
      });
  }

  /**
   * Close the modal by instance.
   *
   * @param {instance} element Our modal instance
   */
  close(instance = this.modal) {
    if (!instance) return console.error('(modal.close) -> One argument is missing: instance');
    instance.modal('hide');
  }

  /**
   * Parse our modal template
   *
   * @param {params} object Our params we want to insert
   *
   * @return {html} Our parsed template
   */
  _template(params) {
    const header = `
      <div class="modal-header">
        <h3 class="modal-title">${params.header}</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <!-- <i class="icon ion-ios-close"></i> -->
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;

    const body = `
      <div class="modal-body">
        <p>${params.content}</p>
      </div>
    `;

    return `
      <div class="modal generated fade ${params.classes}" id="${params.id}"
        tabindex="-1" role="dialog" aria-labelledby="${params.id}" aria-hidden="true">
        <div class="modal-dialog ${params.size} modal-dialog-centered" role="document">
          <div class="modal-content">
            ${params.header ? header : ''}
            ${params.content ? body : ''}
          </div>
        </div>
      </div>
    `;
  }
}

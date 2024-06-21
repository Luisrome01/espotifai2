import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal" [class.show]="showModal">
      <div class="modal-content">
        <span class="close-button" (click)="closeModal()">&times;</span>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 30%;
    }
    .close-button {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    .close-button:hover,
    .close-button:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
    .show {
      display: block;
    }
  `]
})
export class ModalComponent {
    showModal = false;
  
    openModal() {
      this.showModal = true;
    }
  
    closeModal() {
      this.showModal = false;
    }
  }
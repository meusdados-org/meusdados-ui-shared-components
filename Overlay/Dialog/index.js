// dialog.js
import { createApp } from 'vue'
import DialogCard from './DialogCard.vue'

const Dialog = {
  install(app) {
    app.config.globalProperties.$dialog = ({ type = '', title = '', message = '', showCancelButton = false, cancelButtonLabel = 'Cancelar', buttonLabel = 'Confirmar' } = {}) => {
      return new Promise((resolve, reject) => {
        const dialogApp = createApp(DialogCard, {
          type,
          title,
          message,
          showCancelButton,
          resolve,
          reject,
          cancelButtonLabel,
          buttonLabel
        })


        let dialogContainer = document.getElementById('dialog-container');
        if (!dialogContainer) {
            dialogContainer = document.createElement('div');
            dialogContainer.id = 'dialog-container'
        }
        document.body.appendChild(dialogContainer)
        dialogApp.mount('#dialog-container')
      })
    }
  }
}

export default Dialog;

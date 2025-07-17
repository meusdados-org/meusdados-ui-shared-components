// dialog.js
import { createApp } from 'vue'
import DialogCard from './DialogCard.vue'
import DialogCustom from './DialogCustom.vue'

const Dialog = {
  install(app) {
    // Original - Dialog padrão
    app.config.globalProperties.$dialog = ({
      type = '',
      title = '',
      message = '',
      showCancelButton = false,
      cancelButtonLabel = 'Cancelar',
      buttonLabel = 'Confirmar',
      titleClass = '',
      messageClass = '',
      customClass = ''
    } = {}) => {
      return new Promise((resolve, reject) => {
        const dialogApp = createApp(DialogCard, {
          type,
          title,
          message,
          showCancelButton,
          resolve,
          reject,
          cancelButtonLabel,
          customClass,
          buttonLabel,
          titleClass,
          messageClass
        })

        let dialogContainer = document.getElementById('dialog-container')
        if (!dialogContainer) {
          dialogContainer = document.createElement('div')
          dialogContainer.id = 'dialog-container'
        }
        document.body.appendChild(dialogContainer)
        dialogApp.mount('#dialog-container')
      })
    }

    // Novo - Dialog customizado
    app.config.globalProperties.$dialogCustom = ({
      type = '', // se você ainda quiser usar os ícones
      title = '',
      message = '',
      showCancelButton = false,
      cancelButtonLabel = 'Cancelar',
      buttonLabel = 'Confirmar',
      titleClass = '',
      messageClass = '',
      customClass = ''
    } = {}) => {
      return new Promise((resolve, reject) => {
        const dialogApp = createApp(DialogCustom, {
          type,
          title,
          message,
          showCancelButton,
          resolve,
          reject,
          cancelButtonLabel,
          customClass,
          buttonLabel,
          titleClass,
          messageClass
        })

        let dialogContainer = document.getElementById('dialog-custom-container')
        if (!dialogContainer) {
          dialogContainer = document.createElement('div')
          dialogContainer.id = 'dialog-custom-container'
        }
        document.body.appendChild(dialogContainer)
        dialogApp.mount('#dialog-custom-container')
      })
    }
  }
}

export default Dialog

var storage = require('electron-json-storage')

storage.clear(function(error) {
  if (error) throw error;
  init()
});

function init () {

  // Default to the view that was active the last time the app was open
  storage.get('activeSectionButtonId', function (err, id) {
    if (err) return console.error(err)

    if (id && id.length) {
      document.getElementById(id).click()
    } else {
      activeDefaultSection()
      displayAbout()
    }
  })

  document.body.addEventListener('click', function (event) {
    if (event.target.dataset.section) {
      handleSectionTrigger(event)
    } else if (event.target.dataset.modal) {
      handleModalTrigger(event)
    } else if (event.target.classList.contains('modal-hide')) {
      hideAllModals()
    }
  })

  function handleSectionTrigger (event) {
    hideAllSectionsAndDeselectButtons()

    // Highlight clicked button and show view
    event.target.classList.add('is-selected')

    // Display the current section
    let sectionId = event.target.dataset.section + '-section'
    document.getElementById(sectionId).classList.add('show')

    // Save currently active button in localStorage
    let buttonId = event.target.getAttribute('id')
    storage.set('activeSectionButtonId', buttonId, function (err) {
      if (err) return console.error(err)
    })
  }

  function activeDefaultSection () {
    document.getElementById('button-windows').click()
  }

  function handleModalTrigger (event) {
    hideAllModals()
    let modalId = event.target.dataset.modal + '-modal'
    console.log('modalId', modalId)
    document.getElementById(modalId).classList.add('show')
  }

  function hideAllModals () {
    let modals = document.querySelectorAll('.modal.show')
    Array.prototype.forEach.call(modals, function (modal) {
      modal.classList.remove('show')
    })
  }

  function hideAllSectionsAndDeselectButtons () {

    let sections = document.querySelectorAll('.content-item.show')
    Array.prototype.forEach.call(sections, function (section) {
      section.classList.remove('show')
    })

    let buttons = document.querySelectorAll('.nav-link.is-selected')
    Array.prototype.forEach.call(buttons, function (button) {
      button.classList.remove('is-selected')
    })
  }

  function displayAbout () {
    document.querySelector('#about-modal').classList.add('show')
  }
}

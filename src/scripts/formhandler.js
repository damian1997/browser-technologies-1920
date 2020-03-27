const mutationObserver = new MutationObserver((mutations) => {
  formSubmitHandler()
  animateForm()
})

if(document.getElementById('form-watcher')) {
  mutationObserver.observe(document.getElementById('form-watcher'), {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: true
  })
}

function formSubmitHandler() {
  const SURVEYFORM = document.querySelectorAll('form[name="survey"]')
  if(SURVEYFORM) {
    SURVEYFORM.forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault()
        const FORMDATA = []
        const RADIOFIELDS = form.querySelectorAll('input[type="radio"]')
        const RANGES = form.querySelectorAll('input[type="range"]') 
        const TEXTAREAS = form.querySelectorAll('textarea')
        const HIDDENFIELDS = form.querySelectorAll('input[type="hidden"]')

        if(RADIOFIELDS) {
          const checkedRadios = [...RADIOFIELDS].filter(node => {
            return (node.checked)
          })
          checkedRadios.forEach(node=> {
            FORMDATA.push(`${node.name}=${node.value}`)
          })
        }

        if(TEXTAREAS) {
          const textAreas = [...TEXTAREAS].forEach(node => {
            FORMDATA.push(`${node.name}=${node.value}`)
          })
        }

        if(RANGES) {
          const ranges = [...RANGES].forEach(node => {
            FORMDATA.push(`${node.name}=${node.value}`)
          })
        }

        if(HIDDENFIELDS) {
          const hiddenFields = [...HIDDENFIELDS].forEach(node => {
            FORMDATA.push(`${node.name}=${node.value}`)
          })
        }

        const QUERY = FORMDATA.join('&')
        const XHR = new XMLHttpRequest()

        XHR.onload = () => {
          const SURVEYWATCHER = document.getElementById('form-watcher')
          SURVEYWATCHER.insertAdjacentHTML('beforeend',XHR.response)
        }

        XHR.open('POST', `${window.location.origin}/survey`)
        XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        XHR.send(`${QUERY}&xhr=true`)

      })
    })
  }
}

function animateForm() {

}

formSubmitHandler()

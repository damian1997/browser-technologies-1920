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
        const FORMDATA = [],
              RADIOFIELDS = form.querySelectorAll('input[type="radio"]'),
              RANGES = form.querySelectorAll('input[type="range"]'),
              TEXTAREAS = form.querySelectorAll('textarea'),
              HIDDENFIELDS = form.querySelectorAll('input[type="hidden"]')

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

        const QUERY = FORMDATA.join('&'),
              XHR = new XMLHttpRequest()

        XHR.onload = () => {
          const SURVEYCONTAINER = document.getElementById('forms'),
                formSections = SURVEYCONTAINER.querySelectorAll('section')
          
          SURVEYCONTAINER.setAttribute('style', `left: -${(formSections.length * 100)}%;`)
          SURVEYCONTAINER.insertAdjacentHTML('beforeend',XHR.response)
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

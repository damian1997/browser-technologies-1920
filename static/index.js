/* CONTINUE SURVEY HANDLER */
//TODO RENAME FUNCTION
init()
function init() {
  const IDENTIFIER = checkIdentifier()

  if(IDENTIFIER !== undefined) {
    window.localStorage.setItem('identifier', IDENTIFIER)
  } else {
    if(window.location.pathname.includes('continue-survey')) {
      const LOCALSTORAGEIDENTIFIER = window.localStorage.getItem('identifier')
      const XHR = new XMLHttpRequest()

      XHR.onload = () => {
        const DOCUMENTBODY = document.body

        DOCUMENTBODY.innerHTML = XHR.response 
      }

      XHR.open('POST', `${window.location.origin}/survey`)
      XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      XHR.send(`identifier=${LOCALSTORAGEIDENTIFIER}&surveycontinue=true`)
    }
  }

}

function checkIdentifier() {
  return ( document.getElementById('identifier-setter') !== null ) ? document.getElementById('identifier-setter').value : undefined
}

/* AJAX SURVEY PAGINATION LOADING HANDLER */
const mutationObserver = new MutationObserver((mutations) => {
  getNextQuestion() 
})

mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
})

getNextQuestion()
function getNextQuestion() {
  const SURVEYFORM = document.querySelector('form[name="survey"]')
  if(SURVEYFORM) {
    SURVEYFORM.addEventListener('submit', (event) => {
      event.preventDefault()
      const FORMDATA = []
      const RADIOFIELDS = SURVEYFORM.querySelectorAll('input[type="radio"]')
      const RANGES = SURVEYFORM.querySelectorAll('input[type="range"]') 
      const TEXTAREAS = SURVEYFORM.querySelectorAll('textarea')
      const HIDDENFIELDS = SURVEYFORM.querySelectorAll('input[type="hidden"]')

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
        const DOCUMENTBODY = document.body
        DOCUMENTBODY.innerHTML = XHR.response 
      }

      XHR.open('POST', `${window.location.origin}/survey`)
      XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      XHR.send(`${QUERY}`)

    })
  }
}

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

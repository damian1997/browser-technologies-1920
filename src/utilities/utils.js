export function clearStorage() {
    window.localStorage.clear()
}

export function readStorage(storageLocation) {
    return JSON.parse(window.localStorage.getItem(storageLocation))
}

export function writeStorage(storageLocation, value) {
  window.localStorage.setItem(storageLocation, value)
}

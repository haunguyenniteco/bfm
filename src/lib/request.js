import getConfig from 'next/config'

const { serverRuntimeConfig = {} } = getConfig() || {}
const { apiKey, organizationId } = serverRuntimeConfig

export const defaultHeaders = {
  'DG-Api-Key': apiKey,
  'DG-Organization-Id': organizationId,
}

export function getJSON(url, useHeaders = false) {
  return fetch(url, {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      ...(useHeaders ? { ...defaultHeaders, ...useHeaders } : {}),
    },
    mode: 'cors',
    redirect: 'follow',
  }).then(response => response.json())
}

export function postJSON(url, data = {}, useHeaders = false) {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      ...(useHeaders ? { ...defaultHeaders, ...useHeaders } : {}),
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
  }).then(response => response.json())
}

export function putJSON(url, data = {}, useHeaders = false) {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      ...(useHeaders ? { ...defaultHeaders, ...useHeaders } : {}),
    },
    method: 'PUT',
    mode: 'cors',
    redirect: 'follow',
  }).then(response => response.json())
}

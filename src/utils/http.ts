import qs from 'qs'
import * as auth from '../auth-provider'
import { useAuth } from '../context/auth-context'
const APIURL = 'http://localhost:3001'

interface Config extends RequestInit {
  data?: string;
  token?: string;
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {

  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${APIURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  return (...[endpoint, config]: [string, Config]) => http(endpoint, { ...config, token: user?.token })
}
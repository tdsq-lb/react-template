import React from "react"
import { useState, useEffect } from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject } from '../../utils'
import qs from 'qs'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3001/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param])

  useEffect(() => {
    fetch('http://localhost:3001/users').then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])

  return <div>
    <SearchPanel param={param} setParam={setParam} users={users} />
    <List users={users} list={list} />
  </div>
}
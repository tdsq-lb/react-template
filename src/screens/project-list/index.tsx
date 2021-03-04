// import React from "react"
import { useState, useEffect } from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject, useMount, useDebounce } from '../../utils'
import { useHttp } from '../../utils/http'
import { useAuth } from '../../context/auth-context'
import { Button } from 'antd';
import styled from "@emotion/styled"

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const debouncedParam = useDebounce(param, 200)

  const { logout } = useAuth()

  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
  }, [debouncedParam])

  useMount(() => {
    client('users', {}).then(setUsers)
  })

  return <div>
    <PageHeader>
      <Button onClick={() => logout()}>登出</Button>
    </PageHeader>
    <Main>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </Main>
  </div>
}

export default (ProjectListScreen)

const PageHeader = styled.header`
height:6rem;
`
const Main = styled.main`
height:calc(100vh - 6rem)
`
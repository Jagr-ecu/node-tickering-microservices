import React from 'react'
import { Router } from 'next/router'
import useRequest from '../../hooks/useRequest'

const Signout = () => {
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
      doRequest()
    }, [])
    

  return (
    <div>Cerrando Sesión...</div>
  )
}

export default Signout
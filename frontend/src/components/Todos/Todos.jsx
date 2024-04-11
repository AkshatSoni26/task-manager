import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import axiosClient from '../../axiosclient'
import routes, { backed_urls } from '../../routes'
import { useNavigate } from "react-router-dom";
import Loader from '../loader';
import {useSelector} from 'react-redux'



function Todos() {

  // const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)
  const data = useSelector(state => state?.todo?.todos)

  return (
    <div>
      {
        !loading
        ?
        data.length > 0
        ?
        <>
        {
          data.map(
            (todo, id) => <Todo key={id} data={todo}/>
          )
        }
        </> 
        :
        <>make new Todo ..</> 
      :
      <Loader />
    }
    </div>
  )
}

export default Todos
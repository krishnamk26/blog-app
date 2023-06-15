import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../index';
import axios from 'axios';

function ManageBlog() {
    let [blogs, setBlogs] = useState([])
    let getData = async () => {
        // let res = await fetch(`${API_URL}`)
        // let data = await res.json()
        // setBlogs(data)
        try{
            let res = await axios.get(`${API_URL}`)
            if(res.status===200){
                setBlogs(res.data)
            }
        }catch (error){
            alert(error)
        }
    }

    useEffect(() => {
        getData()
    },[])

    let handleDelete= async(id)=>{
        // let res = await fetch(`${API_URL}/${id}`,{method:"DELETE"})
        // getData()
        try {
            let res = await axios.delete(`${API_URL}/${id}`)
            if(res.status===200){
                getData()
            }
        } catch (error) {
            
        }
    }
    return <>
        <div>
        <Table striped bordered hover style={{textAlign:'center',alignContent:"center"}}>
                <thead>
                    <tr>
                        <th style={{width:"5%"}}>#</th>
                        <th style={{width:"15%"}}>Title</th>
                        <th style={{width:"20%"}}>Descripion</th>
                        <th style={{width:"20%"}}>Image</th>
                        <th style={{width:"20%"}}>Status</th>
                        <th style={{width:"20%"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            blogs.map((e)=>{
                                return<tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.title}</td>
                                    <td><Description content={e.description}/></td>
                                    <td><Image imageUrl={e.imageUrl}/></td>
                                    <td>{`${e.active_flag}`}</td>
                                    <td><Action id={e.id}onDelete={handleDelete}/></td>
                                </tr>
                            })
                        }
                </tbody>
            </Table>
        </div>
    </>
}

export default ManageBlog

function Image({ imageUrl }) {
    return <>
        <div style={{ textAlign: "center", width: "100%" }}>
            <img src={imageUrl} alt={"BlogImage"} style={{ width: "75px", height: "55px" }} />
        </div>
    </>
}

function Description({ content }) {
    return <>
        <div>
            <div className='description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus minima optio cupiditate nostrum, quia necessitatibus ipsum in tempore dolor,
            </div>
        </div>
    </>
}

function Action({ id,onDelete }) {
    let navigate = useNavigate()
    return <>
        <i className="fa-sharp fa-solid fa-marker fa-ig" style={{ cursor: "pointer" }} 
        onClick={() => navigate(`/edit/${id}`)}></i>
        
            &nbsp;
            &nbsp;
        <i className="fa-sharp fa-solid fa-trash" style={{ color: "#de5a4b", cursor: "pointer" }} 
        onClick={()=>onDelete(id)} > </i>
    </>
}
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_URL } from '../index';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditBlog() {
  let params=useParams()
  let [count, setCount] = useState(0)
  let [title,setTitle] = useState('')
  let [imageUrl,setImageUrl] = useState('')
  let [description,setDescription]=useState('')
  const totalCount = 500;
  let navigate = useNavigate()
  let editBlogs = async (data) => {
    try {
      let res = await axios.put(`${API_URL}/${params.id}`, data)
      if (res.status === 201 || res.status === 200) {
        toast.success('Blog Saved Successfully')
        navigate('/manage')
      }
    } catch (error) {
      toast.error('Error')
    }
  }
   useEffect(()=>{
    if(params.id){
      getBlogById(params.id)
    }
  },[params.id])
  const getBlogById = async(id)=>{
    try {
      let res = await axios.get(`${API_URL}/${id}`)
      if(res.status===200 || res.status===201){
        setTitle(res.data.title)
        setImageUrl(res.data.imageUrl)
        setDescription(res.data.description)
      }
    } catch (error) {
      toast.error('Error')
    }
  }
  const formik = useFormik({
    initialValues: {
      title: title,
      imageUrl: imageUrl,
      description: description,
    },
    enableReinitialize:true,
    validationSchema: Yup.object({
      title: Yup.string().min(2, 'Too Short').max(24, 'Too Long').required('Required'),
      /**eslint-disable */
      imageUrl: Yup.string().required('Required').matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, 'Must be URL'),
      /**eslint-enable */
      description: Yup.string().min(100, 'Minimum 100 Characters Experted').max(totalCount, 'Too Long').required('Required'),
    }),
    onSubmit: value => {
      value.active_flag = false
      editBlogs(value)
    }
  })


  return <div className='manage-content'>
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text"
            placeholder="Title"
            id='title'
            name='title'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title} />
          {formik.touched.title && formik.errors.title ? (
            <div className='error'>{formik.errors.title}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control type="text"
            placeholder="Image URL"
            id='imageUrl'
            name='imageUrl'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageUrl} />
          {formik.touched.imageUrl && formik.errors.imageUrl ? (
            <div className='error'>{formik.errors.imageUrl}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={5}
            placeholder="Description"
            id='description'
            name='description'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyUp={(e) => setCount(e.target.value.length)}
            value={formik.values.description} />
          <Form.Text>{count} of {totalCount} Characters</Form.Text>
          {formik.touched.description && formik.errors.description ? (
            <div className='error'>{formik.errors.description}</div>
          ) : null}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  </div>
}

export default EditBlog
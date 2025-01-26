import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSingleMeal, updateMealApi } from '../../../apis/Api'

const UpdateMeal = () => {
    const { id } = useParams()

    useEffect(() => {
        getSingleMeal(id).then((res) => {
            console.log(res.data)

            setMealName(res.data.data.mealName)
            setMealDescription(res.data.data.mealDescription)
            setMealTime(res.data.data.mealTime)
            setMealCalories(res.data.data.mealCalories)
            setMealProteins(res.data.data.mealProteins)
            setMealCarbs(res.data.data.mealCarbs)
            setOldImage(res.data.data.mealImage)

        }).catch((error) => {
            console.log(error)
        })

    }, [])

    const [mealName, setMealName] = useState('')
    const [mealDescription, setMealDescription] = useState('')
    const [mealTime, setMealTime] = useState('')
    const [mealCalories, setMealCalories] = useState('')
    const [mealProteins, setMealProteins] = useState('')
    const [mealCarbs, setMealCarbs] = useState('')

    const [mealNewImage, setMealNewImage] = useState(null)
    const [previewNewImage, setPreviewNewImage] = useState(null)
    const [oldImage, setOldImage] = useState('')

    const handleImage = (event) => {
        const file = event.target.files[0]
        setMealNewImage(file)
        setPreviewNewImage(URL.createObjectURL(file))
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('mealName', mealName)
        formData.append('mealDescription', mealDescription)
        formData.append('mealTime', mealTime)
        formData.append('mealCalories', mealCalories)
        formData.append('mealProteins', mealProteins)
        formData.append('mealCarbs', mealCarbs)

        if (mealNewImage) {
            formData.append('mealImage', mealNewImage)

        }

        updateMealApi(id, formData).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message)
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                toast.error(error.response.data.message)
            }
            else if (error.response.status === 400) {
                toast.error(error.response.data.message)
            }
        })

    }

    return (
        <>
            <div className='container mt-3'>

                <h2>Update {mealName}</h2>
                <div className='d-flex gap-3'>
                    <form action="">
                        <label htmlFor="">Meal Name</label>
                        <input value={mealName} onChange={(e) => setMealName(e.target.value)} className='form-control' type="text" placeholder='Enter your meal name' />

                        <label className='mt-2' htmlFor="">Meal Description</label>
                        <textarea value={mealDescription} onChange={(e) => setMealDescription(e.target.value)} className='form-control' type="text" rows={3} placeholder='Enter your meal description' />

                        <label className='mt-2' htmlFor="">Meal Time</label>
                        <input value={mealTime} onChange={(e) => setMealTime(e.target.value)} className='form-control' type="number" placeholder='Enter your meal time' />

                        <label className='mt-2' htmlFor="">Meal Calories</label>
                        <input value={mealCalories} onChange={(e) => setMealCalories(e.target.value)} className='form-control' type="number" placeholder='Enter your meal calories' />

                        <label className='mt-2' htmlFor="">Meal Proteins</label>
                        <input value={mealProteins} onChange={(e) => setMealProteins(e.target.value)} className='form-control' type="number" placeholder='Enter your meal proteins' />

                        <label className='mt-2' htmlFor="">Meal Carbs</label>
                        <input value={mealCarbs} onChange={(e) => setMealCarbs(e.target.value)} className='form-control' type="number" placeholder='Enter your meal carbs' />

                        <label className='mt-2'>Choose Image</label>
                        <input onChange={handleImage} type="file" className='form-control' />

                        <button onClick={handleUpdate} className='btn black-btn w-100 mt-2'>Update Meal</button>

                    </form>
                    <div className='image section ms-3'>
                        <h6 className='mt-2'>Previewing Old Image</h6>
                        <img height={'170px'} width={'300px'} className='image-fluid rounded-4 object-fit-cover' src={`http://localhost:5000/products/${oldImage}`} alt="" />

                        {
                            previewNewImage && (
                                <>
                                    <h6 className='mt-2'>Previewing New Image</h6>
                                    <img height={'170px'} width={'300px'} className='image-fluid rounded-4 object-fit-cover' src={previewNewImage} alt =""/>
                                </>
                            )
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default UpdateMeal;
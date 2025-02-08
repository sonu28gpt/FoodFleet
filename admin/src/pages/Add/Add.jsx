// import React, { useState } from 'react'
// import './Add.css'
// import { assets, url } from '../../assets/assets';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Add = () => {


//     const [image, setImage] = useState(false);
//     const [data, setData] = useState({
//         name: "",
//         description: "",
//         price: "",
//         category: "Salad"
//     });

//     const onSubmitHandler = async (event) => {
//         event.preventDefault();

//         if (!image) {
//             toast.error('Image not selected');
//             return null;
//         }

//         const formData = new FormData();
//         formData.append("name", data.name);
//         formData.append("description", data.description);
//         formData.append("price", Number(data.price));
//         formData.append("category", data.category);
//         formData.append("image", image);
//         const response = await axios.post(`${url}/api/food/add`, formData);
//         if (response.data.success) {
//             toast.success(response.data.message)
//             setData({
//                 name: "",
//                 description: "",
//                 price: "",
//                 category: data.category
//             })
//             setImage(false);
//         }
//         else {
//             toast.error(response.data.message)
//         }
//     }

//     const onChangeHandler = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setData(data => ({ ...data, [name]: value }))
//     }

//     return (
//         <div className='add'>
//             <form className='flex-col' onSubmit={onSubmitHandler}>
//                 <div className='add-img-upload flex-col'>
//                     <p>Upload image</p>
//                     <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
//                     <label htmlFor="image">
//                         <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
//                     </label>
//                 </div>
//                 <div className='add-product-name flex-col'>
//                     <p>Product name</p>
//                     <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
//                 </div>
//                 <div className='add-product-description flex-col'>
//                     <p>Product description</p>
//                     <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
//                 </div>
//                 <div className='add-category-price'>
//                     <div className='add-category flex-col'>
//                         <p>Product category</p>
//                         <select name='category' onChange={onChangeHandler} >
//                             <option value="Salad">Salad</option>
//                             <option value="Rolls">Rolls</option>
//                             <option value="Deserts">Deserts</option>
//                             <option value="Sandwich">Sandwich</option>
//                             <option value="Cake">Cake</option>
//                             <option value="Pure Veg">Pure Veg</option>
//                             <option value="Pasta">Pasta</option>
//                             <option value="Noodles">Noodles</option>
//                         </select>
//                     </div>
//                     <div className='add-price flex-col'>
//                         <p>Product Price</p>
//                         <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
//                     </div>
//                 </div>
//                 <button type='submit' className='add-btn' >ADD</button>
//             </form>
//         </div>
//     )
// }

// export default Add

import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: '',
    category: 'Salad',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
    e.target.value = '';
  };

  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error('Image not selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', Number(data.price));
      formData.append('category', data.category);
      formData.append('image', image);
      // console.log([...formData.entries()]);
      // console.log(formData.get("image"));
      const response = await axios.post(`${url}/api/food/add`, formData,{
        headers: { "Content-Type": "multipart/form-data" },
    });
      // console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: '',
          description: 'Food provides essential nutrients for overall health and well-being',
          price: data.price,
          category: data.category,
        });
        setImage(false);
        setImagePreview(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred while adding the product.');
      console.error(error);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <input
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            id="image"
            hidden
          />
          <label htmlFor="image">
            <img
              src={!imagePreview ? assets.upload_area : imagePreview}
              alt="Upload"
            />
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            required
            autoComplete="off"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            rows={6}
            placeholder="Write content here"
            required
            autoComplete="off"
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="25"
              autoComplete="off"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;


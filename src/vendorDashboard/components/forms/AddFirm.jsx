import React, {useState} from 'react'
import {API_URL} from '../../data/ApiPath';

const AddFirm = () => {
  const [firmname,setFirmname]=useState("");
  const [area,setArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);

  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setFile(selectedImage)
  }

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !==value));
    }else{
      setCategory([...category,value])
    }
  }
  const handleRegionChange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !==value));
    }else{
      setRegion([...region,value])
    }
  }

  const handleFirmSubmit=async(e)=>{
    e.preventDefault();
  try{
    const loginToken=localStorage.getItem('loginToken');
    if(!loginToken){
      console.error("User not authenticated");
    }

    const formData=new FormData();
     formData.append('firmname',firmname);
     formData.append('area',area);
     formData.append('offer',offer);
     formData.append('image',file);

     category.forEach((value)=>{
      formData.append('category',value)
     });
     region.forEach((value)=>{
      formData.append('region',value)
     })

     const response= await fetch(`${API_URL}/firm/add-firm`,{
      method: 'POST',
      headers: {
        'token': `${loginToken}`
      },
      body: formData
     });
     const data=await response.json()
     if(response.ok){
       console.log(data);
       setFirmname("");
       setArea("");
       setCategory([]);
       setRegion([]);
       setOffer("");
       setFile(null);
       alert("firm added successfully")
     }
     else if(data.message==="vendor can have only one firm"){
      alert("Firm Exists. Only 1 firm can be added")
     }else{
      alert('Failed to add Firm')
     }
     console.log("this is firm Id",data.firmId);
     const mango=data.firmId;

     localStorage.setItem('firmId',mango)

  }catch(error){
    console.error("failed to add firm")
  }
  }

  return (
    <div className="firmSection">
       <form  className='tableForm' onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type="text" name='firmname' value={firmname} onChange={(e)=>setFirmname(e.target.value)}/>
            <label>Area</label>
            <input type="text"  name='area' value={area} onChange={(e)=>setArea(e.target.value)} />
            {/* <label>Category</label>
            <input type="text" /> */}
    <div className="checkInp">
      <label >Category</label>
             <div className="inputsContainer">
             <div className="checkboxContainer">
                  <label >Veg</label>
                  <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
                </div>
                <div className="checkboxContainer">
                  <label >Non-Veg</label>
                  <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
                </div>
             </div>
    </div>
    <label>Offer</label>
            <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)} />
    <div className="checkInp">
      <label >Region</label>
             <div className="inputsContainer">
             <div className="regboxContainer">
                  <label >South Indian</label>
                  <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange}/>
                </div>
                <div className="regboxContainer">
                  <label >North Indian</label>
                  <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange}/>
                </div>
                <div className="regboxContainer">
                  <label >Chinese</label>
                  <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange}/>
                </div>
                <div className="regboxContainer">
                  <label >Bakery</label>
                  <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange}/>
                </div>
             </div>
    </div>
            {/* <label>Region</label>
            <input type="text" /> */}
            <label>Firm Image</label>
            <input type="file" onChange={handleImageUpload} />
            <br />
        <div className="btnSubmit">
            <button type='submit'>Submit</button>
        </div>
       </form>
    </div>
  )
}

export default AddFirm

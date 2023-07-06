import React ,{} from  'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import "./Blog.css"
function PostDetails({data ,setTrigger  }) {
    //blog have link from react router dom to take u to one blog with the id 
    const del=(id)=>{
        axios
            .delete(`http://localhost:3000/blogs/${id}`)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            })
      } 
    console.log(data)
        return (
          <div>
            {data.map((ele, i) => {
              return (
                <div className="container" key={data.id}>
                <img className="image" src={ele.blog_image} alt={ele.title} />
                <h3>{data.title}</h3>
                <p>content: {ele.content}</p>
                
                <div>
                <button className="button " onClick={()=>{del(ele.id);
                  setTrigger(true)}}> delete </button>
                </div>
                <div>
                  <button  className='button'>
                    <Link to={`/Update`}>update</Link> 
                     </button>
                </div>
              </div>
              );
            })}
          </div>
        );
      }

export default PostDetails
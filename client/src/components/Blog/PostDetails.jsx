import React ,{} from  'react'
import axios from 'axios';
import "./Blog.css"
import Update from './Update';



function PostDetails({data ,setTrigger  }) {
   
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
    
        return (
          <div>
            {data.map((ele, i) => {
              return (
                <div className="container" key={data.id}>
                <img className="image" src={ele.blog_image} alt={ele.title} />
                <h3>title:{ele.title}</h3>
                <p>content: {ele.content}</p>
   
                <div>
                <button className="button" onClick={()=>{del(ele.id);
                  setTrigger(true)}}> delete </button>
                </div>
                <div>
                { (
              <Update postId={ele.id} setTrigger={setTrigger} />
            )}
                  
                </div>
              </div>
              );
            })}
          </div>
        );
      }

export default PostDetails
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPosts } from "../Action";
export default function Detail(){
    const home = useNavigate();
    const id = useParams().id;
    const users = useSelector((state) => state.users);
    const user = users.find((user) => user.id === id);
    const [show ,setShow] = useState(false)
    const [addpost ,setAddpost] = useState(false)
    const posts = useSelector((state) => state.posts[0]); 

    console.log(posts)

    const postsUser = posts.filter((post) => post.userId == id); 

    // console.log(postsUser);

    const [idPost, setIdPost] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const dispatch = useDispatch();
    
 

    function showPosts(){
      if(postsUser){
        return (
          postsUser.map((item)=>(
            <div className="post" style={{backgroundColor:'rgb(10, 202, 130)', color:'white', marginTop : "-40px", marginBottom:'30px', width:'80%', margin:'auto', borderRadius:'10px', padding:'20px'}} key={item.id}>
              <div style={{display : 'flex', gap:'10px'}}>
                <div style={{margin:'0', width:'20px', height:"20px",textAlign:'center', fontWeight:'bold', alignItems:"center", borderRadius:'50%', backgroundColor:'white', color:'rgb(10, 202, 130)'}}>{item.id}</div>
                  <h6 style={{textDecoration:'underline'}}>
                    {item.title}
                  </h6>
                </div>
              <p style={{width:'80%', marginLeft:'10px'}}>- {item.description}</p>
              <br/>
            </div>
          ))
        )
      }
    }
    function AddPosts(){
      function handleAddP(e){
        e.preventDefault();
        const newPost = {
          id: idPost,
          userId: id,
          title: title,
          description: description,
        };
        console.log(newPost)
        dispatch(setPosts([...posts, newPost]))
        console.log(posts)
      }
      return(
        <div>
          <form onSubmit={handleAddP} style={{backgroundColor:'rgb(10, 202, 130)', width:'400px', margin:'auto', borderRadius:'10px', padding:'15px'}}>
            <table className="table" style={{color : 'white', fontFamily : 'verdana', fontWeight:'bold'}}>
                <tr>
                  <td>ID POST : </td>
                  <td>
                    <input onChange={e=>setIdPost(e.target.value)} type="text" style={{width:'100%', margin:'5px', border:"2px solid white", color:'white', fontFamily:'verdana', outline:'none', borderRadius:'10px'}}/>
                  </td>
                </tr>
                <tr>
                  <td>TITLE : </td>
                  <td>
                    <input onChange={e=>setTitle(e.target.value)} type="text" style={{width:'100%', margin:'5px', border:"2px solid white", color:'white', fontFamily:'verdana', outline:'none', borderRadius:'10px'}}/>
                  </td>
                </tr>
                <tr>
                  <td>DESCRIPTION : </td>
                  <td>
                    <textarea onChange={e=>setDescription(e.target.value)} style={{width:'100%', margin:'5px', border:"2px solid white", color:'white', fontFamily:'verdana', outline:'none', borderRadius:'10px'}}></textarea>
                  </td>
                </tr>
                <tr>
                  <td colspan='2'>
                    <input type="submit" value='ADD POST' style={{backgroundColor:'white', color:'rgb(10, 202, 130)', fontFamily:'verdana', fontWeight:'bold', borderRadius:'10px', border:'2px solid rgb(10, 202, 130)', outline:'3px solid white', width:'100%'}}/>
                  </td>
                </tr>
            </table>
          </form>
        </div>
      )
    }



    function handleBack(e){
        e.preventDefault();
        home('/')
    }
    return(
        <Fragment>
            <button onClick={handleBack} className="btnGoBack-detail"><i class="fa fa-arrow-circle-left"></i></button>
            <div className="bodyDetail">
                <div className="Cover">
                    <img className="img-cover" src='/Covers/cover2.jpg'/>
                </div>
                <img className="Profil-img" src='data:image/png;base64,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'/>
                <h1 className="name-profil">{user.fullname}</h1>
                <h5 className="headline">Junior Web Developer</h5>
                <p className="hashstags">Sujets de prédilection : #developpement, #fullstack</p>
                <h6 className="localisation">{user.email}</h6>
                <button className="centre">🏫 ISMONTIC </button>
                <p className="description">
                    <h5>Infos : </h5>
                    Hi👋 ! iam {user.fullname} and welcom to my officiel page.
                </p>
                <button className="a-btn" onClick={()=>(setShow(!show))}>Posts 🆕</button>
                <button className="a-btn">Activite ✨</button>
                <button className="a-btn">Commentes 💬</button>
                <button className="a-btn" onClick={()=>(setAddpost(!addpost))}>Add Posts 🖋</button>
                <div style={{position:'relative', bottom:'40px', display:'flex', gap:'10px', flexDirection:'column'}}>
                  {show ? showPosts() : null}
                  {addpost ? AddPosts() : null}
                </div>
            <br/>
            </div>
      <br/>
      <br/>
        </Fragment>
    )
}


import {useState} from "react"
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import List from "./componsnts/List";
import Alert from "./componsnts/alert";

function App() {
  const [name,setName] = useState("");
  const [list,setList] = useState([]);

  const [alert,setAlert] =useState({show:false,msg:'',type:''});
  const [checkEditItem,setcheckEditItem] = useState(false);
  const [editId,setEditId] = useState(null);

  const submitData = (e)=>{
    e.preventDefault();
    if(!name){
      setAlert({show:true,msg:"กรุณาป้อนข้อมูล",type:"error"})
    }else if(checkEditItem && name){
      // update data
      const result = list.map((item)=>{
        if(item.id === editId){
          return {...item,title:name}
        }
        return item
      })
      setList(result)
      setName('')
      setcheckEditItem(false)
      setEditId(null)
      setAlert({show:true,msg:'แก้ไขข้อมูลเรียบร้อยแล้ว',type:'success'})

    }else{
      const newItem = {
        id:uuidv4(),
        title: name
      }
      setList([...list,newItem])
      setName("")
      setAlert({show:true,msg:"บันทึกข้อมูลเรียบร้อย",type:"success"})
    }
  }
  
  const removeItem = (id)=>{
    setList(list.filter((item)=>item.id !== id))
    setAlert({show:true,msg:"ลบข้อมูลเรียบร้อย !",type:"error"})
  }

  const ediItem = (id)=>{
    setEditId(id)
    setcheckEditItem(true);
    const searchItem = list.find((item)=>item.id === id)
    setName(searchItem.title);
  }

  return (
    <section className="container">
        <h1>TodoList App</h1>
        {alert.show && <Alert {...alert} setAlert={setAlert} list={list}/>}
        <form className="form-grop" onSubmit={submitData}> 
            <div className="form-control">
              <input type="text" className="text-input" onChange={(e)=>setName(e.target.value)} value={name}></input>
              <button type="submit" className="submit-btn">{checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</button>
            </div>
        </form>
        <section className="list-container">
            {list.map((data,index)=>{
              return(
                <List key={index} {...data} removeItem={removeItem} ediItem={ediItem}/>
              )
            })}
        </section>
    </section>
  );
}

export default App;

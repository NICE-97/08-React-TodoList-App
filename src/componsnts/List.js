import { BiEdit,BiTrash } from "react-icons/bi";

const List = ({id,title,removeItem,ediItem})=>{
    return(
        <div className="list-item">
            <p className="title">{title}</p>
            <div className="btn-container">
                <BiEdit onClick={()=>ediItem(id)} className="btn"/>
                <BiTrash onClick={()=>removeItem(id)} className="btn"/>
            </div>
        </div>
    )
}

export default List
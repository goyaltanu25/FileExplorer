import { Container} from "react-bootstrap";

import '../Styles/styles.css'
import { fileItems } from '../utils/filestructure';
import Folder from "./Folder";
import File from "./File"
import { useState } from "react";

export default function Sidebar() {
    const [data,setData]=useState(fileItems);

    const updateExpand = (items,isExpanded)=>{
        const itemstemp = items.map((file)=>{
                if(file.items){
                    const items =  updateExpand(file.items,isExpanded);
                    return{
                        ...file,
                        isExpanded:isExpanded,
                        items:items
                    }
                 }else{
                    return{
                        ...file,
                        isExpanded:isExpanded,
                    }
                }
            })
          return itemstemp;
        }

    const toggleFolderSection=(index)=>{
        const datatemp = data.map((file,i)=>{
             if(index===i){
                 const isExpanded = file.isExpanded ? false :true;
                 if(file.items){
                    const items =  updateExpand(file.items,isExpanded);
                    return{
                        ...file,
                        isExpanded:isExpanded,
                        items:items
                    }
                 }else{
                    return{
                        ...file,
                        isExpanded:isExpanded,
                    }
                 }
                 
               
             }
             return file;
        })
        console.log('updateddata',datatemp);
        setData(datatemp);
    }

    const traverseFiles =(items)=> {
        return items.map((file, index) => {
            if (file.isDirectory) {
                return <div >
                  <Folder file={file} traverseFiles={traverseFiles} index={index} toggleFolderSection={toggleFolderSection}/>
                </div>

            } else {
                return <>
                    {file.isExpanded && <File file={file}/>}
                </>
            }
        });
    };

    return <>
        <Container className="sidebar">
            <div className="file-explorer-container">
                {traverseFiles(data)}
            </div>
        </Container>
    </>
}
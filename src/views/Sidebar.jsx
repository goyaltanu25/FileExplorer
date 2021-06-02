import { Container} from "react-bootstrap";

import '../Styles/styles.css'
import { fileItems } from '../utils/filestructure';
import Folder from "./Folder";
import File from "./File"
import { useState } from "react";

export default function Sidebar() {
    const [data,setData]=useState(fileItems);

    
    const addFile =(i,name,items=data)=>{
        const datatemp = items.map((file, index) => {
            if(index === i && file.name === name){
                const file={
                    'name': 'New file.txt',
                    'isDirectory': false,
                    'isExpanded':true,
                    'size': 1024
                  }
                if(file.items){
                    file.items.push(file);
                }else{
                    items.push(file);
                }

                return file;
            }
            else{
                 if(file.items){
                  addFile(i,name,file.items);
                }
            }    
            return file   
        });
        setData(datatemp);
    }

    const addFolder =(i,name,items=data)=>{
        const datatemp = items.map((file, index) => {
            if(index === i && file.name === name){
                const folder={
                    'name': 'New Folder',
                    'isDirectory': true,
                    'isExpanded':true,
                    'items':[]
                }
                file.items.push(folder);
                return file;
            }
            else{
                 if(file.items){
                  addFolder(i,name,file.items);
                }
            }    
            return file   
        });
        setData(datatemp);
    }

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

    const toggleFolderSection=(index,name)=>{
        const datatemp = data.map((file,i)=>{
             if(index===i && name === file.name){
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
        setData(datatemp);
    }

    const traverseFiles =(items)=> {
        return items.map((file, index) => {
            if (file.isDirectory) {
                return <div >
                  <Folder 
                  file={file} 
                  traverseFiles={traverseFiles} 
                  index={index} 
                  toggleFolderSection={toggleFolderSection}
                  addFolder={addFolder}
                  addFile={addFile}
                  />
                </div>

            } else {
                return <>
                    <File file={file}/> 
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
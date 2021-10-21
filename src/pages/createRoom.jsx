import React,{useState,useContext} from "react";
import { useHistory, useParams } from "react-router-dom";
import {apicall,datatojson} from "../services/api.js";
import { AppContext } from "../store/AppContext";

export const CreateRoom = () => {
  //const [roomid,setroomid] = useState(null);
  const [token,settoken] = useState(null);
  const history = useHistory();
  const { name} = useParams();
  const context = useContext(AppContext);
  const { setLoginInfo } = context;


  const onchange= (event)=>{
    settoken(event.target.value);  
  }
  //setroomid(1);
  const submit= async ()=>{
    const resp = await apicall("/.netlify/functions/getid",datatojson(token,name));
    console.log(JSON.stringify(resp).id);
    if (JSON.stringify(resp) !== "invalid"){
      console.log(resp);
    }
   // console.log(roomid);
    setLoginInfo({roomId: resp});
    history.push(`/preview/${name}/host`);
  }
  return (
    <div className=" flex justify-center items-center w-full h-full text-white">
      <div className="bg-gray-100 text-white w-1/2 m-2 p-2  rounded-lg divide-solid">
        <div className="text-2xl align-center mb-3 p-3 border-b-2">Join Room</div>

        <div className="flex flex-wrap text-sm">
          <div className="w-full flex justify-end m-2">
            <div className="w-1/3 flex justify-end items-center">
              <span>Token:</span>
            </div>
            <div className="p-2 w-2/3">
              <input onChange={onchange}className="rounded-lg bg-gray-200 w-full p-1 px-2"></input>
            </div>
            <button type="submit" className="bg-blue-main rounded-lg px-5 py-2" onClick={submit} >Join</button>
          </div>
        </div>
      </div>
    </div> 
    
  );
};

//312784656310206663 samay token   https://github.com/piyush-panpaliya/streamit/blob/master/src/pages/createRoom.jsx
//312877401014010056 piyush token   
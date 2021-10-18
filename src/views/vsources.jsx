import {React,useRef, useEffect} from "react";
import {
  useHMSStore,
  useHMSActions,
  selectPeers,
  selectCameraStreamByPeerID } from "@100mslive/hms-video-react";
import NewWindow from 'react-new-window';

function Videotile({peer}) {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  // get the camera track to render
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);

  return <video height="180" width="320" ref={videoRef} autoPlay muted playsInline></video>;
}

export const Vsource = () =>{
  const peer = useHMSStore(selectPeers);
  return  <>
  {peer.map(peer => 
    <NewWindow features="width=320,height=180,toolbar=no,menubar=yes,location=no,resizable=no,scrollbars=no,status=no,left=10,top=10" 
      title={peer.name} >
    <Videotile key={peer.id} peer={peer}/>
    </NewWindow>)
  }
  </>
 };


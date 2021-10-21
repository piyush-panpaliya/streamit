import {React,useRef, useEffect} from "react";
import {
  useHMSStore,
  useHMSActions,
  selectPeers,
  selectCameraStreamByPeerID,
  selectIsSomeoneScreenSharing,
  selectPeerScreenSharing,
  VideoTile

   } from "@100mslive/hms-video-react";
import NewWindow from 'react-new-window';

function Videotile({peer}) {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  // get the camera track to render
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  //const screentrack = useHMSStore(selectScreenShareByPeerID(presenter.id));
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
  //const localPeer = useHMSStore(selectLocalPeer);
  const presenter = useHMSStore(selectPeerScreenSharing);
  const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  return  <>
  {peer.map(peer => 
    <NewWindow key={peer.id} features="width=320,height=180,toolbar=no,menubar=yes,location=no,resizable=no,scrollbars=no,status=no" 
      title={peer.name} >
    <Videotile key={peer.id} peer={peer}/>
    </NewWindow>)
  }
  {isSomeoneScreenSharing ?( 
    //  selectIsLocalScreenShared ? 
    //  null :
      <NewWindow key={peer.id} features="width=320,height=180,toolbar=no,menubar=yes,location=no,resizable=no,scrollbars=no,status=no" 
      title="shared screen" >
      <VideoTile peer={presenter} showScreen={true} objectFit="contain"/>
        </NewWindow> ) : null}
  </>
 };


import React, { useEffect, useState, } from 'react';
import { connect } from "react-redux";
import { useParams } from 'react-router';
import { RETRIEVE_ROOM } from '../../../actions/room/types';
import RoomService from '../../../services/room/room-service';
 function RoomPage({roomDispatch}) {
    const { id } = useParams();
    const [room, setRoom] = useState({
        town: '',
        capacity: '',
        price: '',
    });
    useEffect(() => {
        RoomService.getSingleRoom(id).then((res) => {
            setRoom(res);
            roomDispatch({type:RETRIEVE_ROOM,payload:res});
            
        })
            .catch((err) => {
                console.log(err);
            })
    },[])
    return <div><br/><br/><br /><br/>
    <div className='bg-white rounded'>
        <h1 className='text-center'>Détails de la chambre</h1>
        <h2>Localité : {room.town}</h2>
    
    </div></div>

}
function mapDispatchToProps(dispatch){
    return {
        roomDispatch:(action)=>dispatch(action),
    }
}
export default connect(null,mapDispatchToProps)(RoomPage)
import React, { useEffect, useState, } from 'react';
import { connect } from "react-redux";
import RoomService from '../../../services/room/room-service';
import { GET_ALL_ROOMS } from '../../../actions/room/types';
import Room from '../SingleRoom/Room'
function RoomList({ roomDispatch,rooms }) {
    const [roomsList,setRooms]=useState([])
    useEffect(()=>{
        RoomService.getAllRooms().then((res)=>{
            setRooms(res)
            roomDispatch({
                type:GET_ALL_ROOMS,
                payload:res
            })

        })
        .catch((err)=>{

        })
    },[])

    return  <div className="container-fluid home" >
            <br/><br/><br/>
            <h1 className="text-white text-center">Liste des chambres</h1>
            <br/><br/><br/>
            <div className="d-flex flex-wrap flex-column flex-md-row ">
            {roomsList.map((room) => <Room key={room.id} room={room} />)}
            </div>
       </div>
}



function mapStateToProps(state){
    return {
        rooms:state.room,
    }
}
function mapDispatchToProps(dispatch) {
    return { roomDispatch: (action) => dispatch(action) }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);


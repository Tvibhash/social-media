import { makeStyles } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => (
    {
        appBar: {
            borderRadius: 15,
            margin: "30px 0",
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            padding:'10px 50px',
        },
        heading:{
            color:'rgba(0,183,255,1)',
            textDecoration:'none',
        },
        welcome:{
            color:'rgb(4, 59, 92)',
            textDecoration:'none'
        },
        image:{
            marginLeft:'15px'
        },
        toolBar:{
            display:'flex',
            justifyContent:'flex-end',
            width:'400px'
        },
        profile:{
            display:'flex',
            justifyContent:'space-between',
            width:'400px'
        },
        userName:{
            display:'flex',
            alignItems:'center'
        },
        brandContainer:{
            display:'flex',
            alignItems:'center'
        },
        purple:{
            color:theme.palette.getContrastText(deepPurple[500]),
            backgroundColor:deepPurple[500]
        }





    }
))    

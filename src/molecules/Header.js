import React, { Component } from 'react';
import {Link} from 'react-router-dom'
const t = [{name:'home',url:'/',type:'all'},
  {name:'user',url:'/user',type:true},
  {name:'scenario',url:'/scenario',type:true},
  {name:'playlog',url:'/playlog',type:true},
  {name:'logout',url:'/logout',type:true},
  {name:'signin',url:'/signin',type:false},
  {name:'signup',url:'/signup',type:false},
  {name:'game',url:'/game',type:false}
]

class Header extends Component{
  render(){
    return(
      <div className="header">
        {t.map( t => {
          if(this.props.type === t.type || t.type === "all"){
            return <Link style={(this.props.currentUrl === t.url) ? {margin:"20px",pointerEvents:"none",color:"black",textDecoration:"none"} : {margin:"20px"}} to={t.url}>
              {t.name}
            </Link>
          } else {
            return null
          }
        })}
      </div>
    )
  }
}

export default Header;

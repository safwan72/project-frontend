import './App.css';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from './app/actionCreator';
import RouteElement from './components/Routes/RouteElement';

const mapDispatchToProps = (dispatch)=>{
  return{
      authcheck:()=>dispatch(actions.authcheck())
  }
}
const App=({authcheck})=> {
  const isAdmin = useSelector(state => state?.user_details?.isAdmin);

  React.useEffect(() => {
    authcheck()
}, [authcheck])
  return (
    <div className='h-screen'>
      <RouteElement isAdmin={isAdmin}/>
    </div>
  );
}

export default connect(null,mapDispatchToProps)(App);;

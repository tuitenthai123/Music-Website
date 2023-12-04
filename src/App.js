import { useState } from "react";
import { useDispatch} from "react-redux";
import { Home , Login ,Public,Personal ,Album,ThaiChart,Search,SearchSongs, SearchAll} from './containers/public';
import { Routes,Route } from "react-router-dom";
import path from "./ultis/path";
import { useEffect } from "react";
import * as actions from './store/actions'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WeekRank from "./containers/public/WeekRank";

function App() {
const dispatch = useDispatch()
useEffect(()=>{
  dispatch(actions.getHome())
},[])
  return (
      <>
    <div>
        <Routes>
            <Route path={path.PUBLIC} element={<Public />}>
                   <Route path={path.HOME} element={<Home />} />
                   <Route path={path.LOGIN} element={<Login />} />
                   <Route path={path.Personal} element={<Personal />} />
                   <Route path={path.Album_TITLE_PID} element={<Album />} />
                   <Route path={path.PLAYLIST_TITLE_PID} element={<Album />} />
                   <Route path={path.WEEKRANK_TITLE_PID} element={<WeekRank />} />
                   <Route path={path.THAI_CHART} element={<ThaiChart />} />
                   <Route path={path.SEARCH} element={<Search />}>
                      <Route path={path.ALL} element={<SearchAll/>} />
                      <Route path={path.SONG} element={<SearchSongs />} />
                   </Route>
            </Route>
        </Routes>
    </div>
    <ToastContainer
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="light"
    />
     </>
  );
}

export default App;

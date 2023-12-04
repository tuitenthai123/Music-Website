import { root } from "postcss";
import appReducer from "./appReducer";
import { combineReducers,applyMiddleware} from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import musicReducer from "./musicReducer";



const commonConfig ={
    storage: storage,
    stateReconciler:autoMergeLevel2
}

const musicConfig = {
    ...commonConfig,
    key:'music',
    whitelist: ['curSongId','CurSongData','curAlbumId']
}

const rootReducer = combineReducers(
    {
        app: appReducer,
        nhac: persistReducer(musicConfig,musicReducer),
    }
)

export default rootReducer
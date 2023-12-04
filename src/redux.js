import rootReducer from "./store/reducers/rootReducer";
import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk' //=> thunk dùng gọi hàm nếu như ko có nó trả về đúng một đối tượng mục đích dùng để gọi một API
import { persistStore } from "redux-persist";


const reduxConfig = () => {
    const store = createStore(rootReducer,applyMiddleware(thunk))
    const persistor = persistStore(store)
    return {store,persistor}
}

export default reduxConfig
import { NavigationContainer } from "@react-navigation/native";
import LessorNavigation from "./app/navigation/LessorNavigation";
import TenantNavigation from "./app/navigation/TenantNavigation";
import LoginNavigation from "./app/navigation/LoginNavigation";
import Login from "./app/screen/Login";
import Register from "./app/screen/Register";
import ManageAccount from "./app/screen/MangeAccount";
import AnnouceNewsT from "./app/screen/tenant/AnnouceNews";
import AnnouceNewsL from "./app/screen/lessor/AnnouceNews";
import NewsDetail from "./app/screen/lessor/NewsDetail";
import CreatedPost from "./app/component/annoucenews/createdPost";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { legacy_createStore as createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";


import { EvaIconsPack } from "@ui-kitten/eva-icons";
import userReducer from "./app/storeRedux/reducer/userReducer";
import { useEffect, useState } from "react";

const App = () => {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  const [userFromApp, setUserFromApp] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const rootReducer = combineReducers({
    user: userReducer,
  });
  const store = createStore(rootReducer);

  useEffect(() => {
    console.log(userFromApp);
  }, [userFromApp]);
  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            {/* <LessorNavigation /> */}
            {!userFromApp && isLogin && (
              <Login setUserFromApp={setUserFromApp} />
            )}
            {/* {!userFromApp && !isLogin && (
              <Register setIsLogin={setIsLogin} />
            )} */}
            {userFromApp && userFromApp.role == "tenant" && (
              <TenantNavigation setUserFromApp={setUserFromApp} />
            )}
            {userFromApp && userFromApp.role == "lessor" && (
              <LessorNavigation setUserFromApp={setUserFromApp} />
            )}
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    </>
  );
};
export default App;

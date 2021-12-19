import Login from '../screens/Login';
import Signup from "../screens/Signup";
import AuthStack from "./AuthStack";
import {NavigationContainer} from "@react-navigation/native";

const Navigation=()=> {
    return(
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>
    );
};

export default Navigation;
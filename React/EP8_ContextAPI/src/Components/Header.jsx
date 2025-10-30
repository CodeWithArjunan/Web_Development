import { useContext } from "react";
import { UserContext } from "../App";
function Header(){
    
    // let reciveVal = useContext(UserContext);
    let {user:{name}}= useContext(UserContext);
    return(
        <header>
            <h1>{name}</h1>
            {/* <h1>ReactCourse -{name.slice(0,1)}</h1> */}
        </header>
    )
}
export default Header;
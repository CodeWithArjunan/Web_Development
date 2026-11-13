import { UserContext}from "../App";
let date =new Date();
function Footer(){
    // console.log(props);

    return(
        <UserContext.Consumer>  
           {        //It only return as a funtion
            ({user})=>{  
                return(
                    <footer>  <h1>{user.name}-{date.getFullYear()}</h1></footer>
                );
            }
           }
        </UserContext.Consumer>
    )
}
export default Footer;
import { Link } from "react-router-dom";

  export default function Error(){
    return(
        <div>
            <h1>404 error:Page Not Found</h1>
            <Link className="bg-[#efac38] p-1" to="/">
            Go back to Home 
            </Link>
        </div>
    )
  }
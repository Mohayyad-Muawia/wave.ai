import { useEffect } from "react"

const Err = ({error, setError}) => {

    useEffect(() => {
        const closeErr = () => {
            setError(null)
        }
    
        const closeBtn = document.querySelector('.error button')
        closeBtn.addEventListener('click', () => {
            closeErr()
        })
    },[error])


    return (  
        <>
        <div className="error">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <h1>Error!</h1>
            <p>{ error }</p>
            <button>Close</button>
        </div>
        </>
    );
}
 
export default Err;
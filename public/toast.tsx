import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export function success(message:string){
    toast.success(`${message}`,{
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
}


export function failed(message:string){
toast.error(`${message}`,{
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000
  });
}


export function warning(message:string){
toast.warn(`${message}`,{
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000
  })
}
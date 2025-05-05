



export default function Testing(props){
  
  
     return(
      <div className='card'>
      <img src={props.url} alt='product '/>
      <h2>{props.name} </h2>
      <p className='price'>{props.price}</p>
      <button>{props.description}</button>
    </div>
     )
}
import '../css/profile.css'


function NewOrder(props:any) {
  console.log(props)
  return (
    <>
    <div className="order-card my-2">
        <div className="order-details">
            <p>
            <strong>Items: </strong>{props.order.items && props.order.items.map((item:any, index:any)=>{return (<>{item.name} x{item.quantity} </>)})}
            
            </p>
            <p><strong>Total Price:</strong> ${props.order.total.toFixed(2)}</p>
            <p><strong>Status:</strong> {props.order.status}</p>
        </div>
    </div>
    </>
  )
}

export default NewOrder
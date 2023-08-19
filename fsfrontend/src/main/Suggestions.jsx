// import { useDispatch } from 'react-redux';
// import { updateData } from '../redux/suggestions';
import { useSelector } from 'react-redux';
import profileImage from '../assets/img/merlyn.jpg'

const Suggestions = () => {
  const suggestions = useSelector((state) => state.suggestions.data);
  
  console.log(suggestions);

  return (
    <>
      { suggestions.map(item=>(
      <div key={item.profileId} style={{ height:"200px", overflow:"hidden", justifyContent:"center" }} className="col-6 lg:col-3 md:col-6">
        <img width="100%" src={item.img}/>
        <div>{item.profileId} {item.location}</div>
      </div>))}
    </>
  )
}

export default Suggestions
import '../styles/Loader2.css';
const Loader2 = ({probe = 'Loading...'}) => {
  return (
   <div className="center">
      <div className="ring"></div>
      <span>{probe}</span>
   </div>
  )
}

export default Loader2

const Note = ({ text, showDetails }) => {
  return (
    <div>
      <li style={{ display: "inline" }}>{text} </li>
      <button onClick={showDetails}>show</button>
    </div>
  )
}

export default Note;
const Note = ({ name, phone, remove }) => {
  return (
    <div>
      <p style={{ display: "inline" }}>{name} {phone} </p>
      <button onClick={remove}>delete</button>
    </div>
  )
}

export default Note;
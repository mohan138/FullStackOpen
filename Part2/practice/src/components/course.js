
const Header = ({ text }) => <h1>{text}</h1>;
const Part = ({ name, exercise }) => <p>{name} {exercise}</p>;
const Total = ({ total }) => <p><b>total of {total} exercises</b></p>

const Courser = ({ course }) => {

  return (
    <div>
      <Header text={course.name} />
      {course.parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises} />)}
      <Total total={course.parts.reduce((sum, value) => sum + value.exercises, 0)} />
    </div>
  )
}

export default Courser;
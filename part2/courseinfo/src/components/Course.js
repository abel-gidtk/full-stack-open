const Course = ({ course }) => {
    const total = course.parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <p><strong>total of {total} exercises</strong></p>
      </div>
    )
}
  
const Header = ({ course }) => <h2>{course.name}</h2>
  
const Content = ({ course }) => course.parts.map((c) => <Part key={c.id} c={c} />)
  
const Part = ({ c }) => <p>{c.name} {c.exercises}</p>

export default Course
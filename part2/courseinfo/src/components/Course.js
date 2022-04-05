const Course = (props) => {
    let { name, parts } = props.course
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total sum={parts.reduce((sum, el) => sum + el.exercises, 0)} />
        </div>
    )
}

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(p =>
            <Part part={p} key={p.id} />
        )}
    </>

export default Course
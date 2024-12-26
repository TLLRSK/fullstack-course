const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part, i) => {
                return <Part key={i} part={part} />
            })}
        </div>
    )
}
export default Content;

const Part = ({ part }) => {
    return (
        <p>
            {part.name}, {part.exercises}
        </p>
    )
}
import Content from "../content/Content";
import Header from "../header/Header";
import Totals from "../totals/Totals";

const Course = ({ course }) => {
    return (
        <article>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Totals parts={course.parts} />
        </article>
    )
}

export default Course;
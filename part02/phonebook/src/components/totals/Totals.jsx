const Totals = ({ parts }) => {
    console.log(parts)
    const totals = parts.reduce((a, c) => a + c.exercises, 0)
    return (
        <>
            <p>Number of exercises {totals}</p>
        </>
    )
}

export default Totals;
import './PersonFilter.css';

const PersonFilter = ({ handleFilter }) => {

    return (
        <form className='form--filter'>
            <label>Search </label>
            <input type="search" onChange={handleFilter} />
        </form>
    )
}

export default PersonFilter;
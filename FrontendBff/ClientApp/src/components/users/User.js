import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function User({ data }) {
    if (!data)
        return;

    return (
        <>
            <div>
                <Link
                    to={`/all-users/${data.userName}`}
                >
                    @{data.userName}
                </Link>
            </div>
            <div>{data.firstName} {data.lastName}</div>
        </>
    )
}

User.defaultProps = {
    data: null
};

User.propTypes = {
    data: PropTypes.shape({
        userName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    })
};
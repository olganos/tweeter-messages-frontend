import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default function Tweet({ data }) {
    if (!data)
        return;

    return (
        <>
            <div>
                <Link
                    to={`/all-tweets/${data.id}`}
                >
                    {data.id}
                </Link>
            </div>
            <div>@{data.userName}</div>
            <div>
                posted at
                &nbsp;
                <Moment
                    format="DD.MM.YYYY HH:mm:ss"
                >
                    {data.created}
                </Moment>
            </div>
            <p>
                {data.text}
            </p>
        </>
    )
}

Tweet.defaultProps = {
    data: null
};

Tweet.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        userName: PropTypes.string,
        created: PropTypes.string,
        text: PropTypes.string
    })
};
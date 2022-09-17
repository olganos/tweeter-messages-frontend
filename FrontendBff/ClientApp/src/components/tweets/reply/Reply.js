import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default function Reply({ data }) {
    if (!data)
        return;

    return (
        <>
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
            {data.tag &&
                <p>
                    #{data.tag}
                </p>
            }
        </>
    )
}

Reply.defaultProps = {
    data: null
};

Reply.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        userName: PropTypes.string,
        created: PropTypes.string,
        text: PropTypes.string
    })
};
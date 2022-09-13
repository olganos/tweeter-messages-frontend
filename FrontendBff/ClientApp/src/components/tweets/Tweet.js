import PropTypes from 'prop-types';

export default function Tweet({ data }) {
    if (!data)
        return;

    return (
        <>
            <div>id: {data.id}</div>
            <div>user: {data.userName}</div>
            <div>created: {data.created}</div>
            <div>{data.text}</div>
        </>
    )
}

Tweet.defaultProps = {
    data: null
};

Tweet.propTypes = {
    data: PropTypes.objectOf({
        id: PropTypes.string,
        userName: PropTypes.string,
        created: PropTypes.string,
        text: PropTypes.string
    })
};
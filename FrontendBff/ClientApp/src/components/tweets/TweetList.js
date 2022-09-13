import PropTypes from 'prop-types';

import Tweet from "./Tweet";

export default function TweetList({ data }) {
    return (
        <>
            {data.map(item =>
                <p>
                    <Tweet data={item} />
                </p>
            )}
        </>
    )
}

TweetList.defaultProps = {
    data: []
};

TweetList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.objectOf({
        id: PropTypes.string,
        userName: PropTypes.string,
        created: PropTypes.string,
        text: PropTypes.string
    }))
};
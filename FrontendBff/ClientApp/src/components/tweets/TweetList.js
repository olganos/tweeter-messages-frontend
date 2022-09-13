import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

import Tweet from "./Tweet";

export default function TweetList({ data }) {
    return (
        <ListGroup>
            {data.map(item =>
                <ListGroupItem
                    className="justify-content-between"
                    key={item.id}
                >
                    <Tweet data={item} />
                </ListGroupItem>
            )}
        </ListGroup>
    )
}

TweetList.defaultProps = {
    data: []
};

TweetList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        userName: PropTypes.string,
        created: PropTypes.string,
        text: PropTypes.string
    }))
};
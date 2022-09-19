import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

import Reply from "./Reply";

export default function ReplyList({ data }) {
    return (
        <ListGroup>
            {data.map(item =>
                <ListGroupItem
                    className="justify-content-between"
                    key={item.id ?? (new Date()).getTime()}
                >
                    <Reply data={item} />
                </ListGroupItem>
            )}
        </ListGroup>
    )
}

ReplyList.defaultProps = {
    data: []
};

ReplyList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        userName: PropTypes.string,
        created: PropTypes.string,
        text: PropTypes.string
    }))
};
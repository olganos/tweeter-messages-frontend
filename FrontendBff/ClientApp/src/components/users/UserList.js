import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

import User from "./User";

export default function UserList({ data }) {
    return (
        <ListGroup>
            {data.map(item =>
                <ListGroupItem
                    className="justify-content-between"
                    key={item.userName}
                >
                    <User data={item} />
                </ListGroupItem>
            )}
        </ListGroup>
    )
}

UserList.defaultProps = {
    data: []
};

UserList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        userName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }))
};
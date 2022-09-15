import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import { PencilIcon, HeartIcon } from '@primer/octicons-react'

export default function Tweet({ data, showUserUri }) {
    if (!data)
        return;

    return (
        <>
            <div className="d-flex justify-content-between">
                <Link
                    to={showUserUri ? `/all-users/${data.userName}/${data.id}` : `/all-tweets/${data.id}`}
                >
                    {data.id}
                </Link>
                <div>
                    <Button
                        color="primary"
                        outline
                        size="sm"
                        className="me-1"
                    >
                        <PencilIcon size={16} />
                    </Button>
                    <Button
                        color="primary"
                        outline
                        size="sm"
                    >
                        <HeartIcon size={16} />
                    </Button>
                </div>
            </div>
            <div>
                @{data.userName}                
            </div>
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

Tweet.defaultProps = {
    data: null,
    showUserUri: false
};

Tweet.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        userName: PropTypes.string,
        created: PropTypes.string,
        text: PropTypes.string
    }),
    showUserUri: PropTypes.bool,
};
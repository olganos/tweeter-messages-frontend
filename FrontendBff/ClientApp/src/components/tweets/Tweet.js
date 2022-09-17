import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import { HeartIcon } from '@primer/octicons-react';
import { likeTweet } from '../../services/tweets-service';

export default function Tweet({ data, showUserUri }) {
    const dispatch = useDispatch();

    const onClick = async () => {
        dispatch(likeTweet(data.userName, data.id));
    }

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
                        onClick={onClick}
                    >
                        {data.likes === 0
                            ? ''
                            : <span className="me-2">{data.likes}</span>
                        }
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
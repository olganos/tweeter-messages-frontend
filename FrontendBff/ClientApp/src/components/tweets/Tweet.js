import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import { HeartIcon } from '@primer/octicons-react'

export default function Tweet({ data, showUserUri }) {
    if (!data)
        return;

    const onClick = async () => {
        var req = new Request(`write/api/v1.0/tweets/${data.userName}/like/${data.id}`, {
            method: 'PUT',
            headers: new Headers({
                "X-CSRF": "1",
                'Content-Type': 'application/json',
            }),
        });

        try {
            var resp = await fetch(req);

            if (resp.ok) {
                await resp.json();
            }
        } catch (e) {
            console.log("error calling remote API");
        }
    }
    
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
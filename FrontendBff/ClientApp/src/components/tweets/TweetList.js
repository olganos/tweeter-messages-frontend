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

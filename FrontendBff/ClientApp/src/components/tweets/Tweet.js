export default function Tweet({ data }) {
    return (
        <>
            <div>id: {data.id}</div>
            <div>user: {data.userName}</div>
            <div>created: {data.created}</div>
            <div>{data.text}</div>
        </>
    )
}

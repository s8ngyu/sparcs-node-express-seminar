import "./FeedView.css"
import axios from "axios";
import { SAPIBase } from "../../tools/api";
import { useState } from "react";

const FeedView = ({ key, val, deletePost }) => {
    const [title, setTitle] = useState(val.title);
    const [content, setContent] = useState(val.content);

    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [isContentEditing, setIsContentEditing] = useState(false);


    const updateFeed = () => {
        const asyncFun = async () => {
            await axios.post( SAPIBase + '/feed/updateFeed', { id: val._id, title: title, content: content } );
        }
        asyncFun().catch(e => {
            window.alert(`AN ERROR OCCURED! ${e}`)
            setTitle(val.title);
            setContent(val.content);
        });
    }

    const editTitle = () => {
        setIsTitleEditing(false);
        updateFeed();
    };

    const editContent = () => {
        setIsContentEditing(false);
        updateFeed();
    };

    return (
        <div key={key} className={"feed-item"}>
            <div className={"delete-item"} onClick={(e) => deletePost(`${val._id}`)}>ⓧ</div>
            { isTitleEditing ? (
                <div>
                    <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <button onClick={editTitle}>Edit</button>
                </div>
            ) : (
                <h3 className={"feed-title"} onClick={() => setIsTitleEditing(true)}>{ title }</h3>
            )}
            { isContentEditing ? (
                <div>
                    <input autoFocus type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                    <button onClick={editContent}>Edit</button>
                </div>
            ) : (
                <p className={"feed-body"} onClick={() => setIsContentEditing(true)}>{ content }</p>
            )}
        </div>
    )
}

export default FeedView;
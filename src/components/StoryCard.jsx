import React from 'react';

const StoryCard = ({storycard}) => {
    return (
        <div>
            <img src = {storycard.image} alt = {storycard.caption} />
            <p>{storycard.caption}</p>
            <ul>
                {storycard.comments.map(comment => (
                    <li key = {comment.id}>
                        <strong>{comment.user}</strong> {comment.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StoryCard;
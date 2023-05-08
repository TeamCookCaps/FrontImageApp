import React from 'react';

export default function StoryCard({ storycard }) {
    return (
        <div className="relative h-60 w-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <img className="w-full h-full object-cover"
            src = {storycard.image_url} 
            alt = {storycard.image_id} 
            />
        </div>
    );
};
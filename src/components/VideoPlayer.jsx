import React from 'react';

export default function VideoPlayer({ url, title }) {
    if (!url) return null;

    const getEmbedUrl = (url) => {
        try {
            let videoId = '';
            if (url.includes('shorts/')) {
                videoId = url.split('shorts/')[1];
            } else if (url.includes('v=')) {
                videoId = url.split('v=')[1].split('&')[0];
            } else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1];
            }

            // Clean up ID if it has query params
            if (videoId.includes('?')) {
                videoId = videoId.split('?')[0];
            }

            return `https://www.youtube.com/embed/${videoId}`;
        } catch (e) {
            console.error("Error parsing video URL", e);
            return null;
        }
    };

    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) {
        return (
            <div className="w-full aspect-video bg-dark-card rounded-lg flex items-center justify-center text-dark-muted">
                Video unavailable
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-[9/16] md:aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
            <iframe
                src={embedUrl}
                title={title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingGifs } from "../../store/slices/gifs/gifsSlice";
import { sendViaSocket } from "../../store/slices/socket/socketSlice";
import { GifContainer, GifSearchBar, GifPreview, GifSearchBarInput, StyledGifPanel } from "./styles";

// TODO: Add pagination on scroll
// TODO: Add loading animation
function GifPanel({ conversationId, userId }) {
    const gifs = useSelector((state) => state.gifs);
    const dispatch = useDispatch();
    useEffect(async () => {
        if (gifs.trending.length === 0) {
            dispatch(fetchTrendingGifs());
        }
    }, []);
    const sendImgMessage = (url) => {
        dispatch(
            sendViaSocket({
                path: "sendToRoom",
                data: {
                    roomId: conversationId + "",
                    sender: userId + "",
                    content: url,
                    type:"IMAGE"
                },
            })
        );
    };
    return (
        <StyledGifPanel>
            <GifSearchBar>
                <GifSearchBarInput placeholder="Search Gifs via tenor" />
            </GifSearchBar>
            <GifContainer>
                {gifs.trending.map((gif) => (
                    <GifPreview
                        key={gif.id}
                        src={gif.media[0].gif.url}
                        alt={gif.content_description}
                        onClick={()=>sendImgMessage(gif.media[0].gif.url)}
                    />
                ))}
            </GifContainer>
        </StyledGifPanel>
    );
}

export default GifPanel;

import React from "react";
import EmojiPicker from "emoji-picker-react";

function handleEmojiSelect(emoji) {
  console.log(emoji.emoji);
}

function Emoji() {
  return (
    <div>
      <EmojiPicker onEmojiClick={handleEmojiSelect} />
    </div>
  );
}

export default Emoji;

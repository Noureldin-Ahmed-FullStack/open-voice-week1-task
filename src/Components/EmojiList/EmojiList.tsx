import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react';
export default function EmojiList() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native); // `native` contains the emoji character
  };
  return (
    <div className='container d-flex flex-column align-items-center'>
      <h1 className='text-light'>Emoji Picker!</h1>
      {selectedEmoji && (
        <span style={{ fontSize: '2rem' }}>{selectedEmoji}</span>
      )}
      <Picker data={data} onEmojiSelect={handleEmojiSelect} />
    </div>
  )
}

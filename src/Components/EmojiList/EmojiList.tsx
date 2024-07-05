import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
export default function EmojiList() {
  return (
    <div className='container d-flex flex-column align-items-center'>
      <h1 className='text-light mb-5'>Emoji Picker!</h1>
      <Picker data={data} onEmojiSelect={console.log} />
    </div>
  )
}

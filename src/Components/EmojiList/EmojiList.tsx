import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function EmojiList() {
  return (
    <div className='container d-flex justify-content-center'>
      <Picker  data={data} onEmojiSelect={console.log} />
    </div>
  )
}

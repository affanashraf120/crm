'use client'

import React from 'react'

import Chat from '@/modules/app/appraiser/messages'

import { messages } from '@/data/data'

const Messages: React.FC = () => {
  return <Chat messages={messages}/>
}

export default Messages




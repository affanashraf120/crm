'use client'
import { useRef, useState } from 'react'

import { Button } from '@mui/material'

import { useSettings } from '@core/hooks/useSettings'

export default function DNDImage() {
  const [dragActive, setDragActive] = useState<boolean>(false)

  const { settings } = useSettings()

  const inputRef = useRef<any>(null)
  const [files, setFiles] = useState<any>([])

  function handleChange(e: any) {
    e.preventDefault()
    console.log('File has been added')

    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files)

      for (let i = 0; i < e.target.files['length']; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]])
      }
    }
  }

  // function handleSubmitFile(e: any) {
  //   console.log('🚀 ~ handleSubmitFile ~ e:', e)

  //   if (files.length === 0) {
  //     // no file has been submitted
  //   } else {
  //     // write submit logic here
  //   }
  // }

  function handleDrop(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files['length']; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]])
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  function handleDragOver(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  function handleDragEnter(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files]

    newArr.splice(idx, 1)
    setFiles([])
    setFiles(newArr)
  }

  function openFileExplorer() {
    inputRef.current.value = ''
    inputRef.current.click()
  }

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div
        className={`flex items-center md:w-1/2 justify-center border w-full border-dashed border-gray-500 rounded-2xl  ${
          dragActive ? (settings.mode === 'dark' ? 'bg-[rgba(255,255,255,0.21)]' : 'bg-[rgba(0,0,0,0.21)]') : ''
        }`}
      >
        <form
          className='p-4 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center'
          onDragEnter={handleDragEnter}
          onSubmit={e => e.preventDefault()}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
          <input
            placeholder='fileInput'
            className='hidden '
            ref={inputRef}
            type='file'
            multiple={true}
            onChange={handleChange}
            accept='.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf, .mp4'
          />
          <Button onClick={openFileExplorer} variant='contained' className='py-3 px-5 gap-2 mb-2'>
            <i className='ri-upload-cloud-2-line'></i>
            Upload a File
          </Button>

          <p>Drag & drop a files or browse computer</p>

          <div className='flex justify-center items-center pt-2'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='border flex flex-col justify-center items-center rounded-lg p-4 text-center cursor-pointer gap-2 transition duration-300'>
                <span className='bg-blue-600 w-10 h-10 flex justify-center items-center rounded-full '>
                  <i className='ri-folder-open-line p-3 w-3 h-3'></i>
                </span>
                <span className='text-xs whitespace-nowrap'>My Device</span>
              </div>
              <div className='border flex flex-col justify-center items-center rounded-lg p-4 text-center cursor-pointer gap-2 transition duration-300'>
                <span className='bg-blue-900 w-10 h-10 flex justify-center items-center rounded-full '>
                  <i className='ri-dropbox-line p-3 w-3 h-3'></i>
                </span>{' '}
                <span className='text-xs whitespace-nowrap'>Dropbox</span>
              </div>
              <div className='border flex flex-col justify-center items-center rounded-lg p-4 text-center cursor-pointer gap-2 transition duration-300'>
                <span className='bg-blue-400 w-10 h-10 flex justify-center items-center rounded-full '>
                  <i className='ri-drive-line p-3 w-3 h-3'></i>
                </span>{' '}
                <span className='text-xs whitespace-nowrap'>Google Drive</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='flex flex-col items-center p-3'>
        {files.map((file: any, idx: any) => (
          <div key={idx} className='flex flex-row space-x-5'>
            <span>{file.name}</span>
            <span className='text-red-500 cursor-pointer' onClick={() => removeFile(file.name, idx)}>
              <i className='ri-delete-bin-6-line w-4 h-4'></i>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
